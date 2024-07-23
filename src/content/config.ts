import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	type: 'content',

	schema: z.object({
		title: z.string(),
		description: z.string(),
		createdDate: z.date(),

		cover: z.string().url(),
		coverHeight: z.number(),
		coverWidth: z.number(),

		mastodonRepost: z.optional(z.string().url()),
	}),
});

export const collections = {
	posts,
};
