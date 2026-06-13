import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { Category } from "@/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CATEGORIES: Category[] = [
  "Food & Dining", "Transport", "Housing", "Entertainment",
  "Healthcare", "Shopping", "Education", "Utilities", "Travel", "Other",
];

export async function POST(req: NextRequest) {
  try {
    const { title, amount } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",   // fast + cheap — perfect for categorization
      max_tokens: 20,
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `You are an expense categorizer. Given an expense title and optional amount, 
reply with ONLY one of these exact category names, nothing else:
${CATEGORIES.join(", ")}`,
        },
        {
          role: "user",
          content: `Expense: "${title}"${amount ? `, Amount: $${amount}` : ""}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content?.trim() ?? "Other";
    const category: Category = CATEGORIES.includes(raw as Category)
      ? (raw as Category)
      : "Other";

    return NextResponse.json({ category });
  } catch (err) {
    console.error("AI categorize error:", err);
    return NextResponse.json({ category: "Other" });   // graceful fallback
  }
}
