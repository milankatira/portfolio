import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import BlogPost from "@/model/BlogPost";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    await connectDB();
    const query = { title: new RegExp(params.id, "i") };
    const post = await BlogPost.find(query);

    if (!post || post.length === 0) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post[0]);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}
