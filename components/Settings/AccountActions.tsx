import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

export default function AccountActions() {
  const { toast } = useToast();
  const router = useRouter();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: 'Logged out',
        description: 'You have successfully logged out.',
        variant: 'default',
      });
      router.push('/');
    } catch (_error) {
      toast({
        title: `Error ${_error}`,
        description: 'Failed to logout. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAccount = () => {
    toast({
      title: 'Account deleted',
      description: 'Your account has been permanently deleted.',
      variant: 'destructive',
    });
  };

  return (
    <Card className='shadow-sm'>
      <CardHeader>
        <CardTitle className='text-xl'>Account Actions</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Logout Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='outline'
              className='w-full flex items-center gap-2'
            >
              <LogOut className='h-4 w-4' /> Logout
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to logout?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='space-x-2'>
              <Button variant='outline' onClick={() => {}}>
                Cancel
              </Button>
              <Button variant='default' onClick={handleLogout}>
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Account Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='destructive'
              className='w-full flex items-center gap-2'
            >
              <Trash2 className='h-4 w-4' /> Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Confirm Delete Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='space-x-2'>
              <Button variant='outline' onClick={() => {}}>
                Cancel
              </Button>
              <Button variant='destructive' onClick={handleDeleteAccount}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
