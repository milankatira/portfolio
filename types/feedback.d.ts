// ✅ ThemeData Interface for Theme Updates
export interface ThemeData {
  primaryColor: string;
  secondaryColor: string;
  borderRadius: string;
}

// ✅ FormFieldData Interface for Form Fields
export interface FormFieldData {
  label: string;
  placeholder?: string | null;
  type: FieldType;
  id?: string;
  required?: boolean;
  url?: string | null;
}

// ✅ SectionData Interface for Sections
export interface SectionData {
  title: string;
  description: string;
  enabled: boolean;
  fields: FormFieldData[];
  type: GENERAL_FEEDBACK | REPORT_BUG | FEATURE_REQUEST | CONTACT_US;
}

// ✅ Extend Section to include FormFields
interface SectionWithFields extends Section {
  formFields: FormField[];
}

// ✅ Extend Feedback to include Sections and Theme
interface FeedbackWithDetails extends Feedback {
  sections: SectionWithFields[];
  theme: Theme | null;
}
