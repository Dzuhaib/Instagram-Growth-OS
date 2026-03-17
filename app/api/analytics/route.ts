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
    const { timeRange, niche } = await req.json();

    const prompt = `You are an AI Instagram Analyst. 
Generate realistic analytics data for a user in the "${niche || "general"}" niche over the last ${timeRange}.
Respond strictly in valid JSON format with the following structure:
{
  "summary": [
    { "label": "Total Reach", "value": "1.2M", "trend": "+12.4%", "isUp": true, "icon": "Eye", "color": "var(--accent-pink)" },
    { "label": "Avg Engagement", "value": "6.4%", "trend": "+1.2%", "isUp": true, "icon": "TrendingUp", "color": "var(--green)" },
    { "label": "Net Followers", "value": "+1,420", "trend": "+450", "isUp": true, "icon": "Users", "color": "var(--accent-purple)" },
    { "label": "AI Match Rate", "value": "75%", "trend": "-2.4%", "isUp": false, "icon": "Sparkles", "color": "var(--amber)" }
  ],
  "reachData": [
    { "date": "Oct 1", "nonFollowers": 45000, "followers": 12000 },
    { "date": "Oct 2", "nonFollowers": 46000, "followers": 12500 },
    { "date": "Oct 3", "nonFollowers": 47000, "followers": 13000 },
    { "date": "Oct 4", "nonFollowers": 48000, "followers": 13500 },
    { "date": "Oct 5", "nonFollowers": 49000, "followers": 14000 },
    { "date": "Oct 6", "nonFollowers": 50000, "followers": 14500 },
    { "date": "Oct 7", "nonFollowers": 51000, "followers": 15000 }
  ],
  "formatData": [
    { "name": "Reels", "value": 65 },
    { "name": "Carousels", "value": 25 },
    { "name": "Images", "value": 10 }
  ],
  "engagementData": [
    { "date": "Oct 1", "rate": 5.2 },
    { "date": "Oct 2", "rate": 5.3 },
    { "date": "Oct 3", "rate": 5.4 },
    { "date": "Oct 4", "rate": 5.5 },
    { "date": "Oct 5", "rate": 5.6 },
    { "date": "Oct 6", "rate": 5.7 },
    { "date": "Oct 7", "rate": 5.8 }
  ],
  "followerData": [
    { "date": "Oct 1", "gained": 120, "lost": 15 },
    { "date": "Oct 2", "gained": 130, "lost": 16 },
    { "date": "Oct 3", "gained": 140, "lost": 17 },
    { "date": "Oct 4", "gained": 150, "lost": 18 },
    { "date": "Oct 5", "gained": 160, "lost": 19 },
    { "date": "Oct 6", "gained": 170, "lost": 20 },
    { "date": "Oct 7", "gained": 180, "lost": 21 }
  ],
  "posts": [
    { "id": 1, "thumbnail": "🔥", "caption": "Caption text...", "format": "Reel", "date": "2d ago", "reach": "45K", "engagement": "8.2%", "shares": 1200, "aiOptimized": true },
    { "id": 2, "thumbnail": "✨", "caption": "Another caption...", "format": "Carousel", "date": "3d ago", "reach": "30K", "engagement": "7.5%", "shares": 800, "aiOptimized": false },
    { "id": 3, "thumbnail": "💡", "caption": "Third post caption...", "format": "Image", "date": "4d ago", "reach": "20K", "engagement": "6.0%", "shares": 500, "aiOptimized": true },
    { "id": 4, "thumbnail": "🚀", "caption": "Fourth post caption...", "format": "Reel", "date": "5d ago", "reach": "50K", "engagement": "9.0%", "shares": 1500, "aiOptimized": true },
    { "id": 5, "thumbnail": "🌟", "caption": "Fifth post caption...", "format": "Carousel", "date": "6d ago", "reach": "35K", "engagement": "7.8%", "shares": 900, "aiOptimized": false }
  ]
}
Do not wrap JSON in markdown.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || '{}';
    return NextResponse.json(JSON.parse(content));
  } catch (error: unknown) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to generate analytics data." },
      { status: 500 }
    );
  }
}
