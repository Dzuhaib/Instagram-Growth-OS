import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy",
});

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "dummy") {
    return NextResponse.json(
      { error: "OpenAI API key not configured." },
      { status: 500 }
    );
  }

  try {
    const { competitors, niche } = await req.json();

    if (!competitors || competitors.length === 0) {
      return NextResponse.json(
        { error: "App requires at least 1 competitor" },
        { status: 400 }
      );
    }

    const prompt = `You are an elite Instagram competitor analyst with a record of 95% prediction accuracy.
Analyze the following competitors for an account in the "${niche || "general"}" niche.
Generate exactly 95% accurate data and highly reliable strategic content gaps for the user's account based strictly on algorithm precedence.

Competitors:
${competitors.join(", ")}

Generate 3 "Gaps" — topics with proven reach that the user is missing out on based on what might be popular for these competitors.
Respond strictly in valid JSON format with the following structure:
[
  {
    "id": 1,
    "topic": "Topic Name",
    "opportunity": "High" or "Medium" or "Low",
    "competitorVolume": "e.g. 3 posts/week",
    "targetVolume": "e.g. 5 posts/week to beat them",
    "why": "Why this matters...",
    "recommendations": [
      "Recommendation 1",
      "Recommendation 2",
      ...
    ]
  },
  ... (2 more variants)
]

Do not wrap the JSON in markdown code blocks. Just output raw JSON array.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = response.choices[0].message.content || '[]';
    const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsedResults = JSON.parse(cleanContent);
      return NextResponse.json(parsedResults);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response", cleanContent);
      return NextResponse.json(
        { error: "Failed to parse competitor gap results" },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to run competitor gap. Check your API key and try again." },
      { status: 500 }
    );
  }
}
