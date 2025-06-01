'use client';

import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface FieldSelectorProps {
  addField: (field: {
    type: string;
    label: string;
    placeholder: string;
    ratingType?: string;
  }) => void;
}

export default function FieldSelector({ addField }: FieldSelectorProps) {
  const [fieldType, setFieldType] = useState('Rating');

  const handleAdd = () => {
    const newField = {
      type: fieldType,
      label:
        fieldType === 'Rating'
          ? 'How would you rate your experience?'
          : 'Enter text',
      placeholder: '',
      ratingType: fieldType === 'Rating' ? 'star' : undefined,
    };
    addField(newField);
  };

  return (
    <div className='flex items-center gap-2'>
      <Select onValueChange={setFieldType} defaultValue='Rating'>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select Field Type' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='Rating'>Rating</SelectItem>
          <SelectItem value='Email'>Email</SelectItem>
          <SelectItem value='Text'>Text</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleAdd} className='bg-green-600 text-white'>
        + Add Field
      </Button>
    </div>
  );
}
