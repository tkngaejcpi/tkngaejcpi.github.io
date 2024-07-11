import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',

  schema: z.object({
    title: z.string(),
    cover: z.optional(z.string().url()),
    description: z.optional(z.string()),
    createdDate: z.date(),
  }),
});

export const collections = {
  posts,
};
