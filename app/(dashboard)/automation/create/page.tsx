/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { saveWorkflowAutomation } from '@/actions/workflowActions';
import {
  fetchCampaignsWithSections,
  fetchFieldsBySectionId,
} from '@/actions/feedback.action';
import { useRouter } from 'next/navigation';

interface Campaign {
  id: string;
  title: string;
  description: string;
  feedbackTitle: string;
  sections: Section[];
  feedbackId: string;
}

interface Section {
  id: string;
  title: string;
  description: string;
  feedbackId: string;
}

interface FieldSuggestion {
  id: string;
  label: string;
}

interface Condition {
  field: string;
  operator: string;
  value: string;
}

export default function WorkflowDetailsPage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [alertType, setAlertType] = useState<string>('Feedback Complete');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  // Update the initial state to include email
  const [destination, setDestination] = useState<string>('Slack');

  const [selectedFields, setSelectedFields] = useState<FieldSuggestion[]>([]);
  const [customMessage, setCustomMessage] = useState<string>('');

  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [availableFields, setAvailableFields] = useState<FieldSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    FieldSuggestion[]
  >([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { toast } = useToast(); // Hook for toast notifications

  // Fetch campaigns with sections
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchCampaignsWithSections();
        setCampaigns(data as unknown as Campaign[]);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load campaigns. Please try again later.',
          variant: 'destructive',
        });
      }
    };
    loadCampaigns();
  }, [toast]);

  const handleFieldSelection = (field: FieldSuggestion) => {
    setSelectedFields((prev) => {
      const exists = prev.some((f) => f.id === field.id);
      const updatedFields = exists
        ? prev.filter((f) => f.id !== field.id)
        : [...prev, field];

      const updatedMessage = updatedFields
        .map((f) => `${f.label}: @${f.label}`)
        .join('\n');
      setCustomMessage(updatedMessage);

      return updatedFields;
    });
  };

  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      { field: '', operator: 'equals', value: '' },
    ]);
  };

  const updateCondition = (
    index: number,
    key: keyof Condition,
    value: string
  ) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][key] = value;
    setConditions(updatedConditions);
  };

  const [feedbackId, setFeedbackId] = useState<string>('');

  const handleSaveWorkflow = async () => {
    setLoading(true);

    try {
      await saveWorkflowAutomation({
        title,
        alertType,
        campaign: selectedCampaign,
        destination,
        selectedFields: selectedFields.map((field) => field.id),
        customMessage,
        conditions,
        feedbackId,
      });
      toast({
        title: 'Success',
        description: 'Workflow saved successfully.',
        variant: 'default',
      });
      router.push('/automation');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save workflow. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCustomMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setCustomMessage(value);

    const lastChar = value.slice(-1);
    if (lastChar === '@') {
      setShowSuggestions(true);
      setFilteredSuggestions(availableFields);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (field: FieldSuggestion) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const newText =
      customMessage.slice(0, cursorPos) +
      `@${field.label}` +
      customMessage.slice(cursorPos);

    setCustomMessage(newText);
    setShowSuggestions(false);
  };

  // Fetch fields when a campaign is selected
  useEffect(() => {
    const loadFields = async () => {
      if (selectedCampaign) {
        try {
          const fieldsData: FieldSuggestion[] =
            await fetchFieldsBySectionId(selectedCampaign);
          setAvailableFields(fieldsData);
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to load fields. Please try again.',
            variant: 'destructive',
          });
        }
      }
    };
    loadFields();
  }, [selectedCampaign, toast]);

  return (
    <div className='p-6 min-h-screen'>
      <h1 className='text-2xl font-bold mb-6'>Create an Automation</h1>

      {/* Title */}
      <div className='mb-4'>
        <label className='block mb-2 font-medium'>Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter workflow title'
        />
      </div>

      {/* Alert Type */}
      <div className='mb-4'>
        <label className='block mb-2 font-medium'>Alert Type</label>
        <Select onValueChange={setAlertType} value={alertType}>
          <SelectTrigger>
            <SelectValue placeholder='Select alert type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Feedback Complete'>Feedback Complete</SelectItem>
            <SelectItem value='Feedback Incomplete'>
              Feedback Incomplete
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaign Dropdown */}
      <div className='mb-4'>
        <label className='block mb-2 font-medium'>Campaign</label>
        <Select
          value={selectedCampaign}
          onValueChange={(campaignId) => {
            setSelectedCampaign(campaignId);
            const selectedCampaignData = campaigns.find(
              (c) => c.id === campaignId
            );
            if (selectedCampaignData) {
              const feedbackIdFromCampaign = selectedCampaignData?.feedbackId;

              setFeedbackId(feedbackIdFromCampaign || '');
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a campaign' />
          </SelectTrigger>
          <SelectContent>
            {campaigns.map((campaign) => (
              <SelectItem key={campaign.id} value={campaign.id}>
                {campaign.title} ({campaign.feedbackTitle})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Destination */}
      <div className='mb-4'>
        <label className='block mb-2 font-medium'>Destination</label>
        <Select onValueChange={setDestination} value={destination}>
          <SelectTrigger>
            <SelectValue placeholder='Select destination' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Slack'>Slack</SelectItem>
            <SelectItem value='Discord'>Discord</SelectItem>
            <SelectItem value='Email'>Email</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Select Fields */}
      <div className='mb-4'>
        <label className='block mb-2 font-medium'>Select Fields</label>
        {availableFields.map((field) => (
          <div key={field.id} className='flex items-center mb-1'>
            <input
              type='checkbox'
              checked={selectedFields.some((f) => f.id === field.id)}
              onChange={() => handleFieldSelection(field)}
            />
            <span className='ml-2'>{field.label}</span>
          </div>
        ))}
      </div>

      {/* Customize Message */}
      <div className='mb-4 relative'>
        <label className='block mb-2 font-medium'>Customize your message</label>
        <Textarea
          ref={textareaRef}
          value={customMessage}
          onChange={handleCustomMessageChange}
          placeholder='Type @ to mention fields'
          className='w-full p-2 border rounded-md focus:outline-none focus:ring'
          rows={5}
        />
        {showSuggestions && (
          <div className='absolute bg-white border rounded shadow-md max-h-40 overflow-y-auto z-10'>
            {filteredSuggestions.map((field) => (
              <div
                key={field.id}
                className='p-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleSuggestionClick(field)}
              >
                {field.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Conditions */}
      <div className='mb-6'>
        <label className='block mb-2 font-medium'>Conditions</label>
        {conditions.map((condition, index) => (
          <div key={index} className='flex space-x-2 mb-2'>
            <Select
              onValueChange={(val) => updateCondition(index, 'field', val)}
              value={condition.field}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select field' />
              </SelectTrigger>
              <SelectContent>
                {availableFields.map((field) => (
                  <SelectItem key={field.id} value={field.id}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(val) => updateCondition(index, 'operator', val)}
              value={condition.operator}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select operator' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='equals'>Equals</SelectItem>
                <SelectItem value='not_equals'>Not Equals</SelectItem>
                <SelectItem value='greater_than'>Greater Than</SelectItem>
                <SelectItem value='less_than'>Less Than</SelectItem>
                <SelectItem value='starts_with'>Starts With</SelectItem>
                <SelectItem value='ends_with'>Ends With</SelectItem>
                <SelectItem value='contains'>Contains</SelectItem>
                <SelectItem value='regex'>Regular Expression</SelectItem>
              </SelectContent>
            </Select>

            <Input
              value={condition.value}
              onChange={(e) => updateCondition(index, 'value', e.target.value)}
              placeholder='Condition value'
            />
          </div>
        ))}
        <Button onClick={addCondition}>Add Condition</Button>
      </div>

      {/* Save Button */}
      <div>
        <Button onClick={handleSaveWorkflow} disabled={loading}>
          {loading ? 'Saving...' : 'Save Automation'}
        </Button>
      </div>
    </div>
  );
}
