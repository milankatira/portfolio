'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Lightbulb, Bell, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

type FeatureType = 'feedback' | 'alerts' | 'analysis' | 'custom';

import { FeedbackCard } from '../cards/feedback-card';
import { AutomationCard } from '../cards/automation-card';
import NPSCard from '../cards/NPSCard';
import SentimentBreakdownCard from '../cards/SentimentBreakdownCard';
import GradientText from '../ui/GradientText';

const featureContents = {
  feedback: {
    title: 'Customizable Feedback Components',
    icon: <MessageSquare className='h-5 w-5' />,
    formTitle: 'Feedback Form',
    description: 'Collect user feedback with customizable forms',
    component: <FeedbackCard />,
    codeSnippet: `<FeedbackForm
  theme="light"
  position="bottom-right"
/>`,
    color: 'bg-blue-500',
  },
  alerts: {
    title: 'Alerts and Notifications',
    icon: <Bell className='h-5 w-5' />,
    formTitle: 'Notification Center',
    description: 'Stay updated with real-time alerts',
    component: <AutomationCard />,
    codeSnippet: `<AlertSystem
  channels={["email", "slack"]}
  frequency="realtime"
/>`,
    color: 'bg-blue-500',
  },
  analysis: {
    title: 'Real-Time Analysis',
    icon: <BarChart className='h-5 w-5' />,
    formTitle: 'Analytics Dashboard',
    description: 'Track and analyze feedback patterns',
    component: <NPSCard />,
    codeSnippet: `<AnalyticsDashboard
  metrics={["sentiment", "volume"]}
  interval="live"
/>`,
    color: 'bg-red-500',
  },
  custom: {
    title: 'Focus on what matters most',
    icon: <Lightbulb className='h-5 w-5' />,
    formTitle: 'Custom Configuration',
    description: 'Effortlessly deploy with just 2 lines of code',
    component: <SentimentBreakdownCard />,
    codeSnippet: `<CustomFeedback
  config={yourConfig}
  branding={false}
/>`,
    color: 'bg-orange-500',
  },
};

const FeatureBar = ({
  title,
  color = 'bg-blue-500',
  delay = 0,
  isActive = false,
  onClick,
  icon,
}: {
  title: string;
  color?: string;
  delay?: number;
  isActive?: boolean;
  onClick?: () => void;
  icon: JSX.Element;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    whileHover={{ x: 10 }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      'flex items-center space-x-4 cursor-pointer p-4 rounded-xl transition-colors',
      isActive
        ? 'bg-gray-100 dark:bg-gray-800'
        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
    )}
    onClick={onClick}
  >
    <div className={cn('w-1 h-12', color)} />
    <div className='flex items-center space-x-3'>
      <div
        className={cn(
          'p-2 rounded-lg',
          isActive
            ? 'bg-gray-900 dark:bg-gray-50 text-white dark:text-black'
            : 'bg-gray-100 dark:bg-gray-700'
        )}
      >
        {icon}
      </div>
      <h3 className='text-xl font-medium text-gray-900 dark:text-gray-100'>
        {title}
      </h3>
    </div>
  </motion.div>
);

export function WhyChooseUs() {
  const [activeFeature, setActiveFeature] = useState<FeatureType>('feedback');

  const featureTypes: FeatureType[] = [
    'feedback',
    'alerts',
    'analysis',
    'custom',
  ];

  const switchFeature = useCallback(() => {
    setActiveFeature((prevFeature) => {
      const currentIndex = featureTypes.indexOf(prevFeature);
      const nextIndex = (currentIndex + 1) % featureTypes.length;
      return featureTypes[nextIndex];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intervalId = setInterval(switchFeature, 5000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFeatureClick = (feature: FeatureType) => {
    setActiveFeature(feature);
  };

  return (
    <section className='py-24 overflow-hidden '>
      <div className='container mx-auto px-4'>
        {/* Background decoration */}
        {/* <div className='pointer-events-none absolute inset-0 select-none'>
          <div className='absolute left-1/2 top-0 -translate-x-1/2 blur-3xl'>
            <div className='aspect-square h-[400px] bg-primary/20 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]' />
          </div>
        </div> */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-4'
        >
          WHY CHOOSE US
        </motion.p>

        <GradientText
          className='text-center text-4xl md:text-5xl font-bold  mb-16'
          element='H2'
        >
          Unlock the Full
          <br />
          Potential of Your Feedback
        </GradientText>

        <div className='grid md:grid-cols-2 gap-12 items-center min-h-[800px]'>
          <div className='relative h-[700px] flex items-center justify-center'>
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              className='absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-500  dark:from-blue-950
              dark:via-indigo-900 dark:to-purple-900
              dark:bg-opacity-50
              rounded-3xl transform -rotate-3'
            />
            <div className='relative flex items-center justify-center w-full h-full p-6'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className='w-full max-w-md'
                >
                  {featureContents[activeFeature].component}
                </motion.div>
              </AnimatePresence>
              {/* <div className='absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2'>
                <AnimatePresence mode='wait'>
                  <CodeSnippet
                    key={activeFeature}
                    code={featureContents[activeFeature].codeSnippet}
                  />
                </AnimatePresence>
              </div> */}
            </div>
          </div>

          <div className='space-y-6'>
            {featureTypes.map((feature, index) => (
              <FeatureBar
                key={feature}
                title={featureContents[feature].title}
                color={featureContents[feature].color}
                delay={index * 0.1}
                isActive={activeFeature === feature}
                onClick={() => handleFeatureClick(feature)}
                icon={featureContents[feature].icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
