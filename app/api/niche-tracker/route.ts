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
    const { niche, topic } = await req.json();

    const prompt = `You are a world-class market research AI specialized in Instagram trends.
Current Niche: ${niche || "General"}
Specific Topic: ${topic || "All"}

Generate current "Rising Trends" and "Content Gaps" for this niche.
Respond strictly in valid JSON format with the following structure:
{
  "trends": [
    { "rank": 1, "keyword": "keyword here", "growth": "+145%", "volume": "High", "status": "rising" },
    ... (total 5)
  ],
  "gaps": [
    {
      "topic": "Topic name",
      "demand": (0-100),
      "supply": (0-100),
      "difficulty": "Low" | "Medium" | "High",
      "insight": "AI-generated market insight here."
    },
    ... (total 2)
  ],
  "saturation": (0-100),
  "shifts": [
    "Sub-niche recommendation 1",
    "Sub-niche recommendation 2",
    "Sub-niche recommendation 3"
  ]
}

Do not wrap the JSON in markdown. Just output raw JSON.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    return NextResponse.json(JSON.parse(response.choices[0].message.content || '{}'));
  } catch (error: unknown) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch niche data." },
      { status: 500 }
    );
  }
}
