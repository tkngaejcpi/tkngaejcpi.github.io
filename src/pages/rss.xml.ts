import rss from '@astrojs/rss';

import { getCollection } from 'astro:content';

import { config } from '@config';

export const GET = async (context) => {
	const posts = await getCollection('posts');

	return rss({
		title: config.name,
		description: config.name,
		site: context.site,

		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.createdDate,
			link: `/posts/${post.id}`,
		})),
	});
};
