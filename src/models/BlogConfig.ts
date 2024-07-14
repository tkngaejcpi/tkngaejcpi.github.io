import { slide, fade } from 'astro:transitions';

export interface BlogConfig {
  site: string;

  title: string;
  subtitleLines: string[];
  description: string;

  author: string;

  dateLocale: Parameters<typeof Date.prototype.toLocaleDateString>[0];
  dateOption: Parameters<typeof Date.prototype.toLocaleDateString>[1];

  slideTransition: ReturnType<typeof slide>;
  fadeTransition: ReturnType<typeof fade>;
}

export const defaultBlogConfig: BlogConfig = {
  site: 'https://blog.rileycki.com',

  title: '廢話集散空間',
  subtitleLines: ['最好沒有人明白我說什麼', '只有你聽懂我想什麼'],
  description: '什麼都可能寫，喜歡也好，不喜歡也好。',

  author: 'Riley Chang',

  dateLocale: 'zh-TW',
  dateOption: { year: 'numeric', month: 'long', day: 'numeric' },

  slideTransition: slide({ duration: 150 }),
  fadeTransition: fade({ duration: 300 }),
};
