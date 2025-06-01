import { SectionData } from '@/types/feedback';

export const defaultSections: SectionData[] = [
  {
    title: 'General Feedback',
    description: 'Give general feedback on this page',
    type: 'GENERAL_FEEDBACK',
    enabled: true,
    fields: [
      {
        label: 'Your Name',
        type: 'TEXT',
        placeholder: 'Enter your name',
        required: true,
      },
      {
        label: 'Email Address',
        type: 'EMAIL',
        placeholder: 'name@example.com',
        required: true,
      },
      {
        label: 'Your Feedback',
        type: 'TEXTAREA',
        placeholder: 'Tell us what you think...',
        required: true,
      },
    ],
  },
  {
    title: 'Report a Bug',
    description: "Let us know what's broken",
    type: 'REPORT_BUG',
    enabled: true,
    fields: [
      {
        label: 'Issue Title',
        type: 'TEXT',
        placeholder: 'Brief description of the issue',
        required: true,
      },
      {
        label: 'Issue Details',
        type: 'TEXTAREA',
        placeholder: 'Explain the issue in detail...',
        required: true,
      },
      {
        label: 'Screenshot',
        type: 'IMAGE',
        placeholder: 'Upload a screenshot (optional)',
        required: false,
      },
    ],
  },
  {
    title: 'Request a Feature',
    description: 'Tell us how we can improve',
    type: 'FEATURE_REQUEST',
    enabled: true,
    fields: [
      {
        label: 'Feature Title',
        type: 'TEXT',
        placeholder: 'Briefly describe the feature',
        required: true,
      },
      {
        label: 'Feature Details',
        type: 'TEXTAREA',
        placeholder: 'Explain how this feature would help...',
        required: true,
      },
    ],
  },
  {
    title: 'Contact Us',
    description: 'Tell us how we can help',
    type: 'CONTACT_US',
    enabled: true,
    fields: [
      {
        label: 'Contact Us Link',
        type: 'URL',
        url: '',
        required: false,
      },
    ],
  },
];

export const activeSection = {
  id: '679dea42e3c8fa409ac75214',
  title: 'General Feedback',
  description: 'Give general feedback on this page',
  enabled: true,
  feedbackId: '67928117ebd5a9108a73f3c4',
  userId: '679068443c724f57c82bea49',
  createdAt: '2025-02-01T09:32:50.979Z',
  updatedAt: '2025-02-01T09:32:50.979Z',
  type: 'GENERAL_FEEDBACK',
  formFields: [
    {
      id: '679dea43e3c8fa409ac75215',
      label: 'Your Name',
      type: 'TEXT',
      placeholder: 'Enter your name',
      required: true,
      sectionId: '679dea42e3c8fa409ac75214',
      order: 0,
      createdAt: '2025-02-01T09:32:50.979Z',
      updatedAt: '2025-02-01T09:32:50.979Z',
    },
    {
      id: '679dea43e3c8fa409ac75216',
      label: 'Email Address',
      type: 'EMAIL',
      placeholder: 'name@example.com',
      required: true,
      sectionId: '679dea42e3c8fa409ac75214',
      order: 0,
      createdAt: '2025-02-01T09:32:50.979Z',
      updatedAt: '2025-02-01T09:32:50.979Z',
    },
    {
      id: '679dea43e3c8fa409ac75217',
      label: 'Your Feedback',
      type: 'TEXTAREA',
      placeholder: 'Tell us what you think...',
      required: true,
      sectionId: '679dea42e3c8fa409ac75214',
      order: 0,
      createdAt: '2025-02-01T09:32:50.979Z',
      updatedAt: '2025-02-01T09:32:50.979Z',
    },
    {
      id: '679dea43e3c8fa409ac75218',
      label: 'Rate Your Experience',
      type: 'RATING',
      placeholder: '1 (Poor) to 5 (Excellent)',
      required: true,
      sectionId: '679dea42e3c8fa409ac75214',
      order: 0,
      createdAt: '2025-02-01T09:32:50.979Z',
      updatedAt: '2025-02-01T09:32:50.979Z',
    },
  ],
};
