// Single source of truth for the public site URL and identity used in SEO metadata.
// The live site serves on the apex domain (www redirects to it), so canonicals must too.
export const SITE_URL = 'https://milankatira.com';
export const SITE_NAME = 'Milan Katira';

export const SITE_TITLE = 'Milan Katira — Full-stack Engineer';
export const SITE_DESCRIPTION =
  'Milan Katira is a full-stack engineer (SDE-II at GoHighLevel) with 5+ years building scalable SaaS products, media infrastructure and developer tools with React, Next.js, Node.js and TypeScript.';

export const OG_IMAGE = `${SITE_URL}/og`;

export const PERSON = {
  name: 'Milan Katira',
  jobTitle: 'Full-stack Engineer (SDE-II)',
  worksFor: 'GoHighLevel',
  image: `${SITE_URL}/milan_katira.jpeg`,
  sameAs: [
    'https://github.com/milankatira',
    'https://www.linkedin.com/in/milan-katira/',
    'https://twitter.com/milankatira26',
    'https://www.npmjs.com/~milankatira',
  ],
  knowsAbout: [
    'Full-stack development',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'MongoDB',
    'PostgreSQL',
    'System design',
    'SaaS',
    'Developer tools',
  ],
};
