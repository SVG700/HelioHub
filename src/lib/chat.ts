import { estimateSolarOutcome } from './solar';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  confidence?: ConfidenceLevel;
  typing?: boolean;
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