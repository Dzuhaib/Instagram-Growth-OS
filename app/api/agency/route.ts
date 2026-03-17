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
    const { niche = "Social Media Marketing", goal = "Client Growth" } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("ig_access_token")?.value;

    let realAccountContext = "No connected account detected. Just generate 5 entirely fake diverse mock clients.";

    if (token) {
      try {
        const profileRes = await fetch(
          `https://graph.instagram.com/v25.0/me?fields=id,username,name,followers_count&access_token=${token}`
        );
        const mediaRes = await fetch(
          `https://graph.instagram.com/v25.0/me/media?fields=id,like_count,comments_count&limit=10&access_token=${token}`
        );
        
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          let mediaSummary = "No recent posts exist. Extrapolate an initial reach of 500 and 10% engagement.";
          
          if (mediaRes.ok) {
            const mediaData = await mediaRes.json();
            if (mediaData.data && mediaData.data.length > 0) {
              const tempPosts = mediaData.data.map((p: any) => ({
                likes: p.like_count || 0,
                comments: p.comments_count || 0,
              }));
              mediaSummary = "Recent post stats: " + JSON.stringify(tempPosts);
            } else {
              mediaSummary = "The user has 0 posts. ABSOLUTELY 0 REACH AND 0% ENGAGEMENT.";
            }
          }
          
          realAccountContext = `IMPORTANT: A real Instagram account is currently connected! 
You MUST make the FIRST CLIENT in the "clients" array (id: 1) be exactly this person:
- name: "${profileData.name || "Your Account"}"
- handle: "@${profileData.username || "connected_user"}"
- followers: "${profileData.followers_count}"
- avatar: "${(profileData.name || profileData.username || "A").charAt(0).toUpperCase()}"
- avatar_color: "var(--accent-pink)"

STRICT CALCULATION RULES for this FIRST client:
1. If post count is 0, "weeklyReach" MUST be "0" and "engagement" MUST be "0%".
2. ABSOLUTELY DO NOT output "Active", "Live", or "Scanning...". Use numeric strings or integers for stats.
3. This account has ${profileData.followers_count} total followers. Be realistic.

${mediaSummary}`;
        }
      } catch (e) {
        console.error("IG fetch error in agency route:", e);
      }
    }

    const prompt = `You are a high-end, 95% accurate Instagram Agency manager. 
The agency focus is: ${niche}
The primary objective is: ${goal}

Generate a list of exactly 5 clients in this agency's portfolio.
${realAccountContext}

Include their specific metrics, growth trends, and health scores.
Respond strictly in valid JSON format with the following structure:
{
  "summary": [
    { "label": "Active Subscriptions", "value": "5", "color": "var(--accent-pink)", "icon": "Target" },
    { "label": "Combined Network Reach", "value": "<CALCULATED_TOTAL>", "color": "var(--green)", "icon": "TrendingUp" },
    { "label": "Average Engagement", "value": "<CALCULATED_AVERAGE>", "color": "var(--amber)", "icon": "BarChart3" },
    { "label": "Critical Alerts", "value": "0", "color": "var(--red)", "icon": "AlertTriangle" }
  ],
  "clients": [
    {
      "id": 1,
      "name": "<ACCOUNT_NAME>",
      "handle": "<@HANDLE>",
      "followers": "<COUNT>",
      "weeklyReach": "<EXACT_NUMBER_EG_150K>",
      "engagement": "<EXACT_PERCENT_EG_5.2%>",
      "nicheScore": <NUMBER_0_TO_100>,
      "lastPost": "Time ago",
      "trend": "up",
      "avatar": "First initial",
      "avatar_color": "Hex or CSS variable"
    },
    ... (total 5)
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
