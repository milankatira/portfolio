'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, Plus, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  fetchAuthorizedOrigins,
  addAuthorizedOrigin,
  deleteAuthorizedOrigin,
} from '@/actions/dashboard.action';
import FeedbackDialog from '@/components/Feedback/feedback-dialog';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { syncUserInDb } from '@/actions/auth.action';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function GetStartedPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [origins, setOrigins] = useState<
    {
      id: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
      origin: string;
    }[]
  >([]);
  const [newOrigin, setNewOrigin] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadOrigins = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAuthorizedOrigins();
        setOrigins(data);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars
      } catch (err) {
        toast({
          title: 'Error Loading Origins',
          description: 'Failed to load authorized origins. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    syncUserInDb();
    loadOrigins();
  }, [toast]);

  const handleAddOrigin = async () => {
    if (!newOrigin.trim()) {
      setError('Origin URL is required');
      return;
    }

    try {
      setIsAdding(true);
      setError('');
      const newEntry = await addAuthorizedOrigin(newOrigin);
      setOrigins([...origins, newEntry]);
      setNewOrigin('');
      setOpen(false);
      toast({
        title: 'Origin Added Successfully',
        description: `${newOrigin} has been added to authorized origins.`,
      });
    } catch (err) {
      setNewOrigin('');
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to add origin';
      setError(errorMessage);
      toast({
        title: 'Error Adding Origin',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteOrigin = async (originId: string) => {
    try {
      setIsDeleting(originId);
      await deleteAuthorizedOrigin(originId);
      setOrigins(origins.filter((origin) => origin.id !== originId));
      toast({
        title: 'Origin Deleted',
        description: 'The origin has been removed successfully.',
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({
        title: 'Error Deleting Origin',
        description: 'Failed to delete the origin. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className='p-8 min-h-screen bg-gradient-to-b from-background to-background/95 space-y-12'>
      <div className='rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-12 space-y-6 border shadow-lg'>
        <div className='max-w-2xl space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            Collect Feedback Easily
          </h1>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            Create feedback forms in minutes to understand user needs and drive
            improvements for your product.
          </p>
          <FeedbackDialog
            onSuccess={(data: { id: string }) => router.push(`/feedback/${data.id}`)}
          >
            <Button size='lg' className='mt-4'>
              <Plus className='h-4 w-4 mr-2' />
              Create Feedback Form
            </Button>
          </FeedbackDialog>
        </div>
      </div>

      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h2 className='text-2xl font-semibold tracking-tight'>
              Manage JavaScript Origins
            </h2>
            <p className='text-muted-foreground'>
              Add and manage authorized domains for your feedback forms
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className='h-4 w-4 mr-2' />
                Add Origin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Origin</DialogTitle>
                <DialogDescription>
                  Enter the origin URL to authorize for your feedback forms
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-4'>
                <Input
                  placeholder='https://example.com'
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                />
                {error && (
                  <div className='flex items-center gap-2 text-destructive text-sm'>
                    <AlertCircle className='h-4 w-4' />
                    {error}
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleAddOrigin} disabled={isAdding}>
                  {isAdding ? (
                    <Loader2 className='h-4 w-4 animate-spin mr-2' />
                  ) : (
                    'Add Origin'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className='border shadow-md'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Globe className='h-5 w-5 text-primary' />
              Authorized JavaScript Origins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {isLoading ? (
                <div className='flex items-center justify-center p-8'>
                  <Loader2 className='h-8 w-8 animate-spin text-primary' />
                </div>
              ) : origins.length > 0 ? (
                origins.map((origin, index) => (
                  <div
                    key={origin.id}
                    className={cn(
                      'group flex items-center justify-between p-3 rounded-lg border bg-card transition-colors',
                      isDeleting === origin.id
                        ? 'opacity-50'
                        : 'hover:bg-accent/50'
                    )}
                  >
                    <div className='flex items-center gap-3'>
                      <span className='flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium'>
                        {index + 1}
                      </span>
                      <span className='font-medium'>{origin.origin}</span>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDeleteOrigin(origin.id)}
                      disabled={isDeleting === origin.id}
                      className={cn('transition-all')}
                    >
                      {isDeleting === origin.id ? (
                        <Loader2 className='h-4 w-4 animate-spin ' />
                      ) : (
                        <Trash2 className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                ))
              ) : (
                <div className='flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed'>
                  <Globe className='h-8 w-8 text-muted-foreground mb-3' />
                  <p className='text-muted-foreground'>No origins added yet</p>
                  <p className='text-sm text-muted-foreground'>
                    Add your first origin below to get started
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
