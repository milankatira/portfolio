'use client';

import { motion } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown, Smile, Frown, Meh } from 'lucide-react';
import Container from '../global/container';
import GradientText from '../ui/GradientText';

const feedbackScores = [
  { category: 'Product', score: 4.7, votes: 320, sentiment: 'Positive' },
  { category: 'Support', score: 3.8, votes: 200, sentiment: 'Neutral' },
  { category: 'Pricing', score: 2.4, votes: 150, sentiment: 'Negative' },
];

const FeedbackScores = () => {
  return (
    <div className='relative w-full py-20'>
      {/* Background decoration */}
      <div className='pointer-events-none absolute inset-0 select-none -z-20'>
        <div className='absolute left-1/2 top-0 -translate-x-1/2 blur-3xl -z-20'>
          <div className='aspect-square h-[400px] bg-primary/20 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)] ' />
        </div>
      </div>
      <Container>
        <motion.div
          className='text-center max-w-3xl mx-auto mb-12'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GradientText
            className='text-2xl md:text-4xl lg:text-5xl font-heading font-medium leading-snug'
            element='H2'
          >
            Feedback Ratings at a Glance
          </GradientText>
          <p className='text-base md:text-lg text-accent-foreground/80 mt-4'>
            Understand how users feel about different aspects of your product
            through scores and sentiment analysis.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {feedbackScores.map((feedback, index) => (
            <motion.div
              key={index}
              className='rounded-xl bg-background/30 border border-border/50 p-6 text-center space-y-4'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <h3 className='text-xl font-semibold'>{feedback.category}</h3>
              <div className='flex items-center justify-center space-x-2'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill={
                      i < Math.round(feedback.score) ? 'rgb(234 179 8)' : 'none'
                    }
                    className={`h-6 w-6 ${
                      i < Math.round(feedback.score)
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
              <p className='text-sm text-muted-foreground'>
                Score: <span className='font-semibold'>{feedback.score}</span> (
                {feedback.votes} votes)
              </p>
              <div className='flex justify-center items-center space-x-2'>
                {feedback.sentiment === 'Positive' && (
                  <div className='flex items-center gap-2'>
                    <ThumbsUp
                      fill='#22c55e'
                      className='text-green-500 h-6 w-6'
                    />
                    <Smile fill='#22c55e' className='text-green-500 h-6 w-6' />
                  </div>
                )}
                {feedback.sentiment === 'Neutral' && (
                  <div className='flex items-center gap-2'>
                    <Meh fill='#eab308' className='text-yellow-500 h-6 w-6' />
                    <span className='text-yellow-500 text-sm'>Neutral</span>
                  </div>
                )}
                {feedback.sentiment === 'Negative' && (
                  <div className='flex items-center gap-2'>
                    <ThumbsDown
                      fill='#ef4444'
                      className='text-red-500 h-6 w-6'
                    />
                    <Frown fill='#ef4444' className='text-red-500 h-6 w-6' />
                  </div>
                )}
                <span className='text-sm font-medium ml-2'>
                  {feedback.sentiment}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeedbackScores;
