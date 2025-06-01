import { defineCollection, defineConfig } from "@content-collections/core";

const blog = defineCollection({
  name: "Blog",
  directory: "src/content/blog",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    author: z.string(),
    publishedOn: z.string(),
    slug: z.string(),
  }),
});

export default defineConfig({
  collections: [blog],
});
