import { supabase } from './supabaseClient';
import { getFeasibilityData } from './feasibilityContext';

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
      const input = userInput.toLowerCase().trim()

      const match = data?.find((item: any) => {
        const question = item.question?.toLowerCase() || ''
        const keywords = item.keywords?.toLowerCase() || ''

        const keywordList = keywords.split(',').map((k: string) => k.trim())
        const keywordMatch = keywordList.some((k: string) =>
          k.length > 2 && input.includes(k)
        )

        return input.includes(question) || question.includes(input) || keywordMatch
      })

      if (match) {
        // Found in Supabase - return immediately
        return match.answer
      }
    }

    // STEP 2: No match in Supabase - try Gemini
    try {
      const feasibilityData = getFeasibilityData();
      const hasFreshFeasibilityData =
        feasibilityData.isDataAvailable &&
        feasibilityData.expiresAt > 0 &&
        Date.now() <= feasibilityData.expiresAt;

      const promptWithContext = hasFreshFeasibilityData
        ? `${userInput}\n\nCONTEXT - User's Solar Feasibility Results:\nLocation: ${feasibilityData.location}\nSunlight Hours: ${feasibilityData.sunlightHours} hrs/day\nPanels Required: ${feasibilityData.panelsRequired}\nDaily Energy Output: ${feasibilityData.estimatedOutput}\nFeasibility Level: ${feasibilityData.feasibilityLevel}\nMonthly Savings: ${feasibilityData.monthlySavings}\nAnnual Savings: ${feasibilityData.annualSavings}\nElectricity Rate: ₹${feasibilityData.electricityRate}/kWh\nPayback Period: ${feasibilityData.paybackYears} years\nCO2 Saved: ${feasibilityData.co2Saved} kg/month\n\nUse this data to give personalized answers to the user.`
        : userInput;

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: promptWithContext })
      })

      console.log('Gemini response status:', response.status)
      const geminiData = await response.json()
      console.log('Gemini data:', geminiData)

      if (geminiData.answer && geminiData.answer.length > 0) {
        // Save to user_queries with answered_by_ai status
        await supabase.from('user_queries').insert([{
          user_question: userInput,
          ai_response: geminiData.answer,
          status: 'answered_by_ai'
        }])

        return geminiData.answer
      }
    } catch (geminiError) {
      console.error('Gemini fetch error:', geminiError)
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

