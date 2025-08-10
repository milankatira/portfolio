import { NextRequest, NextResponse } from "next/server";
import { SitemapStream, streamToPromise } from "sitemap";
import { createGzip } from "zlib";
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

export async function GET(req: NextRequest) {
  const smStream = new SitemapStream({
    hostname: "https://milankatira.vercel.app",
  });
  const pipeline = smStream.pipe(createGzip());

  smStream.write({ url: "/", changefreq: "yearly", priority: 1 });
  smStream.write({ url: "/blog", changefreq: "weekly", priority: 0.5 });

  const res = await fetch("https://www.milankatira.com/api/blog");
  const blogs: BlogPost[] = await res.json();

  for (const blog of blogs) {
    smStream.write({
      url: `/blog/${blog.slug || toSlug(blog.title)}`,
      changefreq: "weekly",
      priority: 0.8,
    });
  }

  for (const project of Projects) {
    smStream.write({
      url: `/project-details/${project.slug}`,
      changefreq: "monthly",
      priority: 0.7,
    });
  }

  smStream.end();

  const sitemap = await streamToPromise(pipeline);
  const resSitemap = new NextResponse(sitemap);
  resSitemap.headers.set("Content-Type", "application/xml");
  resSitemap.headers.set("Content-Encoding", "gzip");

  return resSitemap;
}
