'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className='flex items-center gap-2'>
      <Search size={20} className='text-gray-500' />
      <Input
        type='text'
        placeholder='Search users...'
        className='w-full max-w-sm'
      />
    </div>
  );
}
