import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export default function NotificationSettings() {
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <Card className='shadow-sm'>
      <CardHeader>
        <CardTitle className='text-xl'>Notifications</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between'>
          <Label>Email Notifications</Label>
          <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
        </div>
      </CardContent>
    </Card>
  );
}
