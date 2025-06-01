'use server';

import { defaultSections } from '@/constant/defaultData';
import prisma from '@/lib/prisma';
import { FeedbackWithDetails, SectionData, ThemeData } from '@/types/feedback';
import { Feedback, Theme } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { fetchCurrentUser } from './auth.action';

export async function createFeedback(
  title: string,
  description: string
): Promise<Feedback> {
  try {
    const user = await fetchCurrentUser();
    const validUserId = new ObjectId(user.id.trim());

    const theme: Theme = await prisma.theme.create({
      data: {
        primaryColor: '#FFFFFF',
        secondaryColor: '#FFFFFF',
        borderRadius: '8px',
      },
    });

    const feedback: Feedback = await prisma.feedback.create({
      data: {
        title,
        description,
        userId: validUserId.toString(),
        themeId: theme.id,
      },
    });

    for (const section of defaultSections) {
      await prisma.section.create({
        data: {
          title: section.title,
          description: section.description,
          enabled: section.enabled,
          feedbackId: feedback.id,
          userId: validUserId.toString(),
          formFields: {
            create: section.fields.map((field) => ({
              label: field.label,
              type: field.type,
              placeholder: field.type === 'URL' ? null : field.placeholder,
              url: field.type === 'URL' ? field.url : null,
              required: field.required ?? false,
            })),
          },
        },
      });
    }

    return feedback;
  } catch (error) {
    console.error('Error creating feedback with default sections:', error);
    throw new Error('Failed to create feedback with sections and form fields.');
  }
}

export async function getFeedbackByUser() {
  try {
    const auth = await fetchCurrentUser();
    const validUserId = new ObjectId(auth.id.trim());

    const feedbacks = await prisma.feedback.findMany({
      where: { userId: validUserId.toString() },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { Submission: true },
        },
      },
    });

    return feedbacks;
  } catch (error) {
    console.error('Error fetching feedback by userId:', error);
    throw new Error('Failed to fetch feedback.');
  }
}

export async function updateFeedbackTheme(
  feedbackId: string,
  themeData: ThemeData
): Promise<Theme> {
  try {
    const validFeedbackId = new ObjectId(feedbackId.trim());

    const feedback = await prisma.feedback.findUnique({
      where: { id: validFeedbackId.toString() },
      include: { theme: true },
    });

    if (!feedback) {
      throw new Error('Feedback not found.');
    }

    let theme: Theme;

    if (feedback.themeId) {
      theme = await prisma.theme.update({
        where: { id: feedback.themeId },
        data: {
          primaryColor: themeData.primaryColor,
          secondaryColor: themeData.secondaryColor,
          borderRadius: themeData.borderRadius,
        },
      });
    } else {
      theme = await prisma.theme.create({
        data: {
          primaryColor: themeData.primaryColor,
          secondaryColor: themeData.secondaryColor,
          borderRadius: themeData.borderRadius,
        },
      });

      await prisma.feedback.update({
        where: { id: validFeedbackId.toString() },
        data: { themeId: theme.id },
      });
    }

    return theme;
  } catch (error) {
    console.error('Error updating feedback theme:', error);
    throw new Error('Failed to create or update feedback theme.');
  }
}

export async function getFeedbackTheme(feedbackId: string) {
  try {
    // Validate the Feedback ID
    const validFeedbackId = new ObjectId(feedbackId.trim());

    // Fetch the Feedback with the related Theme
    const feedback = await prisma.feedback.findUnique({
      where: { id: validFeedbackId.toString() },
      include: {
        theme: true, // Include the related theme
      },
    });

    // If no feedback or no theme is found, handle it gracefully
    if (!feedback) {
      throw new Error('Feedback not found.');
    }

    if (!feedback.theme) {
      throw new Error('No theme associated with this feedback.');
    }

    // Return the theme
    return feedback.theme;
  } catch (error) {
    console.error('Error fetching feedback theme:', error);
    throw new Error('Failed to fetch feedback theme.');
  }
}

export async function updateFeedbackFormFields(
  feedbackId: string,
  sections: SectionData[]
): Promise<{ message: string }> {
  try {
    const user = await fetchCurrentUser();
    const validUserId = new ObjectId(user.id.trim());
    // ✅ Validate Feedback ID
    if (!feedbackId || !ObjectId.isValid(feedbackId.trim())) {
      throw new Error('Invalid feedback ID provided.');
    }

    const validFeedbackId = new ObjectId(feedbackId.trim());

    // ✅ 1. Find all sections for the feedback
    const existingSections = await prisma.section.findMany({
      where: { feedbackId: validFeedbackId.toString() },
      select: { id: true },
    });

    const sectionIds = existingSections.map((section) => section.id);

    // ✅ 2. Manually delete form fields linked to the sections
    if (sectionIds.length > 0) {
      const formFieldIds = await prisma.formField
        .findMany({
          where: { sectionId: { in: sectionIds } },
          select: { id: true },
        })
        .then((fields) => fields.map((f) => f.id));

      await prisma.response.deleteMany({
        where: {
          formFieldId: {
            in: await prisma.formField
              .findMany({
                where: { sectionId: { in: sectionIds } },
                select: { id: true },
              })
              .then((fields) => fields.map((f) => f.id)),
          },
        },
      });

      await prisma.guestUser.deleteMany({
        where: {
          formFieldId: { in: formFieldIds },
        },
      });

      await prisma.formField.deleteMany({
        where: { sectionId: { in: sectionIds } },
      });

      // ✅ 3. Delete the sections
      await prisma.section.deleteMany({
        where: { id: { in: sectionIds } },
      });
    }

    // ✅ 4. Create new sections and form fields
    for (const section of sections) {
      await prisma.section.create({
        data: {
          userId: validUserId.toString(),
          title: section.title,
          description: section.description,
          enabled: section.enabled,
          feedbackId: validFeedbackId.toString(),
          formFields: {
            create: section.fields.map((field) => ({
              label: field.label,
              type: field.type,
              placeholder: field.type === 'URL' ? null : field.placeholder,
              url: field.type === 'URL' ? field.url : null,
              required: field.required ?? false,
            })),
          },
        },
      });
    }

    return { message: 'Feedback form fields updated successfully.' };
  } catch (error) {
    console.error('Error updating feedback form fields:', error);
    throw new Error('Failed to update feedback form fields.');
  }
}

export async function getFeedbackFormById(
  feedbackId: string
): Promise<FeedbackWithDetails> {
  try {
    // ✅ Validate Feedback ID
    if (!feedbackId || !ObjectId.isValid(feedbackId.trim())) {
      throw new Error('Invalid feedback ID.');
    }

    const validFeedbackId = new ObjectId(feedbackId.trim());

    // ✅ Fetch Feedback with Sections and FormFields
    const feedbackForm = await prisma.feedback.findUnique({
      where: { id: validFeedbackId.toString() },
      include: {
        sections: {
          include: {
            formFields: true, // ✅ Include formFields for each section
          },
          orderBy: { createdAt: 'asc' }, // ✅ Sort sections by creation date
        },
        theme: true, // ✅ Include associated theme
      },
    });

    // ❗ Handle Missing Feedback
    if (!feedbackForm) {
      throw new Error('Feedback form not found.');
    }

    return feedbackForm as FeedbackWithDetails;
  } catch (error) {
    console.error('Error fetching feedback form:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch feedback form.'
    );
  }
}

export async function deleteFeedback(
  feedbackId: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate and format the feedback ID
    const validFeedbackId = new ObjectId(feedbackId.trim());

    // Fetch the feedback with related data
    const feedback = await prisma.feedback.findUnique({
      where: { id: validFeedbackId.toString() },
      include: {
        sections: {
          include: {
            formFields: true,
          },
        },
        theme: true,
        Submission: {
          include: {
            responses: true,
            guestUser: true,
          },
        },
      },
    });

    if (!feedback) {
      throw new Error('Feedback not found.');
    }

    // Start a Prisma transaction to delete all related entities
    await prisma.$transaction(async (transaction) => {
      // 1. Delete all responses related to the feedback
      await transaction.response.deleteMany({
        where: {
          OR: [
            {
              submissionId: {
                in: feedback.Submission.map((submission) => submission.id),
              },
            },
            {
              formFieldId: {
                in: feedback.sections.flatMap((section) =>
                  section.formFields.map((field) => field.id)
                ),
              },
            },
          ],
        },
      });

      // 2. Delete all guest users related to submissions
      await transaction.guestUser.deleteMany({
        where: {
          formFieldId: {
            in: feedback.sections.flatMap((section) =>
              section.formFields.map((field) => field.id)
            ),
          },
        },
      });

      // 3. Delete all submissions related to feedback
      await transaction.submission.deleteMany({
        where: { feedbackId: validFeedbackId.toString() },
      });

      // 4. Delete all form fields related to sections
      await transaction.formField.deleteMany({
        where: {
          sectionId: {
            in: feedback.sections.map((section) => section.id),
          },
        },
      });

      // 5. Delete all sections related to feedback
      await transaction.section.deleteMany({
        where: { feedbackId: validFeedbackId.toString() },
      });

      // 6. Delete the theme if associated with feedback
      if (feedback.themeId) {
        await transaction.theme.delete({
          where: { id: feedback.themeId },
        });
      }

      // 7. Finally, delete the feedback itself
      await transaction.feedback.delete({
        where: { id: validFeedbackId.toString() },
      });
    });

    return {
      success: true,
      message: 'Feedback and all related data deleted successfully.',
    };
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw new Error('Failed to delete feedback.');
  }
}
export async function fetchFieldsBySectionId(sectionId: string) {
  try {
    const fields = await prisma.formField.findMany({
      where: {
        sectionId: sectionId,
      },
      select: {
        id: true,
        label: true,
        type: true,
        required: true,
      },
    });

    return fields;
  } catch (error) {
    console.error('Error fetching fields:', error);
    throw new Error('Failed to fetch fields for the selected section.');
  }
}

export async function fetchCampaignsWithSections() {
  try {
    const user = await fetchCurrentUser();
    const validUserId = user.id.trim();
    const sections = await prisma.section.findMany({
      where: {
        feedback: {
          userId: validUserId,
        },
      },
      include: {
        feedback: {
          select: {
            title: true,
          },
        },
      },
    });

    // Format the result to include section data with feedback title
    return sections.map((section) => ({
      id: section.id,
      title: section.title,
      description: section.description,
      feedbackTitle: section.feedback?.title || 'No Title',
      feedbackId: section.feedbackId,
    }));
  } catch (error) {
    console.error('Error fetching sections with feedback title:', error);
    throw new Error('Failed to fetch sections');
  }
}

export async function fetchFeedbackMetrics() {
  try {
    // Fetch total feedback count
    const totalFeedbackCount = await prisma.feedback.count();

    // Fetch total ratings and calculate average rating
    const ratingStats = await prisma.response.groupBy({
      by: ['answer'],
      _count: { answer: true },
      where: { formField: { type: 'RATING' } },
    });

    const totalRatings = ratingStats.reduce(
      (sum, r) => sum + r._count.answer,
      0
    );
    const totalRatingValue = ratingStats.reduce(
      (sum, r) => sum + parseFloat(r.answer) * r._count.answer,
      0
    );
    const averageRating =
      totalRatings > 0 ? (totalRatingValue / totalRatings).toFixed(2) : '0.00';

    // Fetch happy customer count (ratings >= 4)
    const happyCustomers = ratingStats
      .filter((r) => parseFloat(r.answer) >= 4)
      .reduce((sum, r) => sum + r._count.answer, 0);

    return {
      totalFeedback: totalFeedbackCount,
      totalRatings,
      averageRating,
      happyCustomers,
    };
  } catch (error) {
    console.error('Error fetching feedback metrics:', error);
    throw new Error('Failed to fetch feedback metrics.');
  }
}
