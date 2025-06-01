'use client';

import { TrendingUp, Activity } from 'lucide-react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

// Area Chart Data (Desktop vs Mobile Visitors)
const areaChartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

// Chart Colors
const chartConfig = {
  desktop: '#6366F1', // Indigo
  mobile: '#22C55E', // Green
};

const UserChart = () => {
  return (
    <Card className='shadow-lg'>
      {/* Header */}
      <CardHeader>
        <div className='flex items-center gap-2'>
          <Activity className='text-indigo-600' size={24} />
          <CardTitle>User Engagement Overview</CardTitle>
        </div>
        <CardDescription>
          Analysis of desktop and mobile users over the past 6 months.
        </CardDescription>
      </CardHeader>

      {/* Chart Content */}
      <CardContent>
        <ResponsiveContainer width='100%' height={350}>
          <AreaChart
            data={areaChartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='mobile'
              stackId='1'
              stroke={chartConfig.mobile}
              fill={chartConfig.mobile}
              fillOpacity={0.4}
            />
            <Area
              type='monotone'
              dataKey='desktop'
              stackId='1'
              stroke={chartConfig.desktop}
              fill={chartConfig.desktop}
              fillOpacity={0.4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <div className='flex items-center gap-2 text-sm'>
          <TrendingUp className='text-green-500 h-4 w-4' />
          <span>Overall growth by 5.2% this month</span>
          <span className='ml-auto text-gray-500'>January - June 2024</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserChart;
