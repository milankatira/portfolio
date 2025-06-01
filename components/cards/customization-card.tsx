'use client';

import { HexColorPicker } from 'react-colorful';
import { Card } from '../ui/card';
import { useState } from 'react';

export const CustomizationCard = () => {
  const [color, setColor] = useState('#000000');

  return (
    <Card className='p-4 border shadow-sm'>
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <label className='text-sm font-medium'>Custom Primary Color</label>
          <div className='h-4 w-4 rounded' style={{ backgroundColor: color }} />
        </div>
        <HexColorPicker color={color} onChange={setColor} />
      </div>
    </Card>
  );
};
