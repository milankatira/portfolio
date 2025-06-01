import { DiscordIcon } from '../icons/DiscordIcon';
import { SlackIcon } from '../icons/SlackIcon';
import { GmailIcon } from '../icons/GmailIcon';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';

export const AutomationCard = () => {
  return (
    <Card className='p-4 space-y-4'>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-medium'>Automations</h4>
        <Button variant='outline' size='sm'>
          + Add Workflow
        </Button>
      </div>

      <div className='space-y-3'>
        <div className='flex items-center justify-between p-3 border rounded-lg'>
          <div className='flex items-center gap-3'>
            <SlackIcon />
            <div>
              <h5 className='text-sm font-medium'>Notify Slack on Feedback</h5>
              <p className='text-xs text-muted-foreground'>
                Send notification when feedback is submitted
              </p>
            </div>
          </div>
          <Switch />
        </div>

        <div className='flex items-center justify-between p-3 border rounded-lg'>
          <div className='flex items-center gap-3'>
            <DiscordIcon />
            <div>
              <h5 className='text-sm font-medium'>
                Notify Discord on Bug Report
              </h5>
              <p className='text-xs text-muted-foreground'>
                Send notification when bug is reported
              </p>
            </div>
          </div>
          <Switch />
        </div>

        <div className='flex items-center justify-between p-3 border rounded-lg'>
          <div className='flex items-center gap-3'>
            <GmailIcon />
            <div>
              <h5 className='text-sm font-medium'>Email Notifications</h5>
              <p className='text-xs text-muted-foreground'>
                Send email notifications for feedback submissions
              </p>
            </div>
          </div>
          <Switch />
        </div>
      </div>
    </Card>
  );
};
