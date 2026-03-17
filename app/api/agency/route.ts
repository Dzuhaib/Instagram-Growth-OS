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
    const { niche = "Social Media Marketing", goal = "Client Growth" } = await req.json();

    const prompt = `You are a high-end Instagram Agency manager. 
The agency focus is: ${niche}
The primary objective is: ${goal}

Generate a list of 4 diverse clients that would realistically be in this agency's portfolio.
Include their specific metrics, growth trends, and health scores.

Respond strictly in valid JSON format with the following structure:
{
  "summary": [
    { "label": "Active Subscriptions", "value": "4", "color": "var(--accent-pink)", "icon": "Target" },
    { "label": "Combined Network Reach", "value": "Number + K/M suffix", "color": "var(--green)", "icon": "TrendingUp" },
    { "label": "Average Engagement", "value": "Percentage", "color": "var(--amber)", "icon": "BarChart3" },
    { "label": "Critical Alerts", "value": "Number", "color": "var(--red)", "icon": "AlertTriangle" }
  ],
  "clients": [
    {
      "id": 1,
      "name": "Client Business Name",
      "handle": "@handle",
      "followers": "Count (e.g. 50.2K)",
      "weeklyReach": "Count (e.g. 150K)",
      "engagement": "Percentage",
      "nicheScore": 0-100,
      "lastPost": "Time ago",
      "trend": "up" | "down",
      "avatar": "First initial",
      "avatar_color": "Hex or CSS variable"
    },
    ... (total 4)
  ]
}
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
      { error: "Failed to fetch agency data." },
      { status: 500 }
    );
  }
}
