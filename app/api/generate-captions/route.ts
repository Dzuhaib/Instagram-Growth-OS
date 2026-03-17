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
    const { topic, tone, format, niche } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const prompt = `You are an expert Instagram growth marketer and copywriter.
Create 3 different Instagram captions for an account in the "${niche || "general"}" niche based on the following input:
Topic: ${topic}
Tone: ${tone}
Format: ${format}

Return the response strictly as a JSON array of 3 objects with the following keys:
- "id": A unique number from 1 to 3
- "style": A short descriptive name for the caption style (e.g., "Short & Punchy")
- "text": The main caption text with line breaks (use \n\n for formatting)
- "hashtags": A string of 4-6 relevant hashtags separated by spaces
- "score": A predicted engagement score between 70 and 99

Ensure the text has compelling hooks, uses appropriate spacing, and includes call-to-actions.
Do not wrap the JSON in Markdown. Just output valid JSON array.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content || '[]';
    const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsedResults = JSON.parse(cleanContent);
      return NextResponse.json(parsedResults);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response", cleanContent);
      return NextResponse.json(
        { error: "Failed to parse caption generation results" },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to generate captions. Check your API key and try again." },
      { status: 500 }
    );
  }
}
