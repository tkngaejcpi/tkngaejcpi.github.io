import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',

  schema: z.object({
    title: z.string(),
    cover: z.optional(z.string().url()),
    createdDate: z.date(),
    tags: z.array(z.string()),

    description: z.optional(z.string()),
  }),
});

export const collections = {
  posts,
};
