'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='container mx-auto px-4 py-12'>
        <div className='mt-12 pt-8 border-t border-border'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex items-center space-x-2 mb-4 md:mb-0'>
              <Zap className='h-6 w-6 fill-current' />
              <span className='text-xl font-bold'>FeedSpark</span>
            </div>
            <p className='text-sm text-muted-foreground'>
              © {new Date().getFullYear()} FeedSpark. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
