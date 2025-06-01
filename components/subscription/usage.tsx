'use client';

import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SubscriptionUsageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscription: any;
}

export default function SubscriptionUsage({
  subscription,
}: SubscriptionUsageProps) {
  // Example usage limits (you'll need to implement actual usage tracking)
  const usage = {
    responses: 850,
    maxResponses: subscription?.plan?.type === 'FREE' ? 1000 : 'unlimited',
    forms: 3,
    maxForms: subscription?.plan?.type === 'FREE' ? 5 : 'unlimited',
  };

  const getUsagePercentage = (used: number, max: number | string) => {
    if (max === 'unlimited') return 0;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return (used / max) * 100;
  };

  const isNearLimit = (used: number, max: number | string) => {
    if (max === 'unlimited') return false;
    return used / (max as number) > 0.8;
  };

  return (
    <div className='grid gap-6 md:grid-cols-2'>
      <Card className='p-6'>
        <h3 className='font-semibold mb-4'>Response Usage</h3>
        <div className='space-y-4'>
          <Progress
            value={getUsagePercentage(usage.responses, usage.maxResponses)}
          />
          <p className='text-sm text-muted-foreground'>
            {usage.responses} /{' '}
            {usage.maxResponses === 'unlimited' ? '∞' : usage.maxResponses}{' '}
            responses
          </p>
          {isNearLimit(usage.responses, usage.maxResponses) && (
            <Alert variant='default'>
              <AlertTriangle className='h-4 w-4' />
              <AlertTitle>Approaching Limit</AlertTitle>
              <AlertDescription>
                {` You're close to your monthly response limit. Consider upgrading
                to continue collecting feedback.`}
                <Link href='#pricing'>
                  <Button variant='link' className='p-0 h-auto font-normal'>
                    View Plans →
                  </Button>
                </Link>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      <Card className='p-6'>
        <h3 className='font-semibold mb-4'>Active Forms</h3>
        <div className='space-y-4'>
          <Progress value={getUsagePercentage(usage.forms, usage.maxForms)} />
          <p className='text-sm text-muted-foreground'>
            {usage.forms} /{' '}
            {usage.maxForms === 'unlimited' ? '∞' : usage.maxForms} forms
          </p>
          {isNearLimit(usage.forms, usage.maxForms) && (
            <Alert variant='default'>
              <AlertTriangle className='h-4 w-4' />
              <AlertTitle>Form Limit</AlertTitle>
              <AlertDescription>
                {` You're reaching your form limit. Upgrade to create more feedback
                forms.`}
                <Link href='#pricing'>
                  <Button variant='link' className='p-0 h-auto font-normal'>
                    View Plans →
                  </Button>
                </Link>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>
    </div>
  );
}
