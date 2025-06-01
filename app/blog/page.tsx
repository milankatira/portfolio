import axios from 'axios';
import React from 'react'

export default async function BlogListPage() {
  const response = await axios.get("https://milankatira.vercel.app/api/blog");
  const blogs = response.data;

  return (
    <div>
      {blogs.map((blog: any) => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
        </div>
      ))}
    </div>
  );
}

export async function generateStaticParams() {
  const response = await axios.get("https://milankatira.vercel.app/api/blog");
  const blogs = response.data;
  return blogs.map((blog: any) => ({
    slug: blog.slug || blog._id,
  }));
}
