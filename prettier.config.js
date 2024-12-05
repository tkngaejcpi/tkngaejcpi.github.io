/** @type {import("prettier").Config */
const config = {
	plugins: ['prettier-plugin-astro'],

	trailingComma: 'all',
	semi: true,
	singleQuote: true,

	useTabs: true,
	tabWidth: 2,

	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};

export default config;
