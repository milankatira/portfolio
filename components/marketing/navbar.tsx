'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          <Link href='/' className='flex items-center space-x-2'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            />
            <Zap className='h-6 w-6 fill-current' />
            <span className='text-xl font-bold'>FeedSpark</span>
          </Link>

          <div className='flex items-center space-x-4'>
            <ModeToggle />

            <SignedOut>
              <Link href={'/sign-in'}>
                <Button>Get Started</Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href='/dashboard'>
                <Button className='hover:shadow-xl'>Dashboard</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
