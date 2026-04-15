import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import BlogPost from "@/model/BlogPost";
import { BlogPost as BlogPostType } from "@/types/blog";

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find({}, {
      title: 1,
      thumbnail: 1,
      _id: 1,
      content: 1,
      excerpt: 1,
      tags: 1,
      isPublic: 1,
      createdAt: 1,
      updatedAt: 1,
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Blog API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
