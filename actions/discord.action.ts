'use server';

import prisma from '@/lib/prisma';
import { fetchCurrentUser } from './auth.action';

interface DiscordAuthInfo {
  channelId: string;
  webhookId: string;
  webhookName: string;
  webhookUrl: string;
  guildName: string;
  guildId: string;
}

export async function storeDiscordUserInfo(auth: DiscordAuthInfo) {
  if (!auth.webhookId) return;
  const user = await fetchCurrentUser();

  // Check if the webhook exists for the user
  const existingWebhook = await prisma.discordWebhook.findFirst({
    where: { userId: user.id },
    include: {
      connections: {
        select: {
          type: true,
        },
      },
    },
  });

  // If no webhook exists for the user, create a new one
  if (!existingWebhook) {
    return await prisma.discordWebhook.create({
      data: {
        userId: user.id,
        webhookId: auth.webhookId,
        channelId: auth.channelId,
        guildId: auth.guildId,
        name: auth.webhookName,
        url: auth.webhookUrl,
        guildName: auth.guildName,
        connections: {
          create: {
            userId: user.id,
            type: 'Discord',
          },
        },
      },
    });
  }

  // If the webhook exists, check if it's already connected to the same channel
  const existingChannelWebhook = await prisma.discordWebhook.findUnique({
    where: {
      channelId: auth.channelId,
    },
    include: {
      connections: {
        select: {
          type: true,
        },
      },
    },
  });

  // If no webhook exists for the specific channel, create a new one
  if (!existingChannelWebhook) {
    return await prisma.discordWebhook.create({
      data: {
        userId: user.id,
        webhookId: auth.webhookId,
        channelId: auth.channelId,
        guildId: auth.guildId,
        name: auth.webhookName,
        url: auth.webhookUrl,
        guildName: auth.guildName,
        connections: {
          create: {
            userId: user.id,
            type: 'Discord',
          },
        },
      },
    });
  }

  return existingWebhook;
}
