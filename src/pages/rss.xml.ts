import rss from '@astrojs/rss';

import { getCollection } from 'astro:content';

import sanitizeHtml from 'sanitize-html';

import { config } from '@config';

export const GET = async (context) => {
	const posts = import.meta.glob('../data/posts/**/*.md', { eager: true });

	const postIds = Object.keys(posts);
	const strip = (postId: string) => postId.slice(14, postId.length - 3);

	return rss({
		title: config.name,
		description: config.name,
		site: context.site,

		stylesheet: '/rss.xsl',
		trailingSlash: false,

		items: await Promise.all(
			postIds.map(async (postId) => {
				const { title, createdDate } = posts[postId].frontmatter as {
					title: string;
					createdDate: Date;
				};

				return {
					title,
					pubDate: createdDate,
					link: `/posts/${strip(postId)}`,
					content: sanitizeHtml(await posts[postId].compiledContent()),
				};
			}),
		),
	});
};
