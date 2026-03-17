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

    let realAccountContext = "";
    if (token) {
      realAccountContext = `This user has ${followerCount} followers and ${recentPosts.length} posts. 
      ${recentPosts.length === 0 ? "Since they have 0 posts, ALL REACH AND ENGAGEMENT FIGURES IN THE RESPONSE MUST BE 0." : "Calculate real proportional metrics."}`;
    }

    const prompt = `You are an AI Instagram Analyst. 95% Accuracy and REALISM Required.
Generate analytics data for a user in the "${niche || "general"}" niche over the last ${timeRange}.

SCALE INFO:
- Total Followers: ${followerCount}
- Account Size: This is a tiny account with ${followerCount} followers. ${followerCount < 100 ? "Use extremely small numbers." : "Use realistic proportional numbers."}
- Real Posts: ${recentPosts.length} posts found.

${realAccountContext}
STRICT ACCURACY RULES:
1. If Real Posts = 0: "Total Reach" must be "0". "Avg Engagement" must be "0.00%". "Net Followers" must be "0" or "+1".
2. If Real Posts = 0: All "reachData" days must be 0. All "formatData" must be 0%. All "engagementData" must be 0.
3. ABSOLUTELY FORBIDDEN: Do not output "150" for new followers unless the data justifies it. Do not output "1.2M" or "184K". Do not output "Scanning..." or "Active" for any numeric field.
4. The output must be 100% proportionally accurate to a ${followerCount} follower account with ${recentPosts.length} posts.

Respond in JSON:
{
  "summary": [
    { "label": "Total Reach", "value": "${recentPosts.length === 0 ? "0" : "<CALC>"}", ... },
    { "label": "Avg Engagement", "value": "${recentPosts.length === 0 ? "0.00%" : "<CALC>%"}", ... },
    { "label": "Net Followers", "value": "0", ... },
    ...
  ],
...
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
