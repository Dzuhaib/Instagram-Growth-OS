import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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
    const { niche, goal } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("ig_access_token")?.value;

    let postsSummary = "The user has no connected account or no posts yet.";
    let recentPosts = [];

    if (token) {
      // Attempt to fetch real media
      try {
        const url = `https://graph.instagram.com/v25.0/me/media?fields=id,caption,media_type,comments_count,like_count,timestamp,thumbnail_url,media_url,permalink&limit=15&access_token=${token}`;
        const igRes = await fetch(url);
        if (igRes.ok) {
          const igData = await igRes.json();
          if (igData.data && igData.data.length > 0) {
            recentPosts = igData.data.map((p: any) => ({
              type: p.media_type,
              caption: (p.caption || "").substring(0, 150) + "...",
              likes: p.like_count || 0,
              comments: p.comments_count || 0,
              date: p.timestamp,
            }));
            postsSummary = `User's last ${recentPosts.length} posts:\n` + JSON.stringify(recentPosts, null, 2);
          }
        }
      } catch (err) {
        console.error("IG fetch error in dashboard:", err);
      }
    }

    const prompt = `You are an AI Instagram Growth Engine.
Generate a dashboard overview for a user in the "${niche}" niche with the goal of "${goal}".
Here is data from their actual recent Instagram posts (use this to base your recommendations and metrics):
---
${postsSummary}
---
Provide realistic metrics based on their actual engagement (extrapolate reach from likes/comments if needed), reach velocity data for a chart, an optimal posting schedule for the next 3 slots, and 4 specific AI recommendations based EXACTLY on what they are currently posting vs what they should be.

Respond strictly in valid JSON format with the following structure:
{
  "metrics": [
    { "label": "Est. Reach This Week", "value": 184000, "color": "var(--accent-pink)", "icon": "TrendingUp", "suffix": "" },
    { "label": "Engagement Rate", "value": 7.2, "color": "var(--green)", "icon": "Heart", "suffix": "%" },
    { "label": "DM Share Score", "value": 94, "color": "var(--accent-purple)", "icon": "Share2", "suffix": "/100" },
    { "label": "Niche Consistency", "value": 88, "color": "var(--amber)", "icon": "Target", "suffix": "%" }
  ],
  "reachData": [
    { "day": "Mon", "reach": 12000 },
    { "day": "Tue", "reach": 18000 },
    ... (7 days)
  ],
  "schedule": [
    { "day": "Mon", "time": "6:00 PM", "format": "Reel", "score": 92 },
    ... (3 slots)
  ],
  "recommendations": [
    {
      "id": 1,
      "type": "Hook Fix",
      "impact": "High",
      "title": "Switch to outcome-led hooks",
      "desc": "Your last Reel started with... but our data shows hooks starting with... perform 4x better in your niche.",
      "action": "View Hook Templates",
      "color": "var(--accent-pink)"
    },
    ... (4 total)
  ],
  "newPoints": 14
}
Do not wrap JSON in markdown.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    return NextResponse.json(JSON.parse(response.choices[0].message.content || '{}'));
  } catch (error: unknown) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data." },
      { status: 500 }
    );
  }
}
