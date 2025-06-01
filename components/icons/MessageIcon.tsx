import { cn } from '@/lib/utils';
import React from 'react';

interface MessageIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export const MessageIcon: React.FC<MessageIconProps> = ({
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
        d='M2 6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7.333L4 21.5c-.824.618-2 .03-2-1V6Z'
        className='duoicon-secondary-layer'
        opacity='.3'
      />
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8 12a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H8ZM7 9a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z'
        className='duoicon-primary-layer'
      />
    </svg>
  );
};

export default MessageIcon;
