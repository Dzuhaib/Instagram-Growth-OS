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

    const prompt = `You are an AI Instagram Growth Engine. 95% Accuracy Required.
Generate a dashboard overview for a user in the "${niche}" niche with the goal of "${goal}".

CRITICAL ACCOUNT CONTEXT:
- Real Followers: ${followerCount}
- Real Posts Detected: ${recentPosts.length}
- Post Data: ${recentPosts.length > 0 ? postsSummary : "USER HAS 0 POSTS RECENTLY."}

STRICT DATA RULES:
1. If posts=0, "Est. Reach This Week" MUST BE 0. Do NOT show thousands.
2. If posts=0, "Engagement Rate" MUST BE 0.0%.
3. If posts=0, "DM Share Score" MUST BE 0.
4. "reachData" for the chart MUST be 0 across all days if posts=0.
5. All recommendations must acknowledge they have 0 posts and tell them to start posting.

Respond strictly in valid JSON format with the following structure:
{
  "metrics": [
    { "label": "Est. Reach This Week", "value": 0, "color": "var(--accent-pink)", "icon": "TrendingUp", "suffix": "" },
    { "label": "Engagement Rate", "value": 0, "color": "var(--green)", "icon": "Heart", "suffix": "%" },
    { "label": "DM Share Score", "value": 0, "color": "var(--accent-purple)", "icon": "Share2", "suffix": "/100" },
    { "label": "Niche Consistency", "value": 0, "color": "var(--amber)", "icon": "Target", "suffix": "%" }
  ],
  "reachData": [
    { "day": "Mon", "reach": 0 },
    { "day": "Tue", "reach": 0 },
    { "day": "Wed", "reach": 0 },
    { "day": "Thu", "reach": 0 },
    { "day": "Fri", "reach": 0 },
    { "day": "Sat", "reach": 0 },
    { "day": "Sun", "reach": 0 }
  ],
  "schedule": [
    { "day": "Mon", "time": "6:00 PM", "format": "Reel", "score": 0, "idea": "Post a 7 second Reel about..." },
    { "day": "Wed", "time": "12:00 PM", "format": "Reel", "score": 0, "idea": "Post a hook about..." },
    { "day": "Fri", "time": "8:00 PM", "format": "Carousel", "score": 0, "idea": "Post a carousel about..." }
  ],
  "recommendations": [
    {
      "id": 1,
      "type": "Content Strategy",
      "impact": "High",
      "title": "Title here",
      "desc": "Description here",
      "action": "Action here",
      "color": "var(--accent-pink)"
    }
  ],
  "newPoints": 0
}
Do not wrap JSON in markdown. Just raw JSON.`;

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
