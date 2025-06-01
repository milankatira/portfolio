import { NextResponse, type NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import prisma from '@/lib/prisma';

// Dynamic route handler for /api/feedback/[feedbackId]
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const feedbackId = params.id;

    if (!feedbackId || !ObjectId.isValid(feedbackId.trim())) {
      return NextResponse.json(
        { error: 'Invalid feedback ID.' },
        { status: 400 }
      );
    }

    const feedbackForm = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        sections: {
          include: {
            formFields: true,
          },
        },
        theme: true,
      },
    });

    if (!feedbackForm) {
      return NextResponse.json(
        { error: 'Feedback form not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: feedbackForm }, { status: 200 });
  } catch (error) {
    console.error('Error fetching feedback form:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback form.' },
      { status: 500 }
    );
  }
};
