import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { title, outline } = await req.json();
    if (!title || !outline) {
      return NextResponse.json({ error: "Missing title or outline" }, { status: 400 });
    }
    const content = await generateBlogPost({ title, outline });
    return NextResponse.json({ content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate post" }, { status: 500 });
  }
} 