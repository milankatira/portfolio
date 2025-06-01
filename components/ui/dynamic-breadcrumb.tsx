'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const DynamicBreadcrumb: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb className='mt-2'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;

          const formattedSegment = segment.replace(/[\[\]]/g, '');

          return (
            <div key={href} className='flex items-center'>
              <BreadcrumbSeparator />

              {isLast ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {capitalize(formattedSegment)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={href}>{capitalize(formattedSegment)}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
