import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import DynamicBreadcrumb from '@/components/ui/dynamic-breadcrumb';
import { ClerkProvider } from '@clerk/nextjs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className='w-screen'>
          <div className='flex flex-row items-center gap-4 ml-2  w-full'>
            <SidebarTrigger />
            <DynamicBreadcrumb />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </ClerkProvider>
  );
}
