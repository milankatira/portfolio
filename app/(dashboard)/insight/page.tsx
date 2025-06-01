/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import {
  getUserFeedbacks,
  getSubmissionCount,
  getSectionsByFeedbackId,
  getLocationStats,
  getRatingStatistics,
  calculateNPS,
  getSubmissionsByDate,
} from '@/actions/insight.action';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CalendarIcon, Loader2, TrendingDown, TrendingUp } from 'lucide-react';
import { fetchFeedbackMetrics } from '@/actions/feedback.action';
import { DateRange } from 'react-day-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import FeedbackTable from '@/components/Insight/FeedbackTable';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import { ClipboardList, Star, Users } from 'lucide-react';
import { AlertCircle } from 'lucide-react'; // Add this import

export default function FeedbackDashboard() {
  const [activeTab, setActiveTab] = useState<string>('');
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(
    null
  );
  const [submissionCount, setSubmissionCount] = useState<number>(0);
  const [submissionsByDate, setSubmissionsByDate] = useState();
  const [sections, setSections] = useState<any[]>([]);
  const [locationStats, setLocationStats] = useState<any[]>([]);
  const [ratingStats, setRatingStats] = useState<any>(null);
  const [npsData, setNpsData] = useState<any>(null);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - +7 * 24 * 60 * 60 * 1000),
    to: new Date(Date.now()),
  });

  const [metrics, setMetrics] = useState<{
    totalFeedback: number;
    totalRatings: number;
    averageRating: string;
    happyCustomers: number;
  } | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const data = await fetchFeedbackMetrics();
        setMetrics(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMetrics();
  }, []);

  // Helper function to group responses by submission ID
  const groupResponsesBySubmission = (responses: any[]) => {
    return responses.reduce((acc, response) => {
      if (!acc[response.submissionId]) {
        acc[response.submissionId] = {
          submissionId: response.submissionId,
          createdAt: response.createdAt,
          fields: [],
        };
      }
      acc[response.submissionId].fields.push({
        label: response?.formField?.label,
        answer: response.answer,
        type: response?.formField?.type,
      });
      return acc;
    }, {});
  };

  // Fetch Feedback Forms
  useEffect(() => {
    async function fetchFeedbacks() {
      const data = await getUserFeedbacks();
      setFeedbacks(data);

      if (data.length > 0) {
        setSelectedFeedbackId(data[0].id);
      }
    }

    fetchFeedbacks();
  }, []);

  // Fetch Location Statistics
  useEffect(() => {
    async function fetchStats() {
      if (!selectedFeedbackId) return;
      const locations = await getLocationStats(selectedFeedbackId);
      setLocationStats(locations);
    }

    fetchStats();
  }, [selectedFeedbackId]);

  // Fetch Submission Count
  useEffect(() => {
    async function fetchSubmissionCount() {
      if (selectedFeedbackId) {
        const count = await getSubmissionCount(selectedFeedbackId);
        setSubmissionCount(count);
      }
    }
    fetchSubmissionCount();
  }, [selectedFeedbackId]);

  // Fetch Sections and Responses
  useEffect(() => {
    async function fetchSections() {
      if (
        !selectedFeedbackId ||
        !dateRange ||
        !dateRange.from ||
        !dateRange?.to
      )
        return;
      try {
        const data = await getSectionsByFeedbackId(selectedFeedbackId);
        setSections(data);
      } catch (error) {
        console.error('Error fetching sections and responses:', error);
      }
    }
    fetchSections();
  }, [selectedFeedbackId, dateRange]);

  // Fetch Rating Statistics
  useEffect(() => {
    async function fetchRatings() {
      if (!selectedFeedbackId) return;
      const data = await getRatingStatistics(selectedFeedbackId);
      setRatingStats(data);
    }

    fetchRatings();
  }, [selectedFeedbackId]);

  // Fetch NPS Data
  useEffect(() => {
    async function fetchNPS() {
      if (!selectedFeedbackId) return;
      const data = await calculateNPS(selectedFeedbackId);

      setNpsData(data);
    }
    fetchNPS();

    async function fetchAndSetSubmissions() {
      // Ensure that all conditions for fetching data are safely checked here
      if (!selectedFeedbackId || !dateRange?.from || !dateRange?.to) return;

      try {
        const data = await getSubmissionsByDate(
          selectedFeedbackId,
          dateRange.from,
          dateRange.to
        );
        // Type assertion to handle the JsonObject type
        if (data) {
          setSubmissionsByDate(data as any); // Using type assertion as temporary fix
        }
      } catch (error) {
        console.error('Error fetching submissions by date:', error);
      }
    }

    fetchAndSetSubmissions();
  }, [selectedFeedbackId, dateRange]);

  // Loading States
  if (!ratingStats || !npsData)
    return (
      <div className='flex justify-center items-center py-20 w-[70vw]'>
        <Loader2 className='animate-spin h-6 w-6 text-muted-foreground' />
      </div>
    );

  const { ratingCounts, totalRatings, averageRating } = ratingStats;
  const { npsScore } = npsData;

  const chartData = [
    {
      name: 'Positive',
      value: (npsData.promoters / npsData.totalResponses) * 100,
      color: '#4CAF50',
    },
    {
      name: 'Neutral',
      value: (npsData.passives / npsData.totalResponses) * 100,
      color: '#FFC107',
    },
    {
      name: 'Negative',
      value: (npsData.detractors / npsData.totalResponses) * 100,
      color: '#F44336',
    },
  ];

  const promoters = chartData.find((item) => item.name === 'Positive')?.value;
  const detractors = chartData.find((item) => item.name === 'Negative')?.value;

  const SubmissionChartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <div className='space-y-8 p-8 bg-background/95 min-h-screen'>
      {/* Header Section */}
      <div className='space-y-6'>
        <div className='flex flex-col md:flex-row  items-start md:items-center gap-6 pb-6 border-b'>
          <div className='flex-1'>
            <h1 className='text-3xl font-bold tracking-tight'>
              Feedback Analytics
            </h1>
            <p className='text-muted-foreground mt-1'>
              Track and analyze your feedback performance
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <Select
              defaultValue={selectedFeedbackId || ''}
              onValueChange={(value) => setSelectedFeedbackId(value)}
            >
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Select Feedback Form' />
              </SelectTrigger>
              <SelectContent>
                {feedbacks.map((feedback) => (
                  <SelectItem key={feedback.id} value={feedback.id}>
                    {feedback.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !dateRange && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, 'LLL dd, y')} -{' '}
                        {format(dateRange.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(dateRange.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='end'>
                <Calendar
                  initialFocus
                  mode='range'
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={(range) => range && setDateRange(range)}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Metric Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Card className='hover:shadow-lg transition-all'>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-primary/10 rounded-xl'>
                  <ClipboardList className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Total Submissions
                  </p>
                  <h3 className='text-2xl font-bold mt-1'>
                    {submissionCount || 0}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-all'>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-yellow-500/10 rounded-xl'>
                  <Star className='h-6 w-6 text-yellow-500' />
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Total Ratings
                  </p>
                  <h3 className='text-2xl font-bold mt-1'>
                    {metrics?.totalRatings || 0}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-all'>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-green-500/10 rounded-xl'>
                  <Users className='h-6 w-6 text-green-500' />
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Happy Customers
                  </p>
                  <h3 className='text-2xl font-bold mt-1'>
                    {metrics?.happyCustomers || 0}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-all'>
            <CardContent className='pt-6'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-blue-500/10 rounded-xl'>
                  <Star className='h-6 w-6 text-blue-500' />
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Average Rating
                  </p>
                  <h3 className='text-2xl font-bold mt-1'>
                    {averageRating || '0.0'}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='flex gap-5 flex-row w-full flex-wrap lg:flex-nowrap'>
        <Card className='p-4 w-full'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <div className='p-2 bg-yellow-500/10 rounded-lg'>
                <Star className='h-5 w-5 text-yellow-500' />
              </div>
              Rating Statistics
            </CardTitle>
            <CardDescription>
              Overall rating distribution and averages
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Average Rating Display */}
            <div className='flex flex-col items-center p-6 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl border'>
              <div className='text-4xl font-bold mb-2'>{averageRating}</div>
              <div className='text-sm text-muted-foreground'>
                Based on {totalRatings} ratings
              </div>
            </div>

            {/* Rating Bars */}
            <div className='space-y-3'>
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star] || 0;
                const percentage = totalRatings
                  ? ((count / totalRatings) * 100).toFixed(1)
                  : '0.0';

                return (
                  <div key={star} className='group flex items-center gap-3'>
                    <div className='flex items-center gap-1 w-12'>
                      <span className='font-medium'>{star}</span>
                      <Star className='h-4 w-4 text-yellow-500' />
                    </div>
                    <div className='relative flex-1 h-2 bg-yellow-500/10 rounded-full overflow-hidden'>
                      <div
                        className='absolute inset-y-0 left-0 bg-yellow-500 transition-all duration-500 ease-out group-hover:opacity-80'
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className='w-20 text-sm text-right'>
                      <span className='font-medium'>{percentage}%</span>
                      <span className='text-muted-foreground ml-1'>
                        ({count})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Breakdown */}
        <Card className='p-4 w-full'>
          <CardHeader className='text-center'>
            <CardTitle className='flex items-center gap-2 justify-center'>
              <div className='p-2 bg-primary/10 rounded-lg'>
                <Users className='h-5 w-5 text-primary' />
              </div>
              Sentiment Breakdown
            </CardTitle>
            <CardDescription>
              {dateRange.from && dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y')} -{' '}
                  {format(dateRange.to, 'LLL dd, y')}
                </>
              ) : (
                'No date range selected'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-4'>
            {npsData && npsData.totalResponses > 0 ? (
              <ChartContainer
                config={{
                  Positive: { label: 'Positive', color: '#4CAF50' },
                  Neutral: { label: 'Neutral', color: '#FFC107' },
                  Negative: { label: 'Negative', color: '#F44336' },
                }}
                className='mx-auto aspect-square max-h-[250px]'
              >
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
                              {payload[0].name}:{' '}
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
              </ChartContainer>
            ) : (
              <div className='flex flex-col items-center justify-center p-8 text-center min-h-[250px]'>
                <AlertCircle className='h-10 w-10 text-muted-foreground mb-3' />
                <p className='text-muted-foreground'>
                  No sentiment data available
                </p>
              </div>
            )}
          </CardContent>
          {npsData && npsData.totalResponses > 0 && (
            <CardFooter className='flex-col gap-3 pt-6 border-t'>
              <div className='flex items-center gap-2'>
                {promoters && promoters > 50 ? (
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
                      Needs attention ({detractors?.toFixed(1)}%)
                    </span>
                  </div>
                )}
              </div>
              <div className='text-sm text-muted-foreground'>
                Analysis based on {npsData.totalResponses} responses
              </div>
            </CardFooter>
          )}
        </Card>

        {/* Keep the NPS card as is */}
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
                    <div className='font-bold'>{npsData?.promoters ?? 0}</div>
                    {npsData?.promoters > 0 && (
                      <div className='text-sm text-muted-foreground'>
                        {(
                          ((npsData?.promoters ?? 0) /
                            (npsData?.totalResponses ?? 1)) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                </div>
              </div>

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
                    {npsData.passives > 0 && (
                      <div className='text-sm text-muted-foreground'>
                        {(
                          (npsData.passives / npsData.totalResponses) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                </div>
              </div>

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

                    {npsData.detractors > 0 && (
                      <div className='text-sm text-muted-foreground'>
                        {(
                          (npsData.detractors / npsData.totalResponses) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    )}
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
      </div>

      <div className='flex gap-5 flex-row w-full flex-wrap lg:flex-nowrap'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>All Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead className='text-right'>Feedbacks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locationStats.length > 0 ? (
                  locationStats.map((loc) => (
                    <TableRow key={loc.country}>
                      <TableCell>{loc.country || 'Unknown'}</TableCell>
                      <TableCell className='text-right'>
                        {loc._count.country}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* remove this card and add a graph for submition by date  */}

        <Card className='w-full lg:w-2/3 h-full'>
          <CardHeader>
            <CardTitle>Submission Trends</CardTitle>
            <CardDescription>
              {dateRange.from && dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y')} -{' '}
                  {format(dateRange.to, 'LLL dd, y')}
                </>
              ) : (
                'No date range selected'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submissionsByDate &&
            Array.isArray(submissionsByDate) &&
            (submissionsByDate as any[]).length > 0 ? (
              <ChartContainer config={SubmissionChartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={submissionsByDate}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey='_id'
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => format(new Date(value), 'dd MMM')}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (!active || !payload) return null;
                      return (
                        <div className='rounded-lg border bg-background p-2 shadow-sm'>
                          <div className='grid gap-2'>
                            <div className='flex items-center gap-2'>
                              <div className='h-2 w-2 rounded-full bg-primary' />
                              <span className='font-medium'>
                                {payload &&
                                  payload[0]?.payload?._id &&
                                  format(
                                    new Date(payload[0].payload._id),
                                    'MMM dd, yyyy'
                                  )}
                              </span>
                            </div>
                            <div className='flex gap-4'>
                              <span className='text-muted-foreground'>
                                Submissions:
                              </span>
                              <span className='font-bold'>
                                {payload[0].payload.count}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <defs>
                    <linearGradient
                      id='fillSubmissions'
                      x1='0'
                      y1='0'
                      x2='0'
                      y2='1'
                    >
                      <stop
                        offset='5%'
                        stopColor='var(--color-desktop)'
                        stopOpacity={0.8}
                      />
                      <stop
                        offset='95%'
                        stopColor='var(--color-desktop)'
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey='count'
                    type='natural'
                    fill='url(#fillSubmissions)'
                    fillOpacity={0.4}
                    stroke='var(--color-desktop)'
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className='flex flex-col items-center justify-center p-8 text-center min-h-[300px]'>
                <AlertCircle className='h-10 w-10 text-muted-foreground mb-3' />
                <p className='text-muted-foreground'>
                  No submission data available for the selected date range
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className='flex w-full items-start gap-2 text-sm'>
              <div className='grid gap-2'>
                <div className='flex items-center gap-2 font-medium leading-none'>
                  Total Submissions: {submissionCount}
                </div>
                <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                  For selected date range
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Sections and Responses */}
      <div>
        {sections.length > 0 ? (
          <Tabs
            defaultValue={sections[0].id}
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className='grid grid-cols-8'>
              {sections
                .filter((section) => section.type !== 'CONTACT_US')
                .map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className='whitespace-nowrap'
                  >
                    {section.title}
                  </TabsTrigger>
                ))}
            </TabsList>
            {sections.map((section) => (
              <FeedbackTable
                key={section.id}
                section={section}
                dateRange={{ from: dateRange?.from, to: dateRange?.to }}
                groupResponsesBySubmission={groupResponsesBySubmission}
                isActive={activeTab === section.id}
              />
            ))}
          </Tabs>
        ) : (
          <p>No sections available for this feedback.</p>
        )}
      </div>
    </div>
  );
}
