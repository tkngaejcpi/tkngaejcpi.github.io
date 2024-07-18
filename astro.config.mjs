import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.rileycki.com',

  integrations: [tailwind(), react(), mdx(), sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'ayu-dark',
      wrap: true,
    },
  },
});
