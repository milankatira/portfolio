import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import BlogPost from "@/model/BlogPost";

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find(
      {},
      { title: 1, thumbnail: 1, _id: 1, content: 1, excerpt: 1 }
    );
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
