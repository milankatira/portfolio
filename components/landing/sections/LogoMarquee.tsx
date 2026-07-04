import type { IconType } from 'react-icons';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiTailwindcss,
  SiPrisma,
  SiStripe,
  SiPostgresql,
  SiVercel,
} from 'react-icons/si';
import { Marquee } from '@/components/magicui/marquee';

interface Tool {
  label: string;
  Icon: IconType;
}

const tools: Tool[] = [
  { label: 'Next.js', Icon: SiNextdotjs },
  { label: 'React', Icon: SiReact },
  { label: 'TypeScript', Icon: SiTypescript },
  { label: 'Node.js', Icon: SiNodedotjs },
  { label: 'MongoDB', Icon: SiMongodb },
  { label: 'Redis', Icon: SiRedis },
  { label: 'PostgreSQL', Icon: SiPostgresql },
  { label: 'Prisma', Icon: SiPrisma },
  { label: 'Docker', Icon: SiDocker },
  { label: 'Tailwind CSS', Icon: SiTailwindcss },
  { label: 'Stripe', Icon: SiStripe },
  { label: 'Vercel', Icon: SiVercel },
];

export function LogoMarquee() {
  return (
    <section className="relative border-y border-white/[0.06] py-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
          Tools I build with
        </p>
        <div className="relative">
          <Marquee pauseOnHover className="[--duration:34s] [--gap:3.5rem]">
            {tools.map(({ label, Icon }) => (
              <div key={label} className="flex items-center" title={label}>
                <Icon
                  aria-label={label}
                  className="h-7 w-7 shrink-0 text-white/40 transition-colors duration-300 hover:text-white md:h-8 md:w-8"
                />
              </div>
            ))}
          </Marquee>
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black-100 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black-100 to-transparent" />
        </div>
      </div>
    </section>
  );
}
