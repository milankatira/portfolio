'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SubscribeButton } from './subscribe-button';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface PricingPlansProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentPlan: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plans: any[];
}

export default function PricingPlans({
  currentPlan,
  plans,
}: PricingPlansProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className='py-12' id='pricing'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold mb-4'>Simple, Transparent Pricing</h2>
        <div className='flex items-center justify-center gap-4'>
          <span className={!isYearly ? 'font-semibold' : ''}>Monthly</span>
          <button
            className='relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors'
            onClick={() => setIsYearly(!isYearly)}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                isYearly ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </button>
          <span className={isYearly ? 'font-semibold' : ''}>
            Yearly (Save 20%)
          </span>
        </div>
      </div>

      <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {plans.map((plan) => (
          <Card key={plan.id} className='p-8'>
            <div className='flex flex-col h-full'>
              <div>
                <h3 className='text-2xl font-bold'>{plan.name}</h3>
                <p className='mt-4 text-3xl font-bold'>
                  ${isYearly ? (plan.price * 0.8 * 12).toFixed(2) : plan.price}
                  <span className='text-base font-normal text-muted-foreground'>
                    /{isYearly ? 'year' : 'month'}
                  </span>
                </p>
                <ul className='mt-8 space-y-4'>
                  {plan.features.map((feature: string) => (
                    <li key={feature} className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-primary' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-8 flex-grow flex items-end'>
                {currentPlan?.type === plan.type ? (
                  <Button variant='outline' className='w-full' disabled>
                    Current Plan
                  </Button>
                ) : (
                  <SubscribeButton
                    planId={plan.id}
                    planName={plan.name}
                    className={cn(
                      'w-full',
                      plan.type === 'PRO' && 'bg-primary text-white'
                    )}
                  />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
