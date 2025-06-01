import React from 'react';
import { Star, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const NPSCard = () => {
  // Dummy data
  const npsData = {
    promoters: 120, // People who rated 9-10
    passives: 60, // People who rated 7-8
    detractors: 20, // People who rated 0-6
    totalResponses: 200, // Total number of responses
  };

  // Calculate NPS Score
  const npsScore = Math.round(
    ((npsData.promoters - npsData.detractors) / npsData.totalResponses) * 100
  );

  return (
    <Card className='p-4 w-full'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <Star className='h-5 w-5 text-primary' />
          </div>
          Net Promoter Score (NPS)
        </CardTitle>
        <CardDescription>
          Overall customer satisfaction and loyalty metric
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-6'>
        {/* NPS Score Circle */}
        <div className='relative flex items-center justify-center'>
          <div
            className={cn(
              'h-36 w-36 rounded-full flex items-center justify-center',
              'bg-gradient-to-br from-background to-primary/5',
              'border-4',
              npsScore >= 70
                ? 'border-green-500'
                : npsScore >= 30
                  ? 'border-yellow-500'
                  : 'border-red-500'
            )}
          >
            <div className='text-center'>
              <div className='text-5xl font-bold'>{npsScore}</div>
              <div className='text-sm text-muted-foreground'>NPS Score</div>
            </div>
          </div>
        </div>

        {/* NPS Categories */}
        <div className='grid gap-3'>
          {/* Promoters */}
          <div
            className={cn(
              'p-3 rounded-lg border transition-colors',
              'bg-gradient-to-r from-green-500/10 to-transparent'
            )}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='p-1.5 bg-green-500/20 rounded-lg'>
                  <Star className='h-4 w-4 text-green-500' />
                </div>
                <div>
                  <div className='font-medium'>Promoters (9-10)</div>
                  <div className='text-sm text-muted-foreground'>
                    Loyal enthusiasts
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='font-bold'>{npsData.promoters}</div>
                <div className='text-sm text-muted-foreground'>
                  {((npsData.promoters / npsData.totalResponses) * 100).toFixed(
                    1
                  )}
                  %
                </div>
              </div>
            </div>
          </div>

          {/* Passives */}
          <div
            className={cn(
              'p-3 rounded-lg border transition-colors',
              'bg-gradient-to-r from-yellow-500/10 to-transparent'
            )}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='p-1.5 bg-yellow-500/20 rounded-lg'>
                  <Star className='h-4 w-4 text-yellow-500' />
                </div>
                <div>
                  <div className='font-medium'>Passives (7-8)</div>
                  <div className='text-sm text-muted-foreground'>
                    Satisfied but unenthusiastic
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='font-bold'>{npsData.passives}</div>
                <div className='text-sm text-muted-foreground'>
                  {((npsData.passives / npsData.totalResponses) * 100).toFixed(
                    1
                  )}
                  %
                </div>
              </div>
            </div>
          </div>

          {/* Detractors */}
          <div
            className={cn(
              'p-3 rounded-lg border transition-colors',
              'bg-gradient-to-r from-red-500/10 to-transparent'
            )}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='p-1.5 bg-red-500/20 rounded-lg'>
                  <Star className='h-4 w-4 text-red-500' />
                </div>
                <div>
                  <div className='font-medium'>Detractors (0-6)</div>
                  <div className='text-sm text-muted-foreground'>
                    Unhappy customers
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='font-bold'>{npsData.detractors}</div>
                <div className='text-sm text-muted-foreground'>
                  {(
                    (npsData.detractors / npsData.totalResponses) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Responses */}
        <div className='flex items-center justify-between pt-4 border-t'>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm text-muted-foreground'>
              Total Responses
            </span>
          </div>
          <div className='font-medium'>{npsData.totalResponses}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NPSCard;
