import { MetadataRoute } from "next";
import { Projects } from "@/data/projects";
import { toSlug } from "@/utils/slug";

interface BlogPost {
  _id: string;
  title: string;
  thumbnail: string;
  content: string;
  description?: string;
  date?: string;
  slug?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch("https://www.milankatira.com/api/blog");
  const blogs: BlogPost[] = await res.json();

  const blogUrls = blogs.map((blog) => ({
    url: `https://www.milankatira.com/blog/${blog.slug || toSlug(blog.title)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: 0.8,
  }));

  const projectUrls = Projects.map((project) => ({
    url: `https://www.milankatira.com/project-details/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://www.milankatira.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://www.milankatira.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...blogUrls,
    ...projectUrls,
  ];
}
