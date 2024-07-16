import type { TransitionDirectionalAnimations } from 'astro';

export interface BlogConfig {
  site: string;

  title: string;
  subtitleLines: string[];
  description: string;

  author: string;

  dateLocale: Parameters<typeof Date.prototype.toLocaleDateString>[0];
  dateOption: Parameters<typeof Date.prototype.toLocaleDateString>[1];

  transition: TransitionDirectionalAnimations;
}
