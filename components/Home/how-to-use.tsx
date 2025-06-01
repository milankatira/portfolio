'use client';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { FeedbackCard } from '../cards/feedback-card';
import { DynamicForm } from '../Feedback/preview-dialog';
import { activeSection } from '@/constant/defaultData';
import { Card } from '../ui/card';
import NPSCard from '../cards/NPSCard';
import SentimentBreakdownCard from '../cards/SentimentBreakdownCard';
import { Button } from '../ui/button';
import GradientText from '../ui/GradientText';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function HowToUse() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-background to-background/80 px-4 py-16 md:px-6 lg:px-8'>
      {/* Background decoration */}
      <div className='pointer-events-none absolute inset-0 select-none'>
        <div className='absolute left-1/2 top-0 -translate-x-1/2 blur-3xl'>
          <div className='aspect-square h-[400px] bg-primary/20 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]' />
        </div>
      </div>

      <motion.div
        className='relative mx-auto max-w-6xl'
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
        variants={stagger}
      >
        {/* Header */}
        <motion.div className='mb-16 text-center' variants={fadeInUp}>
          <Badge variant='secondary' className='mb-4'>
            <Sparkles className='mr-1 h-3 w-3' />
            HOW TO USE
          </Badge>

          <GradientText
            className='mt-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl'
            element='H2'
          >
            Simplify Your Feedback Process
            <br className='hidden sm:inline' /> in Four Easy Steps in Four Easy
            Steps
          </GradientText>
          <p className='mx-auto mt-6 max-w-2xl text-lg text-muted-foreground'>
            Transform your user feedback collection with our intuitive platform.
            Start gathering valuable insights in minutes.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className='grid gap-16 lg:grid-cols-2'>
          {/* Step 1 */}
          <motion.div className='relative group' variants={fadeInUp}>
            <div className='absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110 z-50'>
              1
            </div>
            <div className='rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 p-2 px-4'>
              <FeedbackCard />
            </div>
          </motion.div>

          <motion.div className='flex items-center' variants={fadeInUp}>
            <div className='space-y-4'>
              <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-1 text-sm text-primary'>
                <CheckCircle className='h-4 w-4' />
                <span>Easy Setup</span>
              </div>
              <h3 className='text-2xl font-semibold'>Create and Customize</h3>
              <p className='text-lg text-muted-foreground'>
                Design your feedback forms using our intuitive tools. Customize
                every element to match your specific needs and branding,
                ensuring a seamless user experience.
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className='flex items-center lg:order-3'
            variants={fadeInUp}
          >
            <div className='space-y-4'>
              <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-1 text-sm text-primary'>
                <Zap className='h-4 w-4' />
                <span>Quick Deploy</span>
              </div>
              <h3 className='text-2xl font-semibold'>Deploy and Collect</h3>
              <p className='text-lg text-muted-foreground'>
                Effortlessly deploy your feedback forms across various
                platforms. Start collecting valuable insights from your users
                with just a few clicks.
              </p>
            </div>
          </motion.div>

          <motion.div className='relative group lg:order-4' variants={fadeInUp}>
            <div className='absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110'>
              2
            </div>
            <div className='overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex items-center justify-center'>
              <Card className='max-w-md p-6 m-6 w-full'>
                <DynamicForm
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  section={activeSection}
                  selectedPrimaryColor={'#OOO'}
                />
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className='grid gap-16 lg:grid-cols-2 mt-20'>
          {/* Step 1 */}
          <motion.div className='relative group' variants={fadeInUp}>
            <div className='absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110 z-50'>
              3
            </div>
            <div className='rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 p-2 px-4'>
              <NPSCard />
            </div>
          </motion.div>

          <motion.div className='flex items-center' variants={fadeInUp}>
            <div className='space-y-4'>
              <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-1 text-sm text-primary'>
                <CheckCircle className='h-4 w-4' />
                <span>Easy Setup</span>
              </div>
              <h3 className='text-2xl font-semibold'>Data Driven Analytics</h3>
              <p className='text-lg text-muted-foreground'>
                Use data-driven analytics to understand feedback instantly. Get
                clear insights and alerts to help you make smart decisions and
                improve your processes quickly.
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className='flex items-center lg:order-3'
            variants={fadeInUp}
          >
            <div className='space-y-4'>
              <div className='inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-1 text-sm text-primary'>
                <Zap className='h-4 w-4' />
                <span>Quick Deploy</span>
              </div>
              <h3 className='text-2xl font-semibold'>
                Focus on what matters most
              </h3>
              <p className='text-lg text-muted-foreground'>
                by finding the best features to build and the most important
                fixes to make, based on what your feedback tells you.
              </p>
            </div>
          </motion.div>

          <motion.div className='relative group lg:order-4' variants={fadeInUp}>
            <div className='absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110'>
              4
            </div>
            <div className='overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex items-center justify-center'>
              <SentimentBreakdownCard />
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div className='mt-20 text-center' variants={fadeInUp}>
          <Link href={'/sign-in'}>
            <Button>
              Get Started Now
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
