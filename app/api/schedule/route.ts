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
    const { niche, goal, format } = await req.json();

    const prompt = `You are an Instagram algorithm expert.
Niche: ${niche || "General"}
Goal: ${goal || "Growth"}
Format: ${format || "Reel"}

Generate a personalized posting schedule matrix.
Respond strictly in valid JSON format with the following structure:
{
  "stats": [
    { "label": "Label 1", "value": "Value 1", "sub": "Sub 1", "icon": "Video" | "Sparkles" | "AlertTriangle" },
    { "label": "Label 2", "value": "Value 2", "sub": "Sub 2", "icon": "Video" | "Sparkles" | "AlertTriangle" },
    { "label": "Label 3", "value": "Value 3", "sub": "Sub 3", "icon": "Video" | "Sparkles" | "AlertTriangle" }
  ],
  "timeSlots": [
    { "time": "09:00", "scores": [30, 45, 60, 40, 50, 85, 90] },
    { "time": "12:00", ... },
    { "time": "15:00", ... },
    { "time": "18:00", ... },
    { "time": "20:00", ... }
  ],
  "nextWindow": "Today at 18:00",
  "nextReason": "Description of why today at this time is good.",
  "nuances": [
    { "title": "Reels", "text": "Reels perform 45% better when..." },
    { "title": "Carousels", "text": "Carousels perform best mid-day..." }
  ]
}

The scores should be 7 numbers (Mon-Sun) between 0-100.
Do not wrap JSON in markdown.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    return NextResponse.json(JSON.parse(response.choices[0].message.content || '{}'));
  } catch (error: unknown) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to generate schedule." },
      { status: 500 }
    );
  }
}
