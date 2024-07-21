import { fade } from 'astro:transitions';

import { type BlogConfig } from './type';

export const blogConfig: BlogConfig = {
	site: 'blog.rileycki.com',

	title: '廢話集散空間',
	subtitleLines: ['最好沒有人明白我說什麼', '只有你聽懂我想什麼'],
	description: '什麼都可能寫，喜歡也好，不喜歡也好。',

	author: 'Riley Chang',
	mastodon: '@rileycki@c7.io',
	github: 'tkngaejcpi',

	dateLocale: 'zh-TW',
	dateOption: { year: 'numeric', month: 'long', day: 'numeric' },

	transition: fade({ duration: 300 }),
};
