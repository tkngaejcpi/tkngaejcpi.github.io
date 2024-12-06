import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const GET = async (context) => {
	const posts = await getCollection('posts');

	return rss({
		title: '枯之隨筆',
		description: '枯之隨筆',
		site: context.site,

		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.createdDate,
			link: `/posts/${post.id}`,
		})),
	});
};
