'use client';

import { getFeedbackByUser } from '@/actions/feedback.action';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Feedback {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

interface FeedbackListProps {
  userId: string;
}

export default function FeedbackList({ userId }: FeedbackListProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getFeedbackByUser();
        if (!data) return;
        setFeedbacks(
          data.map((feedback) => ({
            ...feedback,
            status: 'pending', // Add default status since it's required by Feedback interface
            createdAt: feedback.createdAt.toISOString(),
          }))
        );
      } catch (error) {
        console.error('Failed to load feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFeedbacks();
    }
  }, [userId]);

  if (loading) {
    return <p>Loading feedback...</p>;
  }

  if (feedbacks.length === 0) {
    return <p>No feedback available.</p>;
  }

  return (
    <div className='p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>📋 Your Feedback</h2>
      <ul className='space-y-4'>
        {feedbacks.map((feedback) => (
          <Link key={feedback.id} href={`/feedback/${feedback.id}`}>
            <li className='p-4 rounded-lg'>
              <h3 className='font-medium'>{feedback.title}</h3>
              <p className='text-sm0'>{feedback.description}</p>
              <p className='text-xs opacity-70'>Status: {feedback.status}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
