import { estimateSolarOutcome } from './solar';
import { supabase } from './supabaseClient';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  confidence?: ConfidenceLevel;
  typing?: boolean;
  feedback?: 'good' | 'bad' | null;
};

export type ChatContext = {
  location: string;
  sunlightHours: number;
  feasibility: string;
  energy: string;
  panels: string;
  savings: string;
};

function detectIntent(message: string) {
  const lower = message.toLowerCase();
  if (/(solar|sunlight|install|feasible|feasibility)/.test(lower)) return 'solar';
  if (/(cost|price|budget|subsidy|saving)/.test(lower)) return 'cost';
  if (/(battery|storage|backup)/.test(lower)) return 'battery';
  if (/(power|output|energy|generate|production)/.test(lower)) return 'output';
  return 'general';
}

export async function getAIResponse(userInput: string): Promise<{ answer: string; confidence: ConfidenceLevel } | null> {
  try {
    const { data, error } = await supabase.from('helios_knowledge').select('question, answer, confidence');

    if (error) {
      console.error('Supabase fetch error:', error);
      return null;
    }

    if (!data || data.length === 0) {
      console.warn('No knowledge base entries found');
      return null;
    }

    const inputLower = userInput.toLowerCase();

    for (const entry of data) {
      const questionLower = (entry.question || '').toLowerCase();
      if (questionLower.includes(inputLower) || inputLower.includes(questionLower)) {
        return {
          answer: entry.answer || 'No answer available',
          confidence: (entry.confidence as ConfidenceLevel) || 'Medium'
        };
      }
    }

    return null;
  } catch (err) {
    console.error('Error fetching AI response:', err);
    return null;
  }
}

export async function saveFeedback(
  question: string,
  answer: string,
  feedback: 'good' | 'bad'
): Promise<boolean> {
  try {
    const { error } = await supabase.from('ai_feedback').insert([
      {
        question,
        answer,
        feedback,
        timestamp: new Date().toISOString()
      }
    ]);

    if (error) {
      console.error('Feedback save error:', error);
      return false;
    }

    console.log(`Feedback recorded: ${feedback}`);
    return true;
  } catch (err) {
    console.error('Error saving feedback:', err);
    return false;
  }
}

export async function logQuery(userInput: string, aiResponse: string): Promise<void> {
  try {
    await supabase.from('ai_logs').insert([
      {
        user_query: userInput,
        ai_response: aiResponse,
        timestamp: new Date().toISOString()
      }
    ]);
  } catch (err) {
    console.error('Error logging query:', err);
  }
}

export function generateHeliosReply(message: string, context: ChatContext): { confidence: ConfidenceLevel; content: string } {
  const intent = detectIntent(message);
  const derived = estimateSolarOutcome(context.location, context.sunlightHours);
  const feasibility = context.feasibility || derived.feasibility;

  const confidence = feasibility === 'high' ? 'High' : feasibility === 'medium' ? 'Medium' : 'Low';

  if (intent === 'solar') {
    return {
      confidence,
      content: `Helios AI Analysis: Based on your input, ${context.location || 'the selected region'} shows ${feasibility} solar feasibility with ${context.energy || derived.energy}. Deploying ${context.panels || derived.panels} can make the system practical and efficient.`
    };
  }

  if (intent === 'cost') {
    return {
      confidence,
      content: `Helios AI Analysis: For your setup, estimated savings are ${context.savings || derived.savings}. Subsidy eligibility can improve payback time, especially when paired with storage and load management.`
    };
  }

  if (intent === 'battery') {
    return {
      confidence: confidence === 'Low' ? 'Medium' : confidence,
      content: 'Helios AI Analysis: Battery storage increases uptime, stabilizes voltage, and supports emergency charging mode. A mid-capacity pack is recommended for resilient daily operation.'
    };
  }

  if (intent === 'output') {
    return {
      confidence,
      content: `Helios AI Analysis: Your expected energy profile is ${context.energy || derived.energy}. Dynamic allocation can route excess solar power to storage and prioritize live charging demand.`
    };
  }

  return {
    confidence: 'Low',
    content: 'Helios AI is currently optimized for solar-related queries. Please ask about solar feasibility, cost, battery storage, or energy usage.'
  };
}

export async function generateHeliosReplyWithDB(
  message: string,
  context: ChatContext
): Promise<{ confidence: ConfidenceLevel; content: string }> {
  try {
    const dbResponse = await getAIResponse(message);

    if (dbResponse) {
      await logQuery(message, dbResponse.answer);
      return {
        confidence: dbResponse.confidence,
        content: dbResponse.answer
      };
    }
  } catch (err) {
    console.error('Error in DB lookup, falling back to local logic:', err);
  }

  const localResponse = generateHeliosReply(message, context);
  await logQuery(message, localResponse.content);
  return localResponse;
}