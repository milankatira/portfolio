import { cn } from '@/lib/utils';
import React from 'react';

interface BugIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export const BugIcon: React.FC<BugIconProps> = ({
  width = 66,
  height = 66,
  className = '',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      className={cn(
        'text-muted-foreground transition-colors duration-200',
        className
      )}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.67 5.5a5 5 0 0 1 8.66 0L17.2 7H6.8l.869-1.5h.001Z'
        className='duoicon-primary-layer'
      />
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.553 6.106a1 1 0 0 1 1.341.447c.147.293.5.674.973.99C6.353 7.867 6.781 8 7 8h10c.219 0 .647-.133 1.133-.457.474-.316.826-.697.973-.99a1 1 0 1 1 1.788.894c-.353.707-1 1.326-1.652 1.76a5.464 5.464 0 0 1-.966.516c.297.731.503 1.496.616 2.277H21a1 1 0 1 1 0 2h-2.012a9.993 9.993 0 0 1-.74 3.327c.572.33.963.86 1.209 1.35.349.725.534 1.518.543 2.323a1 1 0 1 1-2 0c0-.374-.101-.966-.332-1.428-.13-.26-.26-.409-.385-.49-1.056 1.486-2.539 2.54-4.283 2.835V13a1 1 0 1 0-2 0v8.917c-1.744-.295-3.227-1.35-4.283-2.834-.126.08-.255.23-.385.49-.21.447-.323.933-.332 1.427a1 1 0 1 1-2 0 5.496 5.496 0 0 1 .543-2.322c.246-.492.637-1.02 1.209-1.35A9.998 9.998 0 0 1 5.012 14H3a1 1 0 1 1 0-2h2.108c.113-.781.32-1.546.616-2.277a5.464 5.464 0 0 1-.966-.516c-.651-.434-1.3-1.053-1.652-1.76a1 1 0 0 1 .447-1.341Z'
        className='duoicon-secondary-layer'
        opacity='.3'
      />
    </svg>
  );
};

export default BugIcon;
