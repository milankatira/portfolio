'use client';

import { startTransition, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createFeedback } from '@/actions/feedback.action';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '../ui/loading-spinner';

interface FeedbackDialogProps {
  children: React.ReactNode;
  onSuccess?: (data: never) => void;
}

export default function FeedbackDialog({
  children,
  onSuccess,
}: FeedbackDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const maxChars = 300;

  const { toast } = useToast();

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= maxChars) {
      setDescription(e.target.value);
      setCharCount(e.target.value.length);
    }
  };

  const handleSubmit = () => {
    if (!title || !description) {
      toast({
        title: 'Missing Information',
        description: 'Please fill out both the Title and Description fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    startTransition(async () => {
      try {
        const data = await createFeedback(title, description);

        toast({
          title: 'Feedback Created 🎉',
          description: 'Your feedback has been successfully created!',
        });

        onSuccess?.(data as never);

        setTitle('');
        setDescription('');
        setCharCount(0);
        setOpen(false); // Close the dialog only after success
      } catch (error) {
        console.error('Error creating feedback:', error);
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='p-6 rounded-lg shadow-lg w-[400px]'>
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
          <DialogDescription>
            Add basic details about your feedback.
          </DialogDescription>
        </DialogHeader>

        {/* Title Input */}
        <div className='space-y-2'>
          <label htmlFor='title' className='text-sm font-medium'>
            Title <span className='text-red-500'>*</span>
          </label>
          <Input
            id='title'
            placeholder='Enter Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description Input */}
        <div className='space-y-2'>
          <label htmlFor='description' className='text-sm font-medium'>
            Description <span className='text-red-500'>*</span>
          </label>
          <Textarea
            id='description'
            placeholder='Describe your feedback...'
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
          />
          <p className='text-xs text-right'>
            {charCount}/{maxChars} characters
          </p>
        </div>

        {/* Submit Button */}
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : `Let's get creative!`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
