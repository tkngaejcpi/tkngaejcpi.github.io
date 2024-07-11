/** @type {import("prettier").Config & import("@trivago/prettier-plugin-sort-imports").PluginConfig} */
const config = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],

  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,

  /* prettier sort import settings */
  importOrder: [
    /* for vite config */
    '^vite$',
    '^vite-',

    /* for astro */
    '^astro',

    /* for simple source */
    '^@components/.+$',
    '^@models/.+$',
    '^@utils/.+$',
    '^[./]',
  ],
  importOrderSeparation: true,
};

export default config;
