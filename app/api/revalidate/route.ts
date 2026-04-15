import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify secret token (add REVALIDATE_SECRET to .env.local)
  const secret = request.headers.get('x-revalidate-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'Invalid revalidation secret' },
      { status: 401 }
    );
  }

  try {
    // Revalidate the home page to refresh blog posts
    revalidatePath('/', 'layout');

    return NextResponse.json(
      { message: 'Revalidation successful', revalidated: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}
