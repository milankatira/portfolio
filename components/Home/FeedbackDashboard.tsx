'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Bug,
  Lightbulb,
  Search,
  ArrowRight,
  MessageCircle,
  BarChart,
  Target,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: 'Customer Feedback',
    icon: Users,
    color: 'bg-blue-500/10 text-blue-500',
    benefits: [
      { text: 'Real-time user insights', icon: Zap },
      { text: 'Sentiment analysis', icon: MessageCircle },
      { text: 'Actionable metrics', icon: BarChart },
    ],
  },
  {
    title: 'Bug Reports',
    icon: Bug,
    color: 'bg-green-500/10 text-green-500',
    benefits: [
      { text: 'Quick issue detection', icon: Target },
      { text: 'Priority tracking', icon: BarChart },
      { text: 'Resolution monitoring', icon: CheckCircle },
    ],
  },
  {
    title: 'Feature Requests',
    icon: Lightbulb,
    color: 'bg-amber-500/10 text-amber-500',
    benefits: [
      { text: 'User-driven development', icon: Users },
      { text: 'Demand analysis', icon: BarChart },
      { text: 'Release planning', icon: Target },
    ],
  },
  {
    title: 'User Research',
    icon: Search,
    color: 'bg-purple-500/10 text-purple-500',
    benefits: [
      { text: 'Data-driven decisions', icon: BarChart },
      { text: 'User behavior tracking', icon: Target },
      { text: 'Improvement insights', icon: Lightbulb },
    ],
  },
];

const BackgroundDecoration = () => (
  <div className='absolute inset-0 overflow-hidden -z-10'>
    <div className='absolute top-0 left-1/4 w-72 h-72 bg-gray-500/10 rounded-full blur-3xl' />
    <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl' />
  </div>
);

export default function FeedbackDashboard() {
  return (
    <section className='relative py-20 overflow-hidden'>
      <BackgroundDecoration />

      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className='text-center mb-16'
        >
          <Badge className='mb-4' variant='secondary'>
            Feedback Insights <ArrowRight className='ml-2 w-3 h-3' />
          </Badge>
          <h2 className='text-3xl font-bold'>Perfect For Every Need</h2>
          <p className='text-gray-600 dark:text-gray-200 max-w-2xl mx-auto'>{`FeedSpark adapts to your unique requirements, whether you're collecting customer feedback, bug reports, or feature requests`}</p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className='group cursor-pointer'
            >
              <div className='bg-white/50 dark:bg-gray-900/80 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:shadow-lg'>
                <div
                  className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
                >
                  <feature.icon className='w-6 h-6' />
                </div>
                <h3 className='text-lg font-semibold group-hover:text-primary transition-colors'>
                  {feature.title}
                  <ArrowRight className='w-4 h-4 inline ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all' />
                </h3>

                <div className='mt-4 space-y-3'>
                  {feature.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className='flex items-center gap-2 text-sm text-muted-foreground'
                    >
                      <benefit.icon className='w-4 h-4 text-primary' />
                      <span>{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
