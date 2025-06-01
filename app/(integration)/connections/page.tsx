'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { storeDiscordUserInfo } from '@/actions/discord.action';
import { storeSlackUserInfo } from '@/actions/slack.action';
import { toast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

const Page = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const {
    app_id = '',
    authed_user_id = '',
    authed_user_token = '',
    slack_access_token = '',
    bot_user_id = '',
    team_id = '',
    team_name = '',
    channel_id = '',
    webhook_id = '',
    webhook_name = '',
    webhook_url = '',
    guild_name = '',
    guild_id,
  } = props.searchParams || {};

  useEffect(() => {
    const connectAccounts = async () => {
      try {
        // Store Slack user info
        await storeSlackUserInfo({
          appId: app_id,
          authedUserId: authed_user_id,
          authedUserToken: authed_user_token,
          slackAccessToken: slack_access_token,
          botUserId: bot_user_id,
          teamId: team_id,
          teamName: team_name,
        });

        // Store Discord user info
        await storeDiscordUserInfo({
          channelId: channel_id!,
          webhookId: webhook_id!,
          webhookName: webhook_name!,
          webhookUrl: webhook_url!,
          guildName: guild_name!,
          guildId: guild_id!,
        });

        // Show success toast
        toast({
          title: 'Accounts Connected',
          description: 'Your accounts have been successfully connected!',
          variant: 'default',
        });

        // Redirect to the dashboard
        router.push('/integration');
      } catch (error) {
        // Show error toast
        toast({
          title: 'Connection Failed',
          description:
            'There was an error connecting your accounts. Please try again.',
          variant: 'destructive',
        });

        console.error('Failed to connect accounts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    connectAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className='flex w-full flex-1 items-center justify-center h-screen px-4'>
        <div className='relative z-10 flex -translate-y-1/2 flex-col items-center gap-6 text-center'>
          <LoadingSpinner size='md' />
          <h1>Connecting your accounts...</h1>
          <p className='text-base/7 text-gray-600 max-w-prose'>
            Please wait while we connect your accounts.
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default Page;
