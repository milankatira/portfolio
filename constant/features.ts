import {
  // ChatBubbleIcon,
  PieChartIcon,
  ActivityIcon,
  RepeatIcon,
  Share2Icon,
  Edit,
} from 'lucide-react';

export const FEATURES = [
  {
    title: 'Advanced Customization',
    description:
      'Effortlessly deploy with just 2 lines of code with no technical expertise required.',
    icon: Edit,
    image: '/landing/customise_theme.png',
  },
  {
    title: 'Deploy and Collect',
    description:
      'Effortlessly deploy your feedback forms across various platforms. Start collecting valuable feedback instantly, with no technical expertise required.',
    icon: PieChartIcon,
    image: '/landing/collect.png',
  },
  {
    title: 'Real-Time Feedback',
    description:
      'Gather feedback instantly and act on it to keep your users engaged.',
    icon: ActivityIcon,
    image: '/landing/nps.png',
  },
  {
    title: 'Seamless Collaboration',
    description:
      'Share insights across teams and collaborate effectively to implement solutions.',
    icon: Share2Icon,
    image: '/landing/integration.png',
  },
  {
    title: 'Automated Feedback Loops',
    description:
      'Close the loop with users by automating responses and follow-ups.',
    icon: RepeatIcon,
    image: '/landing/automation.png',
  },
];
