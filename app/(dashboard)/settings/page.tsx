'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ThemeSettings from '@/components/Settings/ThemeSettings';
import NotificationSettings from '@/components/Settings/NotificationSettings';
import AccountActions from '@/components/Settings/AccountActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('theme');

  return (
    <div className='min-h-screen p-8 bg-background text-foreground'>
      <Card className='max-w-4xl mx-auto shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='theme'>Theme</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger>
              <TabsTrigger value='account'>Account</TabsTrigger>
            </TabsList>

            <TabsContent value='theme'>
              <ThemeSettings />
            </TabsContent>

            <TabsContent value='notifications'>
              <NotificationSettings />
            </TabsContent>

            <TabsContent value='account'>
              <AccountActions />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
