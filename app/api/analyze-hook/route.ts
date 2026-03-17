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
    const { hook, niche } = await req.json();

    if (!hook) {
      return NextResponse.json(
        { error: "Hook is required" },
        { status: 400 }
      );
    }

    const prompt = `You are an expert Instagram algorithm analyst and copywriting master.
Analyze the following hook for an account in the "${niche || "general"}" niche.
Hook to analyze:
"""
${hook}
"""

Calculate the predicted 'Retention Probability' score and outline critical issues. Then generate 3 high-retention alternatives.
Respond strictly in valid JSON format with the following structure:
{
  "score": (a number between 10 and 99),
  "label": "Weak", "Average", "Strong", or "Viral",
  "color": "var(--red)" for weak, "var(--amber)" for average, "var(--green)" for strong/viral,
  "issues": [ an array of strings detailing critical issues found, max 3 ],
  "variants": [
    {
      "id": 1,
      "type": "Outcome-Led",
      "text": "The alternative hook text here.",
      "reason": "Why this works better."
    },
    ... (2 more variants like Agitation, Curiosity Gap, Negative Pivot)
  ]
}

Do not wrap the JSON in markdown code blocks. Just output raw JSON.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || '{}';
    try {
      const parsedResults = JSON.parse(content);
      return NextResponse.json(parsedResults);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response", content);
      return NextResponse.json(
        { error: "Failed to parse hook analysis results" },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to analyze hook. Check your API key and try again." },
      { status: 500 }
    );
  }
}
