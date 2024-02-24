export const commonMetaData = ({
  name,
  desc,
  image,
  url,
}) => {
  return {
    metadataBase: new URL("https://milankatira.vercel.app"),
    title: name
      ? `${name} | milan katira`
      : "milan katira | Full-Stack Developer",
    description: desc,
    authors: [
      {
        name: "milan katira",
        url: "https://milankatira.vercel.app/",
      },
    ],
    robots: "index, follow",
    alternates: {
      canonical: `https://milankatira.vercel.app${url}`,
      languages: {
        "en-US": "/",
      },
    },
    openGraph: {
      type: "website",
      url: `https://milankatira.vercel.app${url}`,
      title: name,
      description: desc,
      siteName: "Reetesh Kumar",
      images: [
        {
          url: image,
        },
      ],
    },
    assets: image,
    keywords: [
      "nextjs",
      "react",
      "typescript",
      "tailwindcss",
      "express",
      "nodejs",
      "mongodb",
      "mysql",
      "javascript",
      "docker",
      "github",
      "milan katira",
      "kubernetes",
      "solidity developer",
      "milan katira blog",
      "Full Stack Developer",
      "Web Developer",

    ],
  };
};
