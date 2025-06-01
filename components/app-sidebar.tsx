'use client';
import {
  BarChart2,
  ChevronUp,
  Home,
  MessageSquare,
  Settings,
  LogOut,
  Zap,
  Layers,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Updated Menu Items with Automation and Integration
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Feedback',
    url: '/feedback',
    icon: MessageSquare,
  },
  {
    title: 'Insight',
    url: '/insight',
    icon: BarChart2,
  },
  {
    title: 'Automation',
    url: '/automation',
    icon: Zap,
  },
  {
    title: 'Integration',
    url: '/integration',
    icon: Layers,
  },
  // {
  //   title: 'Subscription',
  //   url: '/subscription',
  //   icon: Zap,
  // },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

// Add this near the top of the component
export function AppSidebar() {
  const router = useRouter();
  const { signOut } = useClerk();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Add this line

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

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='pb-10 mt-4'>
            <Link
              href='/'
              className='flex items-center gap-2 transition-colors py-20'
            >
              <div className='flex flex-col'>
                <span className='font-bold text-base bg-primary bg-clip-text text-transparent'>
                  FeedSpark
                </span>
              </div>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className='flex items-center space-x-2'
                    >
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <UserButton />
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                className='w-[--radix-popper-anchor-width]'
              >
                <DropdownMenuItem>
                  <Link href='/settings' className='w-full'>
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link href='/billing' className='w-full'>
                    Billing
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <button
                    className='text-red-500 flex items-center w-full'
                    onClick={() => {
                      setDropdownOpen(false);
                      setOpen(true);
                    }}
                  >
                    <LogOut size={16} className='mr-2' />
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Confirm Logout</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to logout?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className='space-x-2'>
                  <Button variant='outline' onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant='default'
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
