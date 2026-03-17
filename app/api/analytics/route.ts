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
    const { timeRange, niche } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("ig_access_token")?.value;

    let postsSummary = "No real posts found or Instagram account not connected.";
    let recentPosts = [];

    if (token) {
      try {
        const url = `https://graph.instagram.com/v25.0/me/media?fields=id,caption,media_type,comments_count,like_count,timestamp,thumbnail_url,media_url,permalink&limit=15&access_token=${token}`;
        const igRes = await fetch(url);
        if (igRes.ok) {
          const igData = await igRes.json();
          if (igData.data && igData.data.length > 0) {
            recentPosts = igData.data.map((p: any) => ({
              id: p.id,
              caption: (p.caption || "No caption").substring(0, 100) + "...",
              format: p.media_type === "VIDEO" ? "Reel" : p.media_type === "CAROUSEL_ALBUM" ? "Carousel" : "Image",
              likes: p.like_count || 0,
              comments: p.comments_count || 0,
              date: new Date(p.timestamp).toLocaleDateString(),
            }));
            postsSummary = `User's real recent posts:\n` + JSON.stringify(recentPosts, null, 2);
          }
        }
      } catch (err) {
        console.error("IG fetch error in analytics:", err);
      }
    }

    const prompt = `You are an AI Instagram Analyst. 
Generate realistic analytics data for a user in the "${niche || "general"}" niche over the last ${timeRange}.
Here is their real recent content data:
---
${postsSummary}
---
Use their real recent posts for the "posts" array. If they have real posts, calculate realistic reach, engagement rates, and shares based on their actual likes/comments. Randomly flag a few of their best performing real posts as "aiOptimized": true and others as false. If they have no real posts, generate 5 realistic dummy ones.
Respond strictly in valid JSON format with the following structure:
{
  "summary": [
    { "label": "Total Reach", "value": "<CALCULATED_TOTAL_REACH>", "trend": "<+X%>", "isUp": true, "icon": "Eye", "color": "var(--accent-pink)" },
    { "label": "Avg Engagement", "value": "<CALCULATED_AVG_ENGAGEMENT_PERCENT>", "trend": "<+X%>", "isUp": true, "icon": "TrendingUp", "color": "var(--green)" },
    { "label": "Net Followers", "value": "<CALCULATED_NET_FOLLOWERS>", "trend": "<+X>", "isUp": true, "icon": "Users", "color": "var(--accent-purple)" },
    { "label": "AI Match Rate", "value": "<CALCULATED_PERCENT>", "trend": "<-X%>", "isUp": false, "icon": "Sparkles", "color": "var(--amber)" }
  ],
  "reachData": [
    { "date": "Oct 1", "nonFollowers": "<CALCULATED_NUMBER>", "followers": "<CALCULATED_NUMBER>" },
    ... 7 days worth
  ],
  "formatData": [
    { "name": "Reels", "value": "<CALCULATED_PERCENT>" },
    { "name": "Carousels", "value": "<CALCULATED_PERCENT>" },
    { "name": "Images", "value": "<CALCULATED_PERCENT>" }
  ],
  "engagementData": [
    { "date": "Oct 1", "rate": "<CALCULATED_DECIMAL_NUMBER>" },
    ... 7 days worth
  ],
  "followerData": [
    { "date": "Oct 1", "gained": "<CALCULATED_NUMBER>", "lost": "<CALCULATED_NUMBER>" },
    ... 7 days worth
  ],
  "posts": [
    { "id": "<REAL_ID>", "thumbnail": "🔥", "caption": "<REAL_CAPTION>", "format": "Reel", "date": "<REAL_DATE>", "reach": "<EXTRAPOLATED_REACH>", "engagement": "<CALCULATED_ENGAGEMENT_PERCENT>", "shares": "<CALCULATED_SHARES>", "aiOptimized": true },
    ... (Use real posts if available)
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
