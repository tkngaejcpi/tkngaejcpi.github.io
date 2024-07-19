import rss from '@astrojs/rss';

import { getCollection } from 'astro:content';

export const GET = async () => {
	const posts = await getCollection('posts');

	return rss({
		title: '廢話集散空間',
		description: '什麼都可能寫，喜歡也好，不喜歡也好。',
		site: 'https://blog.rileycki.com',

		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.createdDate,
			description: post.data.description,

			link: `/posts/${post.slug}/`,
		})),
	});
};
