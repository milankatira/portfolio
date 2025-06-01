/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import prisma from '@/lib/prisma';
import axios from 'axios';
import { fetchCurrentUser } from './auth.action';

interface SlackAuthInfo {
  appId: string;
  authedUserId: string;
  authedUserToken: string;
  slackAccessToken: string;
  botUserId: string;
  teamId: string;
  teamName: string;
}

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}

export async function storeSlackUserInfo(auth: SlackAuthInfo) {
  if (!auth.slackAccessToken) return;

  // Check if the Slack account already exists
  const existingSlackAccount = await prisma.slack.findFirst({
    where: { slackAccessToken: auth.slackAccessToken },
    include: { connections: true },
  });

  const user = await fetchCurrentUser();

  // If the Slack account doesn't exist, create it
  if (!existingSlackAccount) {
    return await prisma.slack.create({
      data: {
        userId: user.id,
        appId: auth.appId,
        authedUserId: auth.authedUserId,
        authedUserToken: auth.authedUserToken,
        slackAccessToken: auth.slackAccessToken,
        botUserId: auth.botUserId,
        teamId: auth.teamId,
        teamName: auth.teamName,
        connections: {
          create: {
            userId: user.id,
            type: 'Slack',
          },
        },
      },
    });
  }

  return existingSlackAccount;
}
