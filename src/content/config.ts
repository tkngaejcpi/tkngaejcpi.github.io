import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	type: 'content',

	schema: z.object({
		title: z.string(),
		description: z.string(),
		cover: z.string().url(),
		mastodonRepost: z.optional(z.string().url()),

		createdDate: z.date(),
	}),
});

export const collections = {
	posts,
};
