'use client';

import { useState } from 'react';
import FieldSelector from '@/components/Feedback/field-selector';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Field {
  type: string;
  label: string;
  placeholder: string;
  ratingType?: string;
}

interface Section {
  id: number;
  title: string;
  description: string;
  fields: Field[];
}

interface SectionEditorProps {
  section: Section;
  updateSection: (section: Section) => void;
}

export default function SectionEditor({
  section,
  updateSection,
}: SectionEditorProps) {
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description);

  const handleAddField = (field: Field) => {
    updateSection({
      ...section,
      fields: [...section.fields, field],
    });
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md space-y-4'>
      <Input
        placeholder='Title'
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          updateSection({ ...section, title: e.target.value });
        }}
      />
      <Textarea
        placeholder='Description'
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          updateSection({ ...section, description: e.target.value });
        }}
      />

      <FieldSelector addField={handleAddField} />
    </div>
  );
}
