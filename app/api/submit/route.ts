/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { listBotChannels, postMessageToSlack } from '@/lib/slack';
import { postMessageToDiscord } from '@/lib/discord';
import { sendEmail } from '@/lib/email';

// 📝 Function to Format Messages Dynamically
function formatCustomMessage(
  customMessage: string,
  responses: any[],
  formFields: any[]
) {
  let formattedMessage = customMessage;

  responses.forEach((res) => {
    const field = formFields.find((ff) => ff.id === res.formFieldId);
    const label = field?.label || 'Unknown Field';
    formattedMessage = formattedMessage.replace(
      new RegExp(`@${label}`, 'gi'),
      res.answer || ''
    );
  });

  return formattedMessage;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      feedbackId,
      guestUserId,
      ipAddress,
      city,
      region,
      country,
      location,
      org,
      postalCode,
      timezone,
      responses,
    } = body;

    // ✅ Basic Validation
    if (!feedbackId || !responses || responses.length === 0) {
      return NextResponse.json(
        { error: 'Feedback ID and responses are required.' },
        { status: 400 }
      );
    }

    let submissionData: any = {
      feedbackId,
      ipAddress,
      city,
      region,
      country,
      location,
      org,
      postalCode,
      timezone,
    };

    // 🔍 Check if guestUserId exists in DB
    if (guestUserId) {
      const existingGuestUser = await prisma.guestUser.findUnique({
        where: { entityId: guestUserId },
      });

      if (existingGuestUser) {
        submissionData.guestUserId = guestUserId;
      } else {
        return NextResponse.json(
          { error: 'Invalid guest user ID. User not found.' },
          { status: 404 }
        );
      }
    } else {
      const guestUser = await prisma.guestUser.create({
        data: {
          formFieldId: responses[0].formFieldId,
        },
      });

      submissionData.guestUserId = guestUser.entityId;
    }

    // 📝 Create Submission
    const submission = await prisma.submission.create({
      data: submissionData,
    });

    // 📥 Bulk Insert Responses
    const responseData = responses.map((res: any) => ({
      submissionId: submission.id,
      sectionId: res.sectionId,
      formFieldId: res.formFieldId,
      answer: res.answer,
    }));

    await prisma.response.createMany({
      data: responseData,
    });

    // 🔍 Retrieve Feedback and User Information
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        user: {
          include: {
            slackAccounts: true,
            discordWebhooks: true,
            Workflows: true,
            connections: true,
          },
        },
      },
    });

    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback not found.' },
        { status: 404 }
      );
    }

    const { Workflows, slackAccounts, discordWebhooks, connections } =
      feedback.user;

    console.log(connections, 'connections');

    // 🔍 Filter & Process All Matching Workflows
    const workflows = Workflows.filter(
      (wf) => wf.alertType === 'Feedback Complete' && wf.publish
    );

    if (workflows.length === 0) {
      console.log(`No active workflows found for Feedback ID: ${feedbackId}`);
      return NextResponse.json(
        { message: 'No active workflows for this feedback.' },
        { status: 200 }
      );
    }

    // 🔍 Fetch FormField and Section Details for Responses
    const formFieldIds = responses.map((res: any) => res.formFieldId);
    const formFields = await prisma.formField.findMany({
      where: { id: { in: formFieldIds } },
    });

    // 📤 Iterate Over Each Workflow & Trigger Notifications
    for (const workflow of workflows) {
      const selectedFields = workflow.selectedFields;
      const destination = workflow.destination.toLowerCase();

      // 🏷️ Filter Responses Based on Workflow's Selected Fields
      const matchingFields = responses.filter((res: { formFieldId: string }) =>
        selectedFields.includes(res.formFieldId)
      );

      if (matchingFields.length === 0) {
        console.log(
          `No matching fields in workflow for Feedback ID: ${feedbackId}`
        );
        continue;
      }

      // 📝 Format Custom Message
      const customMessage = formatCustomMessage(
        workflow.customMessage,
        responses,
        formFields
      );

      // 📤 Handle Notifications Based on Destination
      if (destination === 'slack' && slackAccounts.length > 0) {
        const slackAccount = slackAccounts[0];
        const slackAccessToken = slackAccount.slackAccessToken;
        const slackChannels = await listBotChannels(slackAccessToken);

        console.log(
          `Sending message to Slack for Workflow ID: ${workflow.id}, Feedback ID: ${feedbackId}`
        );
        await postMessageToSlack(
          slackAccessToken,
          slackChannels,
          customMessage
        );
      } else if (destination === 'discord' && discordWebhooks.length > 0) {
        const discordWebhook = discordWebhooks[0];
        console.log(
          `Sending message to Discord for Workflow ID: ${workflow.id}, Feedback ID: ${feedbackId}`
        );
        await postMessageToDiscord(discordWebhook.url, customMessage);
      } else if (destination === 'email') {
        const emailConnections = connections.filter(
          (conn) => conn.type === 'Email' && conn.email
        );

        if (emailConnections.length > 0) {
          console.log(
            `Sending email notifications for Workflow ID: ${workflow.id}, Feedback ID: ${feedbackId}`
          );
          await Promise.all(
            emailConnections.map((conn) =>
              sendEmail(conn.email!, customMessage).catch((error) => {
                console.error(`Failed to send email to ${conn.email}:`, error);
              })
            )
          );
        } else {
          console.log('No email connections found for notification');
        }
      } else {
        console.log(
          `Invalid or unsupported destination: ${workflow.destination}`
        );
      }
    }

    return NextResponse.json(
      {
        message: 'Form submitted successfully and workflows executed.',
        submissionId: submission.id,
        guestUser: submissionData.guestUserId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form', details: error.message },
      { status: 500 }
    );
  }
}
