'use client';
import { HexColorPicker } from 'react-colorful';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, Eye, ImageIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import PreviewDialog from '@/components/Feedback/preview-dialog';
import {
  getFeedbackFormById,
  getFeedbackTheme,
  updateFeedbackFormFields,
  updateFeedbackTheme,
} from '@/actions/feedback.action';
import { Trash2 } from 'lucide-react';
import MarkdownRenderer from '@/components/markdown-renderer';
import { toast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface FieldConfig {
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'textarea' | 'rating' | 'image' | 'url';
  url?: string;
}

const FormField = ({
  config,
  onUpdate,
}: {
  config: FieldConfig;
  onUpdate?: (value: string) => void;
}) => {
  switch (config.type.toLowerCase()) {
    case 'textarea':
      return (
        <div className='space-y-2'>
          <Label>{config.label}</Label>
          <Textarea placeholder={config.placeholder} />
        </div>
      );
    case 'rating':
      return (
        <div className='space-y-4'>
          <Label>{config.label}</Label>
          <div className='space-y-2'>
            <Slider defaultValue={[3]} max={5} step={1} />
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        </div>
      );
    case 'image':
      return (
        <div className='space-y-2'>
          <Label>{config.label}</Label>
          <div className='flex items-center justify-center w-full'>
            <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <ImageIcon className='w-8 h-8 mb-2 text-muted-foreground' />
                <p className='text-sm text-muted-foreground'>
                  {config.placeholder}
                </p>
              </div>
              {/* <input type='file' className='hidden' accept='image/*' /> */}
            </label>
          </div>
        </div>
      );

    case 'url':
      return (
        <div className='space-y-2'>
          <Label>{config.label}</Label>
          <Input
            type='url'
            placeholder='Enter URL'
            value={config.url || ''}
            onChange={(e) => onUpdate?.(e.target.value)}
          />
        </div>
      );
    default:
      return (
        <div className='space-y-2'>
          <Label>{config.label}</Label>
          <Input type={config.type} placeholder={config.placeholder} />
        </div>
      );
  }
};

interface ThemeData {
  primaryColor: string;
  secondaryColor: string;
  borderRadius: string;
}

interface PageProps {
  params: {
    feedbackId: string | undefined;
  };
}

interface FormFieldData {
  id: string;
  label: string;
  type: 'TEXT' | 'EMAIL' | 'TEXTAREA' | 'RATING' | 'IMAGE' | 'URL';
  placeholder?: string;
  required?: boolean;
  url?: string;
}

interface SectionData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hasError: any;
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  formFields: FormFieldData[];
  type: 'GENERAL_FEEDBACK' | 'REPORT_BUG' | 'FEATURE_REQUEST' | 'CONTACT_US';
}

interface ThemeData {
  primaryColor: string;
  secondaryColor: string;
  borderRadius: string;
}

interface FeedbackFormData {
  id: string;
  title: string;
  description: string;
  sections: SectionData[];
  theme?: ThemeData;
}
export default function FeedBackForm({ params }: PageProps) {
  const [feedbackData, setFeedbackData] = useState<FeedbackFormData | null>(
    null
  );
  const [customThemeModalOpen, setCustomThemeModalOpen] = useState(false);
  const [selectedPrimaryColor, setSelectedPrimaryColor] =
    useState<string>('#0000FF');
  const [selectedSecondaryColor, setSelectedSecondaryColor] =
    useState<string>('#FFFFFF');
  const [selectedBorderRadius, setSelectedBorderRadius] =
    useState<string>('8px');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [primaryColors, setPrimaryColors] = useState<string[]>([
    '#0000FF',
    '#FFFFFF',
    '#800080',
  ]);

  const [secondaryColors, setSecondaryColors] = useState<string[]>([
    '#0000FF',
    '#800080',
    '#808080',
    '#9370DB',
  ]);

  const fetchTheme = async () => {
    if (params.feedbackId) {
      try {
        const themeData: ThemeData = await getFeedbackTheme(params.feedbackId);

        // Set the selected colors
        setSelectedPrimaryColor(themeData.primaryColor);
        setSelectedSecondaryColor(themeData.secondaryColor);
        setSelectedBorderRadius(themeData.borderRadius);

        // Dynamically add colors using a Set for uniqueness
        setPrimaryColors((prev) =>
          Array.from(new Set([...prev, themeData.primaryColor]))
        );
        setSecondaryColors((prev) =>
          Array.from(new Set([...prev, themeData.secondaryColor]))
        );
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    }
  };
  useEffect(() => {
    fetchTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.feedbackId]);

  // ✅ Fetch feedback form data on component load
  useEffect(() => {
    const fetchFeedbackForm = async () => {
      if (!params.feedbackId) return;

      setLoading(true);

      try {
        const data = await getFeedbackFormById(params.feedbackId);

        if (data && data.sections) {
          const updatedSections = data.sections.map((section) => ({
            ...section,
            formFields: section.formFields
              .filter((field) =>
                [
                  'TEXT',
                  'EMAIL',
                  'TEXTAREA',
                  'RATING',
                  'IMAGE',
                  'URL',
                ].includes(field.type)
              )
              .map((field) => ({
                ...field,
                placeholder:
                  field.type === 'URL' ? undefined : field.placeholder || '',
                url: field.type === 'URL' ? field.url || '' : undefined,
              })),
          }));

          setFeedbackData({
            ...data,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            sections: updatedSections,
            theme: data.theme || undefined,
          });
        }
      } catch (error) {
        console.error('Error fetching feedback form:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackForm();
  }, [params.feedbackId]);

  // Handler to update theme
  const handleUpdateTheme = async () => {
    setLoading(true);
    try {
      const themeData: ThemeData = {
        primaryColor: selectedPrimaryColor,
        secondaryColor: selectedSecondaryColor,
        borderRadius: selectedBorderRadius,
      };

      if (params.feedbackId) {
        await updateFeedbackTheme(params.feedbackId, themeData);
        await fetchTheme();
      }

      setSuccessMessage('Theme updated successfully!');
    } catch (error) {
      console.error('Error updating theme:', error);
      setSuccessMessage('Failed to update the theme.');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const [activeTab, setActiveTab] = React.useState('edit');
  const [showPreview, setShowPreview] = React.useState(false);
  const [activeSectionId, setActiveSectionId] = React.useState<string | null>(
    null
  );

  const addFieldToSection = (sectionId: string) => {
    if (!feedbackData) return; // ✅ Prevent errors if feedbackData is null

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setFeedbackData((prevData) => {
      if (!prevData) return prevData; // ✅ Double-check for safety

      return {
        ...prevData,
        sections: prevData.sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              formFields: [
                ...section.formFields,
                {
                  type: 'TEXT',
                  label: 'New Field',
                  placeholder: 'Enter text here',
                  required: false, // ✅ Default required status
                },
              ],
            };
          }
          return section;
        }),
      };
    });
  };

  const updateField = (
    sectionId: string,
    fieldIndex: number,
    updates: Partial<FormFieldData>
  ) => {
    if (!feedbackData) return;
    setFeedbackData({
      ...feedbackData,
      sections: feedbackData.sections.map((section) => {
        if (section.id === sectionId) {
          const newFields = [...section.formFields];
          newFields[fieldIndex] = { ...newFields[fieldIndex], ...updates };
          return { ...section, formFields: newFields };
        }
        return section;
      }),
    });
  };

  const toggleSection = (sectionId: string) => {
    if (!feedbackData) return; // ✅ Prevents errors if feedbackData is null

    setFeedbackData((prevData) => ({
      ...prevData!,
      sections: prevData!.sections.map((section) =>
        section.id === sectionId
          ? { ...section, enabled: !section.enabled }
          : section
      ),
    }));
  };

  const handleUpdateFormFields = async () => {
    setLoading(true);
    try {
      if (params.feedbackId && feedbackData) {
        const sectionsWithErrors = new Set<string>();

        const hasEmptyFields = feedbackData.sections.some((section) =>
          section.formFields.some((field) => {
            if (field.required && !field.label) {
              sectionsWithErrors.add(section.id);
              return true;
            }
            if (field.type === 'URL' && !field.url) {
              sectionsWithErrors.add(section.id);
              return true;
            }
            return false;
          })
        );

        if (hasEmptyFields) {
          setFeedbackData((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              sections: prev.sections.map((section) => ({
                ...section,
                hasError: sectionsWithErrors.has(section.id),
              })),
            };
          });

          toast({
            title: 'Error',
            description: 'Please fill out all required fields before publishing.',
            variant: 'destructive',
          });
          return;
        }

        setFeedbackData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            sections: prev.sections.map((section) => ({
              ...section,
              hasError: false,
            })),
          };
        });

        const sectionsData = feedbackData.sections.map((section) => ({
          title: section.title,
          description: section.description,
          enabled: section.enabled,
          type: section.type,
          fields: section.formFields.map((field) => ({
            label: field.label,
            url: field.url || '',
            placeholder: field.placeholder,
            type: field.type.toUpperCase() as
              | 'TEXT'
              | 'EMAIL'
              | 'TEXTAREA'
              | 'RATING'
              | 'IMAGE'
              | 'URL',
            required: true,
          })),
        }));
        await updateFeedbackFormFields(params.feedbackId, sectionsData);
        toast({
          title: 'Success!',
          description: 'Your feedback form has been published successfully.',
          variant: 'default',
        });
      }
    } catch (error) {
      console.error('Error updating form fields:', error);
      toast({
        title: 'Error',
        description: 'Failed to publish feedback form. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteFieldFromSection = (sectionId: string, fieldIndex: number) => {
    if (!feedbackData) return;

    setFeedbackData((prevData) => {
      if (!prevData) return prevData;

      return {
        ...prevData,
        sections: prevData.sections.map((section) => {
          if (section.id === sectionId) {
            // ⚠️ Prevent deletion if only one field exists
            if (section.formFields.length <= 1) {
              alert('Each section must have at least one form field.');
              return section;
            }

            // ✅ Remove the selected field
            const updatedFields = section.formFields.filter(
              (_, index) => index !== fieldIndex
            );
            return { ...section, formFields: updatedFields };
          }
          return section;
        }),
      };
    });
  };

  const markdownContent = `
\`\`\`html
<feed-spark-widget project-id="${params.feedbackId}"></feed-spark-widget>
<script src="https://feed-spark-widget.vercel.app/widget.umd.js"></script>
\`\`\`
`;

  if (!feedbackData && loading) {
    return (
      <div className='min-h-screen bg-background'>
        <header className='flex items-center justify-between border-b px-6 py-3'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon'>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <span className='text-lg font-semibold'>Edit Feedback</span>
          </div>
        </header>
        <div className='flex justify-center items-center py-20'>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <header className='flex items-center justify-between border-b px-6 py-3'>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon'>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <span className='text-lg font-semibold'>Edit Feedback</span>
        </div>
        <Button onClick={handleUpdateFormFields} disabled={loading}>
          {loading ? (
            <div className='flex items-center gap-2'>
              Publishing...
            </div>
          ) : (
            'Publish'
          )}
        </Button>
      </header>

      <div className='container mx-auto p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='space-y-6'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='space-y-6'
            >
              <TabsList className='grid w-[400px] grid-cols-3'>
                <TabsTrigger value='edit'>Edit</TabsTrigger>
                <TabsTrigger value='theme'>Theme</TabsTrigger>
                <TabsTrigger value='code'>Code</TabsTrigger>
              </TabsList>

              <TabsContent value='edit' className='space-y-6'>
                <Accordion
                  type='single'
                  collapsible
                  className='w-full space-y-4'
                  value={activeSectionId || undefined}
                  onValueChange={setActiveSectionId}
                >
                  {feedbackData &&
                    feedbackData?.sections &&
                    feedbackData?.sections.map((section, sectionIndex) => (
                      <AccordionItem
                        key={section.id}
                        value={section.id}
                        className='border-0'
                      >
                        <Card className={section.hasError ? 'border-red-500' : ''}>
                          <CardHeader className='border-b'>
                            <AccordionTrigger className='hover:no-underline'>
                              <div className='flex items-center gap-4'>
                                {section.hasError && (
                                  <span className='text-red-500'>*</span>
                                )}
                                <div className='flex items-center gap-2'>
                                  <div className='rounded bg-muted p-4'>
                                    {sectionIndex + 1}
                                  </div>
                                  <div>
                                    <CardTitle>{section.title}</CardTitle>
                                    <CardDescription className='mt-1'>
                                      {section.description}
                                    </CardDescription>
                                  </div>
                                </div>
                              </div>
                              <div className='ml-auto mr-4'>
                                <Switch
                                  checked={section.enabled}
                                  onCheckedChange={() =>
                                    toggleSection(section.id)
                                  }
                                />
                              </div>
                            </AccordionTrigger>
                          </CardHeader>
                          <AccordionContent>
                            <CardContent className='pt-4'>
                              <div className='space-y-6'>
                                {section.formFields &&
                                  section.formFields?.length > 0 &&
                                  section.formFields.map(
                                    (field, fieldIndex) => (
                                      <Card key={fieldIndex}>
                                        {field.type !== 'URL' && (
                                          <CardHeader className='flex flex-row justify-between'>
                                            <CardTitle className='text-sm'>
                                              Field {fieldIndex + 1}
                                            </CardTitle>
                                            {section.formFields.length > 1 && (
                                              <Button
                                                variant='ghost'
                                                size='icon'
                                                onClick={() =>
                                                  deleteFieldFromSection(
                                                    section.id,
                                                    fieldIndex
                                                  )
                                                }
                                              >
                                                <Trash2 className='w-4 h-4 text-red-500' />
                                              </Button>
                                            )}
                                          </CardHeader>
                                        )}
                                        <CardContent className='space-y-4'>
                                          {field.type !== 'URL' && (
                                            <>
                                              <div className='space-y-2'>
                                                <Label>Type</Label>
                                                <Select
                                                  value={field.type.toLocaleLowerCase()}
                                                  onValueChange={(
                                                    value: FieldConfig['type']
                                                  ) =>
                                                    updateField(
                                                      section.id,
                                                      fieldIndex,
                                                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                      // @ts-expect-error
                                                      { type: value }
                                                    )
                                                  }
                                                >
                                                  <SelectTrigger>
                                                    <SelectValue />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem value='text'>
                                                      Text
                                                    </SelectItem>
                                                    <SelectItem value='email'>
                                                      Email
                                                    </SelectItem>
                                                    <SelectItem value='textarea'>
                                                      Text Area
                                                    </SelectItem>
                                                    <SelectItem value='rating'>
                                                      Rating
                                                    </SelectItem>
                                                    <SelectItem value='image'>
                                                      Image
                                                    </SelectItem>
                                                    <SelectItem value='url'>
                                                      Url
                                                    </SelectItem>
                                                  </SelectContent>
                                                </Select>
                                              </div>

                                              <div className='space-y-2'>
                                                <Label>Label</Label>
                                                <Input
                                                  value={field.label}
                                                  onChange={(e) =>
                                                    updateField(
                                                      section.id,
                                                      fieldIndex,
                                                      { label: e.target.value }
                                                    )
                                                  }
                                                />
                                              </div>
                                            </>
                                          )}

                                          {field.type === 'URL' ? (
                                            <div className='space-y-2 mt-4'>
                                              <Label>URL</Label>
                                              <Input
                                                value={field.url || ''}
                                                onChange={(e) =>
                                                  updateField(
                                                    section.id,
                                                    fieldIndex,
                                                    { url: e.target.value }
                                                  )
                                                }
                                                className={section.hasError ? 'border-red-500' : ''}
                                              />
                                            </div>
                                          ) : (
                                            <div className='space-y-2'>
                                              <Label>Placeholder</Label>
                                              <Input
                                                value={field.placeholder}
                                                onChange={(e) =>
                                                  updateField(
                                                    section.id,
                                                    fieldIndex,
                                                    {
                                                      placeholder:
                                                        e.target.value,
                                                    }
                                                  )
                                                }
                                              />
                                            </div>
                                          )}
                                          {field.type !== 'URL' && (
                                            <div className='border rounded-lg p-4 bg-muted/50'>
                                              <FormField
                                                //  @ts-expect-error FieldConfig type mismatch
                                                config={field}
                                                onUpdate={(value) =>
                                                  updateField(
                                                    section.id,
                                                    fieldIndex,
                                                    { url: value }
                                                  )
                                                }
                                              />
                                            </div>
                                          )}
                                        </CardContent>
                                      </Card>
                                    )
                                  )}

                                <Button
                                  className='w-full'
                                  variant='outline'
                                  onClick={() => addFieldToSection(section.id)}
                                >
                                  <Plus className='mr-2 h-4 w-4' />
                                  Add Field
                                </Button>
                              </div>
                            </CardContent>
                          </AccordionContent>
                        </Card>
                      </AccordionItem>
                    ))}
                </Accordion>
              </TabsContent>

              <TabsContent value='theme' className='space-y-6'>
                <div className='space-y-6'>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <Label className='text-base'>Select Theme</Label>
                      <Button
                        variant='outline'
                        className='border-primary'
                        onClick={handleUpdateTheme}
                        disabled={loading}
                      >
                        {loading ? (
                          <div className='flex items-center gap-2'>
                            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-primary'></div>
                            Saving...
                          </div>
                        ) : (
                          'Save Theme'
                        )}
                      </Button>
                    </div>
                    {successMessage && (
                      <p className='text-sm text-green-500'>{successMessage}</p>
                    )}
                  </div>

                  {/* Primary Color Selection */}
                  <div className='space-y-4'>
                    <Label className='text-base'>Primary Color</Label>
                    <div className='flex gap-2'>
                      {primaryColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedPrimaryColor(color)}
                          className={`h-8 w-8 rounded-full border ${selectedPrimaryColor === color ? 'ring-2 ring-primary' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <button
                        className='flex h-8 w-8 items-center justify-center rounded-full border border-dashed'
                        onClick={() => setCustomThemeModalOpen(true)}
                      >
                        <Plus className='h-4 w-4' />
                      </button>
                    </div>
                  </div>

                  {/* Secondary Color Selection */}
                  <div className='space-y-4'>
                    <Label className='text-base'>Secondary Color</Label>
                    <div className='flex gap-2'>
                      {secondaryColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedSecondaryColor(color)}
                          className={`h-8 w-8 rounded-full border ${selectedSecondaryColor === color ? 'ring-2 ring-primary' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <button
                        className='flex h-8 w-8 items-center justify-center rounded-full border border-dashed'
                        onClick={() => setCustomThemeModalOpen(true)}
                      >
                        <Plus className='h-4 w-4' />
                      </button>
                    </div>
                  </div>

                  {/* Border Radius Selection */}
                  <div className='space-y-4'>
                    <Label className='text-base'>Border Radius</Label>
                    <RadioGroup
                      value={selectedBorderRadius}
                      onValueChange={setSelectedBorderRadius}
                      className='grid grid-cols-4 gap-4'
                    >
                      {['4px', '8px', '12px', '16px'].map((radius) => (
                        <Label
                          key={radius}
                          className={`flex cursor-pointer items-center justify-center rounded-md border p-4 hover:bg-accent ${selectedBorderRadius === radius
                            ? 'border-primary'
                            : 'border-muted'
                            }`}
                        >
                          <RadioGroupItem value={radius} className='sr-only' />
                          {radius}
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='code'>
                <div className='p-4'>
                  <MarkdownRenderer content={markdownContent} />
                </div>
              </TabsContent>
              {/* Theme tab content remains the same */}
            </Tabs>
          </div>

          <div className='relative hidden lg:block'>
            <div className='sticky top-6'>
              <Card className='border-2 border-dashed'>
                <CardHeader className='border-b'>
                  <div className='flex items-center justify-between'>
                    <CardTitle>Preview</CardTitle>
                  </div>
                </CardHeader>
                {feedbackData && (
                  <PreviewDialog
                    sections={feedbackData?.sections}
                    selectedPrimaryColor={selectedPrimaryColor}
                    selectedSecondaryColor={selectedSecondaryColor}
                    selectedBorderRadius={selectedBorderRadius}
                  />
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className='sm:max-w-[425px] max-h-96 overflow-scroll'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold'>Preview</h2>
          </div>
          <div className='space-y-8'>
            {feedbackData?.sections
              ?.filter((section) => section.enabled)
              .map((section) => (
                <div key={section.id} className='space-y-4'>
                  <div className='space-y-2'>
                    <h2 className='text-xl font-semibold'>{section.title}</h2>
                    <p className='text-sm text-muted-foreground'>
                      {section.description}
                    </p>
                  </div>
                  <div className='space-y-4'>
                    {section.formFields.map((field, index) => (
                      <FormField
                        key={index}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        config={{
                          ...field,
                          placeholder: field.placeholder || '',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            <Button className='w-full'>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={customThemeModalOpen}
        onOpenChange={setCustomThemeModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-lg font-bold'>
              Add Custom Theme
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-6'>
            {/* Custom Primary Color Section */}
            <div className='space-y-4'>
              <Label className='text-sm font-semibold'>
                Custom Primary Color
              </Label>
              <div className='space-y-2'>
                {/* Color Picker */}
                <HexColorPicker
                  color={selectedPrimaryColor}
                  onChange={setSelectedPrimaryColor}
                  className='w-full max-w-[300px] mx-auto'
                />
                {/* HEX Input Field */}
                <Input
                  value={selectedPrimaryColor}
                  onChange={(e) => {
                    const hex = e.target.value;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(hex)) {
                      setSelectedPrimaryColor(hex);
                    }
                  }}
                  placeholder='Enter HEX code (e.g., #000 or #0000FF)'
                  maxLength={7}
                  className={`border rounded-md px-3 py-2 text-sm ${/^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(
                    selectedPrimaryColor
                  )
                    ? 'border-gray-300'
                    : 'border-red-500'
                    }`}
                />
                {/* Error Message */}
                {!/^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(
                  selectedPrimaryColor
                ) && <p className='text-xs text-red-500'>Invalid HEX Code</p>}
              </div>
            </div>

            {/* Custom Secondary Color Section */}
            <div className='space-y-4'>
              <Label className='text-sm font-semibold'>
                Custom Secondary Color
              </Label>
              <div className='space-y-2'>
                {/* Color Picker */}
                <HexColorPicker
                  color={selectedSecondaryColor}
                  onChange={setSelectedSecondaryColor}
                  className='w-full max-w-[300px] mx-auto'
                />
                {/* HEX Input Field */}
                <Input
                  value={selectedSecondaryColor}
                  onChange={(e) => {
                    const hex = e.target.value;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(hex)) {
                      setSelectedSecondaryColor(hex);
                    }
                  }}
                  placeholder='Enter HEX code (e.g., #FFF or #FFFFFF)'
                  maxLength={7}
                  className={`border rounded-md px-3 py-2 text-sm ${/^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(
                    selectedSecondaryColor
                  )
                    ? 'border-gray-300'
                    : 'border-red-500'
                    }`}
                />
                {/* Error Message */}
                {!/^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(
                  selectedSecondaryColor
                ) && <p className='text-xs text-red-500'>Invalid HEX Code</p>}
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className='flex justify-end space-x-2'>
            <Button
              variant='outline'
              onClick={() => setCustomThemeModalOpen(false)}
              className='px-4 py-2 text-sm'
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (
                  /^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(
                    selectedPrimaryColor
                  ) &&
                  /^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(
                    selectedSecondaryColor
                  )
                ) {
                  handleUpdateTheme();
                  setCustomThemeModalOpen(false);
                } else {
                  alert('Please enter valid HEX codes for both colors.');
                }
              }}
            >
              Save Theme
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Preview Button */}
      <div className='fixed bottom-6 right-6 lg:hidden'>
        <Button
          onClick={() => setShowPreview(true)}
          size='lg'
          className='rounded-full shadow-lg'
        >
          <Eye className='h-4 w-4 mr-2' />
          Preview
        </Button>
      </div>
    </div>
  );
}
