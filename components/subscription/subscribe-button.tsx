'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createCheckoutSession } from '@/actions/subscription.action';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface SubscribeButtonProps {
  planId: string;
  planName: string;
  className?: string;
}

export function SubscribeButton({
  planId,
  planName,
  className,
}: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const { url } = await createCheckoutSession(planId);
      if (url) window.location.href = url;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to start subscription process',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSubscribe} disabled={loading} className={className}>
      {loading ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Processing...
        </>
      ) : (
        `Upgrade to ${planName}`
      )}
    </Button>
  );
}
