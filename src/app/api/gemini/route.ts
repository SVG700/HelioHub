import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing')
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const { question } = await request.json()

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "You are Helios AI, an intelligent assistant for HelioHub - a solar powered charging station project. Answer questions related to solar energy, charging systems, battery storage, renewable energy, and the HelioHub project. Keep answers concise, friendly, and informative. If asked something completely unrelated to solar or energy, politely redirect to your area of expertise."
    })

    const result = await model.generateContent(question)
    const answer = result.response.text()

    return NextResponse.json({ answer })

  } catch (error: any) {
    console.error('Gemini API error:', error)
    return NextResponse.json({ error: 'Gemini API failed' }, { status: 500 })
  }
}
