import { StaticImageData } from 'next/image';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  repoUrl: string;
  technologies: string[];
  category: ProjectCategory;
  features: string[];
}

export type ProjectCategory = 'frontend' | 'fullstack' | 'mobile' | 'design';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform with a responsive design, user authentication, product catalog, cart functionality, and payment processing.',
    image: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    category: 'fullstack',
    features: [
      'User authentication and authorization',
      'Product catalog with categories and filters',
      'Shopping cart and wishlist functionality',
      'Secure payment processing',
      'Order tracking and history',
      'Admin dashboard for inventory management'
    ]
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A task management application with drag-and-drop functionality, task categorization, deadline tracking, and team collaboration features.',
    image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'DnD Kit'],
    category: 'frontend',
    features: [
      'Drag-and-drop task organization',
      'Task categorization and tagging',
      'Deadline tracking with notifications',
      'Team collaboration and sharing',
      'Progress tracking and reporting',
      'Dark mode support'
    ]
  },
  {
    id: 'project-3',
    title: 'Fitness Tracking Mobile App',
    description: 'A cross-platform mobile application for tracking workouts, nutrition, and fitness goals with comprehensive analytics and progress visualization.',
    image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    technologies: ['React Native', 'TypeScript', 'Redux', 'Node.js', 'PostgreSQL'],
    category: 'mobile',
    features: [
      'Workout planning and tracking',
      'Nutrition logging and analysis',
      'Goal setting and progress tracking',
      'Custom workout creation',
      'Integration with fitness wearables',
      'Performance analytics and visualization'
    ]
  },
  {
    id: 'project-4',
    title: 'Social Media Dashboard',
    description: 'A comprehensive dashboard for managing social media accounts, analyzing engagement metrics, and scheduling posts across multiple platforms.',
    image: 'https://images.pexels.com/photos/5187131/pexels-photo-5187131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Node.js', 'MongoDB'],
    category: 'fullstack',
    features: [
      'Multi-platform social media management',
      'Post scheduling and automation',
      'Engagement analytics and reporting',
      'Audience demographic insights',
      'Content performance tracking',
      'Competitor analysis tools'
    ]
  },
  {
    id: 'project-5',
    title: 'Healthcare Portal UI Design',
    description: 'A comprehensive UI/UX design for a healthcare portal, focusing on accessibility, clear information hierarchy, and intuitive patient-doctor interactions.',
    image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    category: 'design',
    features: [
      'Patient dashboard and medical records',
      'Appointment scheduling system',
      'Telemedicine interface',
      'Medication tracking',
      'Doctor-patient messaging system',
      'Medical report visualization'
    ]
  },
  {
    id: 'project-6',
    title: 'Real Estate Listing Platform',
    description: 'A modern real estate platform with property listings, advanced search filters, virtual tours, and agent-client communication tools.',
    image: 'https://images.pexels.com/photos/7578986/pexels-photo-7578986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Google Maps API', 'AWS S3'],
    category: 'fullstack',
    features: [
      'Property search with advanced filters',
      'Interactive maps and neighborhood information',
      'Virtual property tours',
      'Appointment scheduling with agents',
      'Favoriting and comparison tools',
      'Property valuation calculator'
    ]
  }
];

export const skills = {
  frontend: [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'CSS/SASS', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Redux', level: 80 },
  ],
  backend: [
    { name: 'Node.js', level: 85 },
    { name: 'Express', level: 80 },
    { name: 'PostgreSQL', level: 75 },
    { name: 'MongoDB', level: 80 },
    { name: 'Firebase', level: 70 },
    { name: 'REST APIs', level: 85 },
  ],
  tools: [
    { name: 'Git', level: 85 },
    { name: 'Docker', level: 70 },
    { name: 'AWS', level: 65 },
    { name: 'CI/CD', level: 75 },
    { name: 'Jest', level: 80 },
    { name: 'Webpack', level: 70 },
  ],
  design: [
    { name: 'Figma', level: 75 },
    { name: 'Adobe XD', level: 65 },
    { name: 'UI/UX', level: 80 },
    { name: 'Responsive Design', level: 90 },
    { name: 'Wireframing', level: 85 },
    { name: 'Prototyping', level: 75 },
  ],
};