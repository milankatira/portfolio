'use client';

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

interface LivePreviewProps {
  sections: Section[];
}

export default function LivePreview({ sections }: LivePreviewProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>📋 Live Preview</h2>

      {sections.map((section) => (
        <div key={section.id} className='mb-6'>
          <h3 className='font-semibold'>{section.title}</h3>
          <p className='text-sm text-gray-500 mb-2'>{section.description}</p>

          {section.fields.map((field, idx) => (
            <div key={idx} className='mb-3'>
              <p className='text-sm font-medium'>{field.label}</p>
              {field.type === 'Rating' && <p>⭐⭐⭐⭐⭐ (Star Rating)</p>}
              {field.type === 'Email' && (
                <input type='email' placeholder='Enter email' />
              )}
              {field.type === 'Text' && <textarea placeholder='Enter text' />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
