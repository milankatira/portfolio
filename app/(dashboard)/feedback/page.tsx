'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Search,
  Loader2,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteFeedback, getFeedbackByUser } from '@/actions/feedback.action';
import FeedbackDialog from '@/components/Feedback/feedback-dialog';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Feedback {
  id: string;
  title: string;
  description: string;
  _count: {
    Submission: number;
  };
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFeedbacks = async () => {
    try {
      const data = await getFeedbackByUser();
      if (!data) return;
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const router = useRouter();

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: string) => {
    router.push(`feedback/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteFeedback(id);
    await fetchFeedbacks();
  };

  const handleView = (id: string) => {
    router.push(`feedback/${id}?code=true`);
  };

  return (
    <div className='min-h-screen bg-background py-8 px-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-semibold'>Feedback Flow</h1>
          <p className='text-muted-foreground'>
            Manage your feedback campaigns effortlessly.
          </p>
        </div>

        <FeedbackDialog
          onSuccess={(data: { id: string }) => {
            router.push(`/feedback/${data.id}`);
            fetchFeedbacks();
          }}
        >
          <Button className='px-6 py-3  rounded-lg '>+ New Feedback</Button>
        </FeedbackDialog>
      </div>

      {/* Search Bar */}
      <div className='flex items-center mb-6'>
        <Input
          placeholder='Search feedbacks...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-md'
        />
        <Button variant='outline' size='icon' className='ml-2'>
          <Search className='h-5 w-5' />
        </Button>
      </div>

      {/* Feedback List */}
      {loading ? (
        <div className='flex justify-center items-center py-20'>
          <Loader2 className='animate-spin h-6 w-6 text-muted-foreground' />
        </div>
      ) : filteredFeedbacks.length === 0 ? (
        <div className='text-center text-muted-foreground py-20'>
          No feedbacks found.
        </div>
      ) : (
        <div className='flex flex-row gap-4 flex-wrap'>
          {filteredFeedbacks.map((feedback) => (
            <Link href={`feedback/${feedback.id}`} key={feedback.id}>
              <Card className='flex justify-between items-center px-4 py-3 transition rounded-lg cursor-pointer w-full max-w-96'>
                <div className='flex items-center gap-4'>
                  <div className='h-8 w-8 flex items-center justify-center rounded-full uppercase'>
                    {feedback.title.charAt(0)}
                  </div>
                  <div>
                    <h2 className='font-medium'>{feedback.title}</h2>
                    <p className='text-xs text-muted-foreground opacity-50'>
                      {feedback.description}
                    </p>

                    <span className='text-sm my-4 opacity-50'>
                      {feedback._count.Submission} submissions
                    </span>
                  </div>
                </div>

                <div className='flex items-center gap-2 ml-20'>
                  {/* 3-Dot Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <MoreVertical className='h-5 w-5' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(feedback.id);
                        }}
                        className='cursor-pointer'
                      >
                        <Pencil className='h-4 w-4 mr-2' />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(feedback.id);
                        }}
                        className='cursor-pointer text-red-500'
                      >
                        <Trash2 className='h-4 w-4 mr-2' />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(feedback.id);
                        }}
                        className='cursor-pointer'
                      >
                        <Eye className='h-4 w-4 mr-2' />
                        View
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
