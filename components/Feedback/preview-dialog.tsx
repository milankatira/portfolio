import * as React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import MessageIcon from '../icons/MessageIcon';
import BugIcon from '../icons/BugIcon';
import InfoIcon from '../icons/InfoIcon';
import AddCircleIcon from '../icons/AddCircleIcon';
import Link from 'next/link';

interface FormFieldData {
  id: string;
  label: string;
  type: 'TEXT' | 'EMAIL' | 'TEXTAREA' | 'RATING' | 'IMAGE' | 'URL';
  placeholder?: string;
  required?: boolean;
  url?: string;
}

interface SectionData {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  formFields: FormFieldData[];
  type: 'GENERAL_FEEDBACK' | 'REPORT_BUG' | 'FEATURE_REQUEST' | 'CONTACT_US';
}

interface FeedbackPageProps {
  sections: SectionData[];
  selectedPrimaryColor: string;
  selectedSecondaryColor: string;
  selectedBorderRadius: string;
}

export default function FeedbackPage({
  sections,
  selectedPrimaryColor,
  selectedSecondaryColor,
  selectedBorderRadius,
}: FeedbackPageProps) {
  const [open, setOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<SectionData | null>(
    null
  );
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const handleSectionClick = (section: SectionData) => {
    if (
      section.title === 'Contact Us' &&
      section.formFields.length === 1 &&
      section.formFields[0].type === 'URL' &&
      section.formFields[0].url
    ) {
      window.open(section.formFields[0].url, '_blank');
      return;
    }
    setActiveSection(section);
    setOpen(true);
  };

  function SectionIcon({
    title,
    colorClass,
    isHovered,
  }: {
    title: string;
    colorClass: string;
    isHovered: boolean;
  }) {
    const iconMapper: Record<string, React.ReactNode> = {
      'General Feedback': (
        <MessageIcon
          width={24}
          height={24}
          className={`w-6 h-6 transition-colors duration-200 ${
            isHovered ? `text-[${colorClass}]` : 'text-muted-foreground'
          }`}
        />
      ),
      'Report a Bug': (
        <BugIcon
          width={24}
          height={24}
          className={`w-6 h-6 transition-colors duration-200 ${
            isHovered ? `text-[${colorClass}]` : 'text-muted-foreground'
          }`}
        />
      ),
      'Request a Feature': (
        <AddCircleIcon
          width={24}
          height={24}
          className={`w-6 h-6 transition-colors duration-200 ${
            isHovered ? `text-[${colorClass}]` : 'text-muted-foreground'
          }`}
        />
      ),
      'Contact Us': (
        <InfoIcon
          width={24}
          height={24}
          className={`w-6 h-6 transition-colors duration-200 ${
            isHovered ? `text-[${colorClass}]` : 'text-muted-foreground'
          }`}
        />
      ),
      default: (
        <HelpCircle
          className={`w-6 h-6 transition-colors duration-200 ${
            isHovered ? `text-[${colorClass}]` : 'text-muted-foreground'
          }`}
        />
      ),
    };

    const icon = iconMapper[title] || iconMapper.default;

    return (
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200`}
        style={{
          color: isHovered ? colorClass : 'inherit', // Dynamic hover color
        }}
      >
        {icon}
      </div>
    );
  }

  return (
    <div className='p-2'>
      <Card
        className='max-w-md mx-auto shadow-lg p-6'
        style={{ borderRadius: selectedBorderRadius }}
      >
        <h1 className='text-lg font-semibold mb-6'>Give Us Your Feedback</h1>
        <div>
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => handleSectionClick(section)}
              onMouseEnter={() => setHoveredId(section.id)}
              onMouseLeave={() => setHoveredId(null)}
              className='flex items-center p-3 cursor-pointer rounded-xl transition-all gap-4 hover:bg-gray-100 dark:hover:bg-gray-900'
            >
              <SectionIcon
                title={section.title}
                colorClass={selectedSecondaryColor}
                isHovered={hoveredId === section.id}
              />
              <div>
                <h3 className='font-medium'>{section.title}</h3>
                <p className='text-sm text-muted-foreground'>
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className='text-xs text-center font-light mt-4 text-muted-foreground'>
          Powered by {' '}
          <Link href='https://feed-spark.vercel.app/'>
          <span className='font-bold hover:text-primary transition-colors underline'>FeedSpark</span>
          </Link>
        </p>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className='max-w-md p-6'
          style={{ borderRadius: selectedBorderRadius }}
        >
          {activeSection && (
            <DynamicForm
              section={activeSection}
              selectedPrimaryColor={selectedPrimaryColor}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FormWrapper({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>{title}</h2>
      <p className='text-gray-500'>{description}</p>
      <form className='space-y-4'>{children}</form>
    </div>
  );
}

function InputField({
  label,
  placeholder,
  type = 'text',
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className='space-y-1'>
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} />
    </div>
  );
}

function TextareaField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className='space-y-1'>
      <Label>{label}</Label>
      <Textarea placeholder={placeholder} />
    </div>
  );
}

function SubmitButton({
  selectedPrimaryColor,
}: {
  selectedPrimaryColor: string;
}) {
  return (
    <Button
      type='submit'
      className='w-full'
      style={{
        backgroundColor: selectedPrimaryColor,
        borderColor: selectedPrimaryColor,
        // color: '#ffffff',
      }}
    >
      Submit
    </Button>
  );
}

export function DynamicForm({
  section,
  selectedPrimaryColor,
}: {
  section: SectionData;
  selectedPrimaryColor: string;
}) {
  return (
    <FormWrapper title={section.title} description={section.description}>
      {section.formFields.map((field) => (
        <DynamicField key={field.id} field={field} />
      ))}
      <SubmitButton selectedPrimaryColor={selectedPrimaryColor} />
    </FormWrapper>
  );
}

function DynamicField({ field }: { field: FormFieldData }) {
  switch (field.type) {
    case 'TEXT':
    case 'EMAIL':
      return (
        <InputField
          label={field.label}
          placeholder={field.placeholder || ''}
          type={field.type.toLowerCase()}
        />
      );
    case 'TEXTAREA':
      return (
        <TextareaField
          label={field.label}
          placeholder={field.placeholder || ''}
        />
      );
    case 'URL':
      return (
        <div className='space-y-1'>
          <Label>{field.label}</Label>
          <a
            href={field.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 underline'
          >
            {field.url}
          </a>
        </div>
      );
    default:
      return null;
  }
}
