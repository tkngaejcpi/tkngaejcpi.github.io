/** @type {import("prettier").Config & import("@trivago/prettier-plugin-sort-imports").PluginConfig} */
const config = {
	plugins: [
		'@trivago/prettier-plugin-sort-imports',
		'prettier-plugin-astro',
		'prettier-plugin-tailwindcss',
	],

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

	/* prettier sort import settings */
	importOrder: [
		/* vite config */
		'^vite$',
		'^vite-',

		/* astro */
		'^astro',

		'^react$',
		'^react.+$',

		/* scope */
		'^@components/.+$',
		'^@config/.+$',
		'^@models/.+$',
		'^@utils/.+$',
		'^[./]',
	],
	importOrderSeparation: true,
};

export default config;
