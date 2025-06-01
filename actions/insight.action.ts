'use server';

import prisma from '@/lib/prisma';
import { fetchCurrentUser } from './auth.action';

export async function getUserFeedbacks() {
  const auth = await fetchCurrentUser();
  return await prisma.feedback.findMany({
    where: { userId: auth.id },
    select: {
      id: true,
      title: true,
    },
  });
}

export async function getSubmissionCount(feedbackId: string) {
  return await prisma.submission.count({
    where: { feedbackId },
  });
}

export async function getSectionsByFeedbackId(feedbackId: string) {
  return await prisma.section.findMany({
    where: { feedbackId },
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
    },
  });
}

export async function getResponsesBySectionId(
  sectionId: string,
  startDate?: Date,
  endDate?: Date,
  page: number = 1, // Current page (default: 1)
  limit: number = 10 // Items per page (default: 10)
) {
  const skip = (page - 1) * limit; // Calculate items to skip for the current page

  // Fetch total count of responses
  const totalCount = await prisma.response.count({
    where: {
      sectionId,
      ...(startDate && endDate
        ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
        : {}),
    },
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  // Fetch paginated responses
  const responses = await prisma.response.findMany({
    where: {
      sectionId,
      ...(startDate && endDate
        ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
        : {}),
    },
    orderBy: {
      createdAt: 'desc', // Sort by creation date descending (newest first)
    },
    skip, // Skip items for pagination
    take: limit, // Limit the number of items per page
    include: {
      formField: {
        select: {
          id: true,
          label: true,
          type: true,
          placeholder: true,
          required: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return {
    responses, // Array of responses
    totalCount, // Total number of responses
    totalPages, // Total number of pages
    currentPage: page, // Current page
    limit, // Items per page
  };
}

export async function getLocationStats(feedbackId: string) {
  return await prisma.submission.groupBy({
    by: ['country'],
    where: { feedbackId },
    _count: {
      country: true,
    },
  });
}

export async function getRatingStatistics(feedbackId: string) {
  const ratings = await prisma.response.findMany({
    where: {
      section: { feedbackId },
      formField: { type: 'RATING' },
    },
    select: { answer: true },
  });

  const ratingCounts = [1, 2, 3, 4, 5].reduce(
    (acc, star) => {
      acc[star] = ratings.filter((r) => parseInt(r.answer) === star).length;
      return acc;
    },
    {} as Record<number, number>
  );

  const totalRatings = ratings.length;
  const totalScore = ratings.reduce((sum, r) => sum + parseInt(r.answer), 0);
  const averageRating = totalRatings
    ? (totalScore / totalRatings).toFixed(2)
    : '0.00';

  return { ratingCounts, totalRatings, averageRating };
}

export async function calculateNPS(feedbackId: string) {
  const responses = await prisma.response.findMany({
    where: {
      section: { feedbackId },
      formField: { type: 'RATING' },
    },
    select: { answer: true },
  });

  const ratings = responses.map((r) => parseInt(r.answer));
  const totalResponses = ratings.length;

  // Adjusted for 5-point scale:
  // 5 = Promoters
  // 4 = Passives
  // 1-3 = Detractors
  const promoters = ratings.filter((score) => score === 5).length;
  const passives = ratings.filter((score) => score === 4).length;
  const detractors = ratings.filter((score) => score <= 3).length;

  const promoterPercent = totalResponses
    ? (promoters / totalResponses) * 100
    : 0;
  const detractorPercent = totalResponses
    ? (detractors / totalResponses) * 100
    : 0;
  const npsScore = Math.round(promoterPercent - detractorPercent);

  return {
    npsScore,
    promoters,
    passives,
    detractors,
    totalResponses,
  };
}

export async function getSubmissionsByDate(
  feedbackId: string,
  startDate: Date,
  endDate: Date
) {
  const pipeline = [
    {
      $match: {
        feedbackId: { $oid: feedbackId },
        createdAt: {
          $gte: { $date: startDate.toISOString() },
          $lte: { $date: endDate.toISOString() },
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];

  const submissions = await prisma.submission.aggregateRaw({
    pipeline,
  });

  return submissions;
}
