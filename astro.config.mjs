// @ts-check
import { defineConfig } from 'astro/config';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	site: 'https://tkngaejcpi.github.io',

	integrations: [],

	markdown: {
		syntaxHighlight: false,

		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},
});
