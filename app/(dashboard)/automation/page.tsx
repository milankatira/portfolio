/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  fetchUserWorkflows,
  toggleWorkflowPublishStatus,
  deleteWorkflow,
} from '@/actions/workflowActions';
import { SlackIcon } from '@/components/icons/SlackIcon';
import { DiscordIcon } from '@/components/icons/DiscordIcon';
import { Loader2 } from 'lucide-react';
import { GmailIcon } from '@/components/icons/GmailIcon';

export default function WorkflowPage() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadWorkflows = async () => {
      setLoading(true);
      const data = await fetchUserWorkflows();
      setWorkflows(data);
      setLoading(false);
    };

    loadWorkflows();
  }, []);

  const handleTogglePublish = async (workflowId: string, publish: boolean) => {
    try {
      const updatedWorkflow = await toggleWorkflowPublishStatus(
        workflowId,
        publish
      );
      setWorkflows((prevWorkflows) =>
        prevWorkflows.map((workflow) =>
          workflow.id === workflowId
            ? { ...workflow, publish: updatedWorkflow.publish }
            : workflow
        )
      );
    } catch (error) {
      console.error('Error updating workflow status:', error);
    }
  };

  const handleAddWorkflow = () => {
    router.push('/automation/create');
  };

  const handleDeleteWorkflow = async (workflowId: string) => {
    try {
      await deleteWorkflow(workflowId);
      setWorkflows((prevWorkflows) =>
        prevWorkflows.filter((workflow) => workflow.id !== workflowId)
      );
    } catch (error) {
      console.error('Error deleting workflow:', error);
    }
  };

  return (
    <div className='p-6 min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-extrabold'>Automations</h1>
          <p className='text-muted-foreground'>Manage your automated workflows and integrations</p>
        </div>
        <Button onClick={handleAddWorkflow} className='transition-all hover:scale-105'>
          + Create New Automation
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loading ? (
          <div className='flex justify-center items-center py-20 w-[70vw]'>
            <Loader2 className='animate-spin h-6 w-6 text-muted-foreground' />
          </div>
        ) : workflows.length > 0 ? (
          workflows.map((workflow) => (
            <Card
              key={workflow._id || workflow.id}
              className='flex flex-col justify-between p-6 shadow-md rounded-lg hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] border border-border'
            >
              <div className='space-y-4'>
                <CardHeader className='p-0 mb-2'>
                  <CardTitle className='text-lg font-bold text-primary'>
                    {workflow.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className='p-0'>
                  <div className='flex items-center space-x-3 mb-4'>
                    {workflow.destination === 'Slack' && (

                      <SlackIcon />

                    )}
                    {workflow.destination === 'Discord' && (

                      <DiscordIcon />

                    )}
                    {workflow.destination === 'Email' && (

                      <GmailIcon />

                    )}
                    <span className='font-medium'>{workflow.destination}</span>
                  </div>
                  <div className='text-sm text-muted-foreground leading-relaxed'>
                    <p><span className='font-medium text-foreground'>Custom Message:</span> {workflow.customMessage}</p>
                  </div>
                </CardContent>
              </div>
              <div className='flex justify-between items-center mt-6 pt-4 border-t border-border'>
                <div className='flex items-center gap-3'>
                  <Switch
                    checked={workflow.publish}
                    onCheckedChange={(checked) =>
                      handleTogglePublish(workflow.id, checked)
                    }
                  />
                  <span className={`text-sm ${workflow.publish ? 'text-green-500 dark:text-green-500' : 'text-muted-foreground'}`}>
                    {workflow.publish ? 'Published' : 'Draft'}
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteWorkflow(workflow.id)}
                  className="transition-opacity hover:opacity-90"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-3 flex justify-center items-center py-20">
            <p className="text-muted-foreground">No workflows found. Create your first automation!</p>
          </div>
        )}
      </div>
    </div>
  );
}
