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
    const { niche, goal, format } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("ig_access_token")?.value;

    let postsSummary = "No real posts found or Instagram account not connected.";
    let recentPosts = [];
    let followerCount = 0;

    if (token) {
      try {
        // Fetch Profile for follower count scale
        const profileRes = await fetch(
          `https://graph.instagram.com/v25.0/me?fields=followers_count&access_token=${token}`
        );
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          followerCount = profileData.followers_count || 0;
        }
      } catch (err) {
        console.error("IG profile fetch error:", err);
      }

      try {
        const url = `https://graph.instagram.com/v25.0/me/media?fields=id,caption,media_type,comments_count,like_count,timestamp,thumbnail_url,media_url,permalink&limit=15&access_token=${token}`;
        const igRes = await fetch(url);
        if (igRes.ok) {
          const igData = await igRes.json();
          if (igData.data && igData.data.length > 0) {
            recentPosts = igData.data.map((p: any) => ({
              caption: (p.caption || "No caption").substring(0, 100) + "...",
              format: p.media_type === "VIDEO" ? "Reel" : p.media_type === "CAROUSEL_ALBUM" ? "Carousel" : "Image",
              likes: p.like_count || 0,
              comments: p.comments_count || 0,
            }));
            postsSummary = `User's real recent posts:\n` + JSON.stringify(recentPosts, null, 2);
          }
        }
      } catch (err) {
        console.error("IG fetch error in schedule:", err);
      }
    }

    const prompt = `You are an Instagram algorithm expert.
Niche: ${niche || "General"}
Goal: ${goal || "Growth"}
Format: ${format || "Reel"}

CRITICAL CONTEXT:
- Total Followers: ${followerCount}
- Recent Posts Count: ${recentPosts.length}
- Real Post Data: ${recentPosts.length > 0 ? postsSummary : "USER HAS NOT POSTED RECENTLY."}

RULES:
1. "stats" MUST reflect reality. If 0 posts, "Views" must be 0. "New Followers" must be 0 or +1, NOT 150.
2. If 0 posts, "Engagement Rate" must be 0.0%.
3. Generate a personalized posting schedule matrix.

Respond strictly in valid JSON format with the following structure:
{
  "stats": [
    { "label": "Engagement Rate", "value": "0.0%", "sub": "Average for the week", "icon": "Sparkles" },
    { "label": "New Followers", "value": "0", "sub": "Last 7 days", "icon": "Users" },
    { "label": "Views", "value": "0", "sub": "Last 30 days", "icon": "Video" }
  ],
  "timeSlots": [
    { "time": "09:00", "scores": [0, 0, 0, 0, 0, 0, 0] },
    { "time": "12:00", "scores": [0, 0, 0, 0, 0, 0, 0] },
    { "time": "15:00", "scores": [0, 0, 0, 0, 0, 0, 0] },
    { "time": "18:00", "scores": [0, 0, 0, 0, 0, 0, 0] },
    { "time": "20:00", "scores": [0, 0, 0, 0, 0, 0, 0] }
  ],
  "nextWindow": "Not enough data",
  "nextReason": "Description here",
  "nuances": [
    { "title": "Hooks", "text": "Content here" },
    { "title": "Timing", "text": "Content here" }
  ]
}

The scores should be 7 numbers (Mon-Sun) between 0-100.
Do not wrap JSON in markdown. Just raw JSON.`;

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
