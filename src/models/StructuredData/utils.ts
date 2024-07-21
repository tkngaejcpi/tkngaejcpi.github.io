import type { CollectionEntry } from 'astro:content';

import { blogConfig } from '@config/blog';

import type { ArticleStructuredData } from './type';

/**
 * @description constructor of `ArticleStructuredData`
 */
export const mkArticleStructuredData: (
	post: CollectionEntry<'posts'>,
) => ArticleStructuredData = (post) => ({
	'@context': 'https://schema.org',
	'@type': 'Article',

	headline: post.data.title,
	image: post.data.cover ? [post.data.cover] : [],

	datePublished: post.data.createdDate.toISOString(),

	author: [
		{
			'@type': 'Person',
			name: blogConfig.author,
			url: `https://${blogConfig.site}`,
		},
	],
});
