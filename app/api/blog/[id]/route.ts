import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import BlogPost from "@/model/BlogPost";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const title = decodeURIComponent(id ?? "").trim();
    if (!title) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    await connectDB();
    const post = await BlogPost.findOne({
      title: new RegExp(`^${escapeRegExp(title)}$`, "i"),
    });

    if (!post) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}
