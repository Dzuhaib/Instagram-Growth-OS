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
    const { caption, hasThumbnail, niche } = await req.json();

    if (!caption && !hasThumbnail) {
      return NextResponse.json(
        { error: "Caption or thumbnail is required" },
        { status: 400 }
      );
    }

    const prompt = `You are an elite Instagram algorithm analyst providing 95% accurate scores based precisely on current Meta ranking signals.
Analyze the following caption for an account in the "${niche || "general"}" niche:
(and text that might be in an image if hasThumbnail is true)

Caption:
"""
${caption}
"""
Has Thumbnail Image (may contain text): ${hasThumbnail}

Calculate the predicted metrics and rewrite the caption to be highly optimized for Instagram.
Respond strictly in valid JSON format with the following structure:
{
  "hook": {
    "score": (a number between 30 and 99),
    "label": "Weak", "Average", "Strong", or "Viral",
    "color": "var(--red)" for weak, "var(--amber)" for average, "var(--green)" for strong/viral
  },
  "dmShare": {
    "score": (a number between 30 and 99),
    "label": "Weak", "Average", "Strong", or "Viral",
    "color": "var(--red)" for weak, "var(--amber)" for average, "var(--green)" for strong/viral
  },
  "niche": {
    "score": (a number between 30 and 99),
    "label": "Needs Work", "Average", "Strong", or "Perfect",
    "color": "var(--red)" for needs work, "var(--amber)" for average, "var(--green)" for strong/perfect
  },
  "rewritten": "A rewritten, highly optimized version of the caption with great formatting and line breaks."
}

Do not wrap the JSON in markdown code blocks. Just output raw JSON.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || '{}';
    try {
      const parsedResults = JSON.parse(content);
      return NextResponse.json(parsedResults);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response", content);
      return NextResponse.json(
        { error: "Failed to parse scoring results" },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to score content. Check your API key and try again." },
      { status: 500 }
    );
  }
}
