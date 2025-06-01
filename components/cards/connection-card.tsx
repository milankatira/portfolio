import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { DiscordIcon } from '../icons/DiscordIcon';
import { SlackIcon } from '../icons/SlackIcon';

export const ConnectionCard = () => {
  return (
    <Card className='p-4 space-y-4'>
      <h4 className='text-sm font-medium'>Connections</h4>
      <p className='text-xs text-muted-foreground'>
        Connect all your apps directly from here.
      </p>

      <div className='space-y-3'>
        <div className='flex items-center justify-between p-3 border rounded-lg'>
          <div className='flex items-center gap-3'>
            <DiscordIcon />
            <div>
              <h5 className='text-sm font-medium'>Discord</h5>
              <p className='text-xs text-muted-foreground'>
                Connect to send notifications
              </p>
            </div>
          </div>
          <Button variant='outline' size='sm'>
            Connected
          </Button>
        </div>

        <div className='flex items-center justify-between p-3 border rounded-lg'>
          <div className='flex items-center gap-3'>
            <SlackIcon />

            <div>
              <h5 className='text-sm font-medium'>Slack</h5>
              <p className='text-xs text-muted-foreground'>
                Connect to send notifications
              </p>
            </div>
          </div>
          <Button variant='outline' size='sm'>
            Connected
          </Button>
        </div>
      </div>
    </Card>
  );
};
