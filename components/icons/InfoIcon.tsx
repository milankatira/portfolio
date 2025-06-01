import React from 'react';
import { cn } from '@/lib/utils';

interface InfoIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export const InfoIcon: React.FC<InfoIconProps> = ({
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
        d='M12 1.999c5.524 0 10.002 4.478 10.002 10.002 0 5.523-4.478 10.001-10.002 10.001-5.524 0-10-4.478-10-10.001C1.999 6.477 6.476 1.999 12 1.999Z'
        className='duoicon-secondary-layer'
        opacity='.3'
      />
      <path
        fill='currentColor'
        d='M12.001 6.5a1.252 1.252 0 1 0 .002 2.503A1.252 1.252 0 0 0 12 6.5h.001Zm-.005 3.749a1 1 0 0 0-.992.885l-.007.116.004 5.502.006.117a1 1 0 0 0 1.987-.002L13 16.75l-.004-5.501-.007-.117a1 1 0 0 0-.994-.882l.001-.001Z'
        className='duoicon-primary-layer'
      />
    </svg>
  );
};

export default InfoIcon;
