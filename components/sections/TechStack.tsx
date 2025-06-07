import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

interface TechItem {
  name: string;
  icon: string;
}

interface TechStackProps {
  items: TechItem[];
}


// Front-End Tech
const frontEndTech = [
  { name: "HTML", slug: "html5" },
  { name: "CSS", slug: "css3" },
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "NextJS", slug: "nextdotjs" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Bootstrap", slug: "bootstrap" },
];

// Dev Tools
const devTools = [
  // Version Control & Collaboration
  { name: "Git", slug: "git" },
  { name: "Github", slug: "github" },

  // API & Backend Services
  { name: "Postman", slug: "postman" },
  { name: "Supabase", slug: "supabase" },
  { name: "Appwrite", slug: "appwrite" },

  // UI & Design
  { name: "Figma", slug: "figma" },
  { name: "Shadcn UI", slug: "shadcnui" },

  // Development & Tooling
  { name: "Vite", slug: "vite" },
  { name: "Docker", slug: "docker" },
  { name: "Sentry", slug: "sentry" },

  // Databases & ORM
  { name: "Prisma", slug: "prisma" },
  { name: "Drizzle ORM", slug: "drizzle" },

  // Payment Gateways
  { name: "Stripe", slug: "stripe" },
];

const frontEndIcons = frontEndTech.map((tech) => ({
  ...tech,
  icon: `https://cdn.simpleicons.org/${tech.slug}`,
}));

const devToolsIcons = devTools.map((tech) => ({
  ...tech,
  icon: `https://cdn.simpleicons.org/${tech.slug}`,
}));

const StackList: React.FC<TechStackProps> = ({ items }) => (
  <>
    <Marquee className="py-6 bg-white dark:bg-black-100" pauseOnHover={false}>
      <div className="flex gap-8">
        {items.map((tech, i) => (
          <div key={i} className="relative group text-center">
            <div
              className="w-20 border h-20 bg-gradient-to-b rounded-2xl p-6 transition-all duration-300
                        hover:scale-110 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]
                        flex items-center justify-center"
            >
              <Image
                src={tech.icon}
                alt={`${tech.name} logo`}
                width={55}
                height={55}
                loading="lazy"
              />
            </div>
            <span className="text-sm whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </div>
    </Marquee>

    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black-100"></div>
    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black-100"></div>
  </>
);

const TechStack = () => {
  return (
    <div className="relative " >
      <StackList items={frontEndIcons} />
      <StackList items={devToolsIcons} />
    </div>
  );
};

export default TechStack;
