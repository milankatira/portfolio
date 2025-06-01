'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MagicCard } from '../ui/magic-card';
function PricingSection() {
  return (
    <section id='pricing' className='py-32 relative overflow-hidden'>
      {/* Background elements remain same */}
      <div className='container px-4 mx-auto max-w-screen-xl relative'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <motion.div
            className='inline-block'
            animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <span className='inline-flex items-center rounded-full px-4 py-1 text-sm font-medium mb-8'>
              <Star className='mr-1 h-4 w-4' />
              Beta Launch Offer
            </span>
          </motion.div>
          <h2 className='text-4xl md:text-6xl mb-6 font-light'>
            {`Get Started`}
            {` `}
            <span className='relative inline-block'>
              <span className='font-bold relative z-10 bg-clip-text'>
                For Free
              </span>
              <motion.svg
                className='absolute -bottom-4 left-0 w-full'
                viewBox='0 0 100 20'
                height='20'
                preserveAspectRatio='none'
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
              >
                <motion.path
                  d='M0 10 Q50 0 100 10'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='4'
                  className='dark:stroke-white stroke-black'
                />
              </motion.svg>
            </span>
          </h2>

          <p className='text-xl mb-12 max-w-2xl mx-auto'>
            {`Join our beta launch and get early access to all features. Early adopters will receive special benefits and discounted rates when we introduce our premium plans.`}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <MagicCard
            gradientFrom='#38bdf8'
            gradientTo='#3b82f6'
            className='rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto border'
            gradientColor='rgba(59,130,246,0.1)'
          >
            <div className='grid gap-8 md:grid-cols-2 mb-8'>
              <div>
                <h3 className='font-semibold text-xl mb-4 '>
                  Everything Included
                </h3>
                <ul className='space-y-3'>
                  {[
                    'Unlimited Projects',
                    'Unlimited Feature Requests',
                    'Realtime Feedback',
                    'Advanced Analytics',
                    'Priority Support',
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className='flex items-center gap-2'
                    >
                      <div className='size-5 rounded-full  flex items-center justify-center'>
                        <Check className='size-3 ' />
                      </div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className='font-semibold text-xl mb-4 '>No Catches</h3>
                <ul className='space-y-3'>
                  {[
                    'No Credit Card Required',
                    'No Hidden Fees',
                    'No Usage Limits',
                    'No Locked Features',
                    'Cancel Anytime',
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className='flex items-center gap-2'
                    >
                      <div className='size-5 rounded-full  flex items-center justify-center'>
                        <Check className='size-3 ' />
                      </div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.div
              className='text-center'
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link href={'/sign-in'}>
                <Button
                  size='lg'
                  className='bg-gradient-to-r  hover:opacity-90 shadow-lg'
                >
                  Get Started Now
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
              <p className='mt-4 text-sm '>
                Join thousands of happy users today
              </p>
            </motion.div>
          </MagicCard>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
