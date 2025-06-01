'use client';
import { feedbackForm } from '@/constant/homepageDefaultData';
import PreviewDialog from '@/components/Feedback/preview-dialog';

type FormFieldType = 'TEXT' | 'EMAIL' | 'TEXTAREA' | 'RATING' | 'IMAGE' | 'URL';

interface FormFieldData {
  id: string;
  label: string;
  type: FormFieldType;
  placeholder: string;
  required: boolean;
  sectionId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface SectionData {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  feedbackId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  formFields: FormFieldData[];
}

export const FeedbackCard = () => {
  // Type assertion to ensure sections conform to SectionData[]
  const sections = feedbackForm?.sections as SectionData[];

  return (
    <PreviewDialog
      sections={
        sections as Array<
          SectionData & {
            type:
              | 'GENERAL_FEEDBACK'
              | 'CONTACT_US'
              | 'REPORT_BUG'
              | 'FEATURE_REQUEST';
          }
        >
      }
      selectedPrimaryColor={feedbackForm.theme.selectedPrimaryColor}
      selectedSecondaryColor={feedbackForm.theme.selectedSecondaryColor}
      selectedBorderRadius={feedbackForm.theme.selectedBorderRadius}
    />
  );
};
