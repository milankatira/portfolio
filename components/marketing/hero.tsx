import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../global/container';
import Icons from '../global/icons';
import { Button } from '../ui/button';
import { OrbitingCircles } from '../ui/orbiting-circles';
import AnimatedShinyText from '../ui/animated-shiny-text';
import { cn } from '@/lib/utils';
import GradientText from '../ui/GradientText';

const Hero = () => {
  return (
    <div className='relative flex flex-col items-center justify-center w-full py-10'>
      <div className='absolute flex lg:hidden size-40 rounded-full bg-blue-500 blur-[10rem] top-0 left-1/2 -translate-x-1/2 -z-10'></div>

      <div className='flex flex-col items-center justify-center gap-y-8 relative'>
        <Container className='hidden lg:flex absolute inset-0 top-0 mb-auto flex-col items-center justify-center w-full min-h-screen -z-10'>
          <OrbitingCircles speed={0.5} radius={300}>
            <Icons.circle1 className='size-4 text-foreground/70' />
            <Icons.circle2 className='size-1 text-foreground/80' />
          </OrbitingCircles>
          <OrbitingCircles speed={0.25} radius={400}>
            <Icons.circle2 className='size-1 text-foreground/50' />
            <Icons.circle1 className='size-4 text-foreground/60' />
            <Icons.circle2 className='size-1 text-foreground/90' />
          </OrbitingCircles>
          <OrbitingCircles speed={0.1} radius={500}>
            <Icons.circle2 className='size-1 text-foreground/50' />
            <Icons.circle2 className='size-1 text-foreground/90' />
            <Icons.circle1 className='size-4 text-foreground/60' />
            <Icons.circle2 className='size-1 text-foreground/90' />
          </OrbitingCircles>
        </Container>

        <div className='flex flex-col items-center justify-center text-center gap-y-4'>
          <Container className='relative hidden lg:block overflow-hidden'>
            <div className='z-10 flex min-h-20 items-center justify-center'>
              <div
                className={cn(
                  'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
                )}
              >
                <AnimatedShinyText className='inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400'>
                  <span>✨ Introducing FeedSpark</span>
                  <ArrowRightIcon className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
                </AnimatedShinyText>
              </div>
            </div>
          </Container>
          <Container delay={0.15}>
            <GradientText
              className='text-4xl md:text-4xl lg:text-6xl font-bold text-center !leading-tight max-w-4xl mx-auto'
              element='H1'
            >
              Ignite Action from Feedback
            </GradientText>
          </Container>
          <Container delay={0.2}>
            <p className='max-w-xl mx-auto mt-2 text-base lg:text-lg text-center text-muted-foreground'>
              Turn user feedback into actionable insights to improve engagement
              and retention.
            </p>
          </Container>
          <Container delay={0.25} className='z-20'>
            <div className='flex items-center justify-center mt-6 gap-x-4'>
              <Link href='#' className='flex items-center gap-2 group'>
                <Button size='lg'>
                  Start Free Trial
                  <ArrowRightIcon className='size-4 group-hover:translate-x-1 transition-all duration-300' />
                </Button>
              </Link>
            </div>
          </Container>
          <Container delay={0.3} className='relative'>
            <div className='relative rounded-xl lg:rounded-[32px] border border-border p-2 backdrop-blur-lg mt-10 max-w-6xl mx-auto'>
              <div className='absolute top-1/8 left-1/2 -z-10 bg-gradient-to-r from-sky-500 to-blue-600 w-1/2 lg:w-3/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[4rem] lg:blur-[10rem] animate-image-glow'></div>
              <div className='hidden lg:block absolute -top-1/8 left-1/2 -z-20 bg-blue-600 w-1/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[10rem] animate-image-glow'></div>

              <div className='rounded-lg lg:rounded-[22px] border border-border bg-background'>
                <Image
                  src='/images/dashboard_main.png'
                  alt='dashboard'
                  width={1920}
                  height={1080}
                  className='rounded-lg lg:rounded-[20px]'
                  priority
                />
              </div>
            </div>
            <div className='bg-gradient-to-t from-background to-transparent absolute bottom-0 inset-x-0 w-full h-1/2'></div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Hero;
