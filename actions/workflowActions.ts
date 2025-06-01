/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import prisma from '@/lib/prisma';
import { fetchCurrentUser } from './auth.action';
export async function fetchUserWorkflows() {
  try {
    const auth = await fetchCurrentUser();
    const workflows = await prisma.workflow.findMany({
      where: { userId: auth.id },
      select: {
        id: true,
        title: true,
        alertType: true,
        destination: true,
        customMessage: true,
        createdAt: true,
        updatedAt: true,
        publish: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return workflows.map((workflow) => ({
      ...workflow,
    }));
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return [];
  }
}

export async function saveWorkflowAutomation(workflowData: {
  title: string;
  alertType: string;
  campaign: string;
  destination: string;
  selectedFields: string[];
  customMessage: string;
  conditions: { field: string; operator: string; value: string }[];
  feedbackId?: string;
}) {
  const auth = await fetchCurrentUser();
  try {
    const {
      title,
      alertType,
      campaign,
      destination,
      selectedFields,
      customMessage,
      conditions,
      feedbackId,
    } = workflowData;

    // Save workflow in the database
    await prisma.workflow.create({
      data: {
        title,
        alertType,
        campaignId: campaign,
        destination,
        selectedFields,
        customMessage,
        userId: auth.id,
        publish: true,
        feedbackId: feedbackId || '',
        conditions: conditions && JSON.stringify(conditions), // Convert conditions to JSON
      },
    });

    console.log('Workflow saved successfully');
  } catch (error) {
    console.error('Error saving workflow automation:', error);
    throw new Error('Failed to save workflow automation');
  }
}

export async function toggleWorkflowPublishStatus(
  workflowId: string,
  publish: boolean
) {
  try {
    const updatedWorkflow = await prisma.workflow.update({
      where: { id: workflowId },
      data: { publish },
    });
    return updatedWorkflow;
  } catch (error) {
    console.error('Error updating workflow status:', error);
    throw new Error('Failed to update workflow status.');
  }
}

export async function deleteWorkflow(workflowId: string) {
  try {
    await prisma.workflow.delete({
      where: { id: workflowId }
    });
    return true;
  } catch (error) {
    console.error('Error deleting workflow:', error);
    throw new Error('Failed to delete workflow');
  }
}
