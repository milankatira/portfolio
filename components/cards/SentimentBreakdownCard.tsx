import React from 'react';
import { PieChart, Pie, Cell, Tooltip as ChartTooltip } from 'recharts';
import { Users, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const SentimentBreakdownCard = () => {
  // Dummy NPS Data
  const npsData = {
    totalResponses: 300,
    promoters: 180, // 60%
    passives: 75, // 25%
    detractors: 45, // 15%
  };

  // Calculating percentages
  const promoters = (npsData.promoters / npsData.totalResponses) * 100;
  const passives = (npsData.passives / npsData.totalResponses) * 100;
  const detractors = (npsData.detractors / npsData.totalResponses) * 100;

  // Chart Data
  const chartData = [
    { name: 'Positive', value: promoters, color: '#4CAF50' },
    { name: 'Neutral', value: passives, color: '#FFC107' },
    { name: 'Negative', value: detractors, color: '#F44336' },
  ];

  return (
    <Card className='p-4 w-full'>
      <CardHeader className='text-center'>
        <CardTitle className='flex items-center gap-2 justify-center'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <Users className='h-5 w-5 text-primary' />
          </div>
          Sentiment Breakdown
        </CardTitle>
      </CardHeader>
      <CardDescription>
        {npsData.totalResponses > 0 ? (
          <div className='mx-auto flex justify-center'>
            <PieChart width={300} height={300}>
              <ChartTooltip
                cursor={false}
                content={({ payload }) => {
                  if (!payload?.[0]) return null;
                  return (
                    <div className='rounded-lg border bg-background p-2 shadow-sm'>
                      <div className='flex items-center gap-2'>
                        <div
                          className='h-2 w-2 rounded-full'
                          style={{ background: payload[0].payload.color }}
                        />
                        <span className='font-medium'>
                          {payload[0].name}:
                          <span className='text-sm text-muted-foreground'>
                            {typeof payload[0]?.value === 'number'
                              ? payload[0].value.toFixed(1)
                              : '0'}
                            %
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                }}
              />
              <Pie
                data={chartData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={80}
                stroke='none'
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center p-8 text-center min-h-[250px]'>
            <AlertCircle className='h-10 w-10 text-gray-500 mb-3' />
            <p className='text-gray-500'>No sentiment data available</p>
          </div>
        )}
      </CardDescription>

      {npsData.totalResponses > 0 && (
        <div className='flex flex-col gap-3 pt-6 border-t p-4 justify-center items-center'>
          <div className='flex items-center gap-2'>
            {promoters > 50 ? (
              <div className='flex items-center gap-2 text-green-500'>
                <TrendingUp className='h-4 w-4' />
                <span className='font-medium'>
                  Strong positive sentiment ({promoters.toFixed(1)}%)
                </span>
              </div>
            ) : (
              <div className='flex items-center gap-2 text-red-500'>
                <TrendingDown className='h-4 w-4' />
                <span className='font-medium'>
                  Needs attention ({detractors.toFixed(1)}%)
                </span>
              </div>
            )}
          </div>
          <div className='text-sm text-gray-500'>
            Analysis based on {npsData.totalResponses} responses
          </div>
        </div>
      )}
    </Card>
  );
};

export default SentimentBreakdownCard;
