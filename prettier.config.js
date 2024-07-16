/** @type {import("prettier").Config & import("@trivago/prettier-plugin-sort-imports").PluginConfig} */
const config = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
  ],

  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,

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
    /* for vite config */
    '^vite$',
    '^vite-',

    /* for astro */
    '^astro',

    /* for simple source */
    '^@components/.+$',
    '^@config/.+$',
    '^@models/.+$',
    '^@utils/.+$',
    '^[./]',
  ],
  importOrderSeparation: true,
};

export default config;
