'use client';
import { FEATURES } from '@/constant';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Container from '../global/container';
import { MagicCard } from '../ui/magic-card';
import { ConnectionCard } from '../cards/connection-card';
import { FeedbackCard } from '../cards/feedback-card';
import { AutomationCard } from '../cards/automation-card';
import RatingStatisticsCard from '../cards/RatingStatisticsCard';
import MarkdownRenderer from '../markdown-renderer';
import { Card } from '../ui/card';
import { motion } from 'framer-motion';
const markdownContent = `
\`\`\`html
 <FeedSparkWidget
   project-id="6782a536118d7bbcf8387a51"
   theme="dark"
 >
 <FeedSparkWidget/>
 <script
   src="http://localhost:4173/widget.umd.js"
 >
 </script>
\`\`\`
`;
const Features = () => {
  const getFeatureComponent = (feature: (typeof FEATURES)[0]) => {
    switch (feature.title) {
      case 'Advanced Customization':
        return (
          <Card className='p-4'>
            <MarkdownRenderer content={markdownContent} />
          </Card>
        );
      case 'Deploy and Collect':
        return <FeedbackCard />;
      case 'Real-Time Feedback':
        return <RatingStatisticsCard />;
      case 'Seamless Collaboration':
        return <ConnectionCard />;
      case 'Automated Feedback Loops':
        return <AutomationCard />;
      default:
        return (
          <Image
            src={feature.image}
            alt={feature.title}
            width={500}
            height={500}
            className='w-full h-full object-cover'
          />
        );
    }
  };
  return (
    <div className='relative flex flex-col items-center justify-center w-full py-20 bg-gradient-to-b from-background to-background/80'>
      <Container>
        {/* Background decoration */}
        <div className='pointer-events-none absolute inset-0 select-none'>
          <div className='absolute left-1/2 top-0 -translate-x-1/2 blur-3xl'>
            <div className='aspect-square h-[400px] bg-primary/20 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]' />
          </div>
        </div>
        <div className='flex flex-col items-center text-center max-w-2xl mx-auto '>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6'>
            Transform Feedback into <br />
          </h2>
          <div className='relative inline-block'>
            <span className='font-bold relative z-10 text-2xl md:text-4xl lg:text-5xl font-heading !leading-snug bg-clip-text'>
              Growth
            </span>
            <motion.svg
              className='absolute -bottom-4 left-0 w-full'
              viewBox='0 0 100 20'
              height='20'
              preserveAspectRatio='none'
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              <motion.path
                d='M0 10 Q50 0 100 10'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              />
            </motion.svg>
          </div>
          <p className='text-base md:text-lg text-center text-accent-foreground/80 mt-6'>
            Collect, analyze, and act on feedback effortlessly to improve your
            product.
          </p>
        </div>
      </Container>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 relative overflow-visible'>
        {FEATURES.map((feature, index) => (
          <Container
            key={feature.title}
            delay={0.1 + index * 0.1}
            className={cn(
              'relative flex flex-col rounded-2xl lg:rounded-3xl bg-card border border-border/50 hover:border-border/100 transition-colors',
              index === 3 && 'lg:col-span-2',
              index === 2 && 'md:col-span-2 lg:col-span-1'
            )}
          >
            <MagicCard
              gradientFrom='#38bdf8'
              gradientTo='#3b82f6'
              className='p-4 lg:p-6 lg:rounded-3xl'
              gradientColor='rgba(59,130,246,0.1)'
            >
              <div className='flex items-center space-x-4 mb-4'>
                <h3 className='text-xl font-semibold flex items-center gap-2'>
                  <feature.icon className='size-5 text-primary' />
                  {feature.title}
                </h3>
              </div>
              <p className='text-sm text-muted-foreground'>
                {feature.description}
              </p>
              <div className='mt-6 w-full bg-card/50 overflow-hidden'>
                {getFeatureComponent(feature)}
              </div>
            </MagicCard>
          </Container>
        ))}
      </div>
    </div>
  );
};

export default Features;
