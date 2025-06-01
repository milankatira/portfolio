import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import Container from '../global/container';
import Icons from '../global/icons';
import { Button } from '../ui/button';
import Ripple from '../ui/ripple';
import Images from '../global/images';
import GradientText from '../ui/GradientText';

const WORKFLOW_PLATFORMS = [
  {
    icon: Icons.discord,
    position: 'left-3',
    size: 'small',
    iconSize: 'small',
    className: ' flex',
  },
  { icon: Icons.slack, position: 'left-2', size: 'medium', iconSize: 'medium' },
  {
    icon: Icons.gmail,
    position: 'right-2',
    size: 'medium',
    iconSize: 'medium',
  },
];

const Integration = () => {
  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'left-3':
        return '-translate-x-[285px]';
      case 'left-2':
        return '-translate-x-[210px]';
      case 'right-2':
        return 'translate-x-[210px]';
      default:
        return '';
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'medium':
        return 'size-16';
      case 'small':
        return 'size-12';
      default:
        return 'size-16';
    }
  };

  return (
    <div className='relative flex flex-col items-center justify-center w-full py-20'>
      {/* Text Section */}
      <div className='flex flex-col items-center text-center max-w-3xl mx-auto lg:absolute lg:top-1/4 inset-x-0 mt-12 lg:mt-0'>
        <GradientText
          className='text-2xl md:text-4xl lg:text-6xl font-heading font-semibold !leading-snug'
          element='H2'
        >
          Workflow Integration
        </GradientText>

        <p className='text-base md:text-lg text-accent-foreground/80 mt-4'>
          Seamlessly integrate with Discord, Slack, Gmail, and other tools to
          streamline your workflow.
        </p>
      </div>

      {/* CTA Button */}
      <div className='flex flex-col items-center text-center max-w-3xl mx-auto lg:absolute lg:bottom-1/4 inset-x-0 z-20 mt-8 lg:mt-0'>
        <Link href='#'>
          <Button size='lg'>
            See All Integrations
            <ArrowRightIcon className='size-4' />
          </Button>
        </Link>
      </div>

      {/* Workflow Icons */}
      <Container delay={0.3}>
        <div className='relative hidden lg:flex items-center justify-center overflow-visible'>
          <div className='absolute top-1/2 -translate-y-1/2 right-1/4 w-3/5 h-14 lg:h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full -rotate-12 blur-[6.5rem] -z-10'></div>

          <div className='relative flex h-dvh w-full flex-col items-center justify-center overflow-visible'>
            <Ripple />
          </div>

          <div className='absolute z-20 flex items-center justify-center group'>
            <Images.logo className='size-24 group-hover:scale-110 transition-all duration-500' />
          </div>

          {WORKFLOW_PLATFORMS.map((platform, index) => (
            <div
              key={index}
              className={cn(
                'absolute z-20 size-16 p-3 rounded-full flex items-center justify-center bg-gradient-to-b from-foreground/5 to-transparent shadow-xl shadow-black/10 backdrop-blur-lg transition-all duration-300 hover:scale-110',
                getPositionClasses(platform.position),
                getSizeClasses(platform.size),
                platform.className
              )}
            >
              <platform.icon />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Integration;
