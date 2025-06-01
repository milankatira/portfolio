import * as React from 'react';

import { cn } from '@/lib/utils';

export type CodeProps = React.HTMLAttributes<HTMLPreElement>;

const Code = React.forwardRef<HTMLPreElement, CodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <pre
        ref={ref}
        className={cn(
          'mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted px-4 py-4 font-mono text-sm',
          className
        )}
        {...props}
      />
    );
  }
);
Code.displayName = 'Code';

export { Code };
