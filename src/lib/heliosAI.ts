import { supabase } from './supabaseClient';
import { getFeasibilityData } from './feasibilityContext';

const isFeasibilityRelatedQuestion = (text: string): boolean =>
  /(panel|solar|feasib|output|saving|cost|location|energy|watt|kilowatt|kwh|sunlight)/i.test(text);

/**
 * Combined Supabase + Gemini AI response logic:
 * 1. Check Supabase knowledge base first
 * 2. If no match, fallback to Gemini API
 * 3. If Gemini succeeds, save as "answered_by_ai"
 * 4. If both fail, save as "pending"
 */
export async function getAIResponse(userInput: string): Promise<string> {
  try {
    // STEP 1: Check Supabase first
    const { data, error } = await supabase
      .from('helios_knowledge')
      .select('*')

    if (!error && data && data.length > 0) {
      const input = userInput.toLowerCase()
      
      const match = data.find((item: any) =>
        item.question?.toLowerCase().includes(input) ||
        item.keywords?.toLowerCase().includes(input) ||
        input.includes(item.question?.toLowerCase()) ||
        input.includes(item.keywords?.toLowerCase())
      )

      if (match) {
        // Found in Supabase - return immediately
        return match.answer
      }
    }

    // STEP 2: No match in Supabase - try Gemini
    try {
      const feasibilityData = getFeasibilityData();
      const promptWithContext = feasibilityData.isDataAvailable && isFeasibilityRelatedQuestion(userInput)
        ? `${userInput}\n\nThe user has already run a feasibility check with these results:\nLocation: ${feasibilityData.location}\nSunlight Hours: ${feasibilityData.sunlightHours} hrs/day\nPanels Required: ${feasibilityData.panelsRequired}\nEstimated Daily Output: ${feasibilityData.estimatedOutput}\nFeasibility: ${feasibilityData.feasibilityLevel}\nMonthly Savings: ${feasibilityData.monthlySavings}\n\nElectricity rate in ${feasibilityData.location}: ₹${feasibilityData.electricityRate}/kWh\nMonthly savings: ₹${feasibilityData.minMonthlySavings.toLocaleString('en-IN')}–₹${feasibilityData.maxMonthlySavings.toLocaleString('en-IN')}\nAnnual savings: ₹${feasibilityData.minAnnualSavings.toLocaleString('en-IN')}–₹${feasibilityData.maxAnnualSavings.toLocaleString('en-IN')}\nPayback period: ${feasibilityData.paybackYears} years\nCO2 saved monthly: ${feasibilityData.monthlyCO2Saved} kg\n\nUse this data to give personalized answers when relevant.`
        : userInput;

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: promptWithContext })
      })

      const geminiData = await response.json()

      if (geminiData.answer) {
        // Save to user_queries with answered_by_ai status
        await supabase.from('user_queries').insert([{
          user_question: userInput,
          ai_response: geminiData.answer,
          status: 'answered_by_ai'
        }])

        return geminiData.answer
      }
    } catch (geminiError) {
      console.error('Gemini error:', geminiError)
    }

    // STEP 3: Both failed - save as pending
    await supabase.from('user_queries').insert([{
      user_question: userInput,
      ai_response: 'Pending',
      status: 'pending'
    }])

    return "🌞 Helios AI is still learning this. Our team will update me soon!"

  } catch (err) {
    console.error('getAIResponse error:', err)
    return "Server error. Please try again later."
  }
}

/**
 * Persists user feedback for an AI response into Supabase.
 */
export async function saveFeedback(question: string, answer: string, feedback: string): Promise<void> {
  try {
    await supabase.from('ai_feedback').insert({ question, answer, feedback });
  } catch (error) {
    console.error('saveFeedback error:', error);
  }
}
