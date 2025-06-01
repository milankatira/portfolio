// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
var blog = defineCollection({
  name: "Blog",
  directory: "src/content/blog",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    author: z.string(),
    publishedOn: z.string(),
    slug: z.string()
  })
});
var content_collections_default = defineConfig({
  collections: [blog]
});
export {
  content_collections_default as default
};
