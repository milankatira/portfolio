'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import {
  findConnectionByUserId,
  addEmailConnection,
  removeEmailConnection,
} from '@/actions/connection.action';
import { Loader2, Mail, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ConnectionsPage() {
  const { toast } = useToast();
  const [connections, setConnections] = useState({
    discord: false,
    slack: false,
    emails: [] as { id: string; email: string }[],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [newEmail, setNewEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchConnections() {
    try {
      setLoading(true);
      const data = await findConnectionByUserId();

      if (Array.isArray(data)) {
        const emailConnections = data
          .filter((conn) => conn.type === 'Email')
          .map((conn) => ({ id: conn.id, email: conn.email || '' }));

        setConnections({
          discord: data.some((conn) => conn.type === 'Discord'),
          slack: data.some((conn) => conn.type === 'Slack'),
          emails: emailConnections,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load connections',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleAddEmail = async () => {
    if (!newEmail || !newEmail.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await addEmailConnection(newEmail);
      setConnections((prev) => ({
        ...prev,
        emails: [...prev.emails, { id: result.id, email: result.email || '' }],
      }));
      setNewEmail('');
      setIsDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Email has been added successfully',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add email',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveEmail = async (id: string) => {
    try {
      await removeEmailConnection(id);
      setConnections((prev) => ({
        ...prev,
        emails: prev.emails.filter((email) => email.id !== id),
      }));
      toast({
        title: 'Success',
        description: 'Email has been removed successfully',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove email',
        variant: 'destructive',
      });
    }
  };

  const integrations = [
    {
      name: 'Discord',
      description: 'Connect your Discord to send notifications and messages.',
      isConnected: connections.discord,
      icon: 'https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png',
    },
    {
      name: 'Slack',
      description: 'Use Slack to send notifications to team members.',
      isConnected: connections.slack,
      icon: 'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png',
    },
    {
      name: 'Email',
      description: 'Add email addresses for notification delivery.',
      isConnected: connections.emails.length > 0,
      icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
    },
  ];

  return (
    <div className='w-full mx-auto py-10 px-4'>
      {/* Header Section */}
      <div className='space-y-2 mb-8'>
        <h1 className='text-4xl font-bold tracking-tight'>Integrations</h1>
        <p className='text-lg text-muted-foreground'>
          Connect and manage your integrations to streamline your workflow.
        </p>

        <Separator />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Integrations */}
        <div className='lg:col-span-2 space-y-6'>
          <div className='bg-card rounded-xl border shadow-sm'>
            <div className='p-6 border-b'>
              <h2 className='text-xl font-semibold'>Available Integrations</h2>
              <p className='text-sm text-muted-foreground mt-1'>
                Connect your favorite tools and services
              </p>
            </div>

            <div className='p-6 space-y-4'>
              {loading ? (
                <div className='flex justify-center items-center py-20'>
                  <Loader2 className='animate-spin h-6 w-6 text-muted-foreground' />
                </div>
              ) : (
                integrations.map((integration, index) => (
                  <Card
                    key={index}
                    className='flex items-center justify-between p-4 transition-all hover:shadow-md'
                  >
                    <div className='flex items-center space-x-4'>
                      <div className='relative w-12 h-12 rounded-lg bg-background flex items-center justify-center border'>
                        <Image
                          src={integration.icon}
                          alt={`${integration.name} Logo`}
                          width={32}
                          height={32}
                          className='rounded-md'
                        />
                      </div>
                      <div>
                        <CardTitle className='text-lg font-medium'>
                          {integration.name}
                        </CardTitle>
                        <CardDescription className='text-sm mt-0.5'>
                          {integration.description}
                        </CardDescription>
                      </div>
                    </div>
                    {integration.name === 'Email' ? (
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant='default'
                            size='sm'
                            className='min-w-[100px]'
                          >
                            Add Email
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-md'>
                          <DialogHeader>
                            <DialogTitle>Add Email Notification</DialogTitle>
                            <DialogDescription>
                              Enter an email address to receive notifications
                              and updates.
                            </DialogDescription>
                          </DialogHeader>
                          <div className='grid gap-4 py-4'>
                            <div className='flex items-center gap-4'>
                              <Input
                                placeholder='name@example.com'
                                type='email'
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className='flex-1'
                              />
                              <Button
                                onClick={handleAddEmail}
                                disabled={!newEmail}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button
                        variant={
                          integration.isConnected ? 'outline' : 'default'
                        }
                        size='sm'
                        className='min-w-[100px]'
                        onClick={() => {
                          if (!integration.isConnected) {
                            const redirectUrl =
                              integration.name === 'Discord'
                                ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT
                                : process.env.NEXT_PUBLIC_SLACK_REDIRECT;
                            window.location.href = redirectUrl || '#';
                          }
                        }}
                      >
                        {integration.isConnected ? 'Connected' : 'Connect'}
                      </Button>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Connected Emails Sidebar */}
        <div className='space-y-6'>
          <div className='bg-card rounded-xl border shadow-sm'>
            <div className='p-6 border-b'>
              <h2 className='text-xl font-semibold'>Connected Emails</h2>
              <p className='text-sm text-muted-foreground mt-1'>
                Manage your notification emails
              </p>
            </div>
            <div className='p-6'>
              {connections.emails.length > 0 ? (
                <div className='space-y-3'>
                  {connections.emails.map((email) => (
                    <div
                      key={email.id}
                      className='flex items-center justify-between p-3 rounded-lg border bg-background/50 hover:bg-background transition-colors'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='p-2 rounded-md bg-primary/10'>
                          <Mail className='h-4 w-4 text-primary' />
                        </div>
                        <span className='text-sm font-medium'>
                          {email.email}
                        </span>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => handleRemoveEmail(email.id)}
                        className='hover:bg-destructive/10 hover:text-destructive'
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-6'>
                  <Mail className='h-12 w-12 text-muted-foreground/30 mx-auto mb-3' />
                  <p className='text-sm text-muted-foreground'>
                    No emails connected yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
