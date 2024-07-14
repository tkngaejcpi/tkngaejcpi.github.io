import type { CollectionEntry } from 'astro:content';

import type { BlogConfig } from '@models/BlogConfig';

/**
 * @description custom structured data schema of article
 * @see https://developers.google.com/search/docs/appearance/structured-data/article?hl=zh-tw
 */
export interface ArticleStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Article';

  headline: string;
  image: string[];

  datePublished: string;

  author: {
    '@type': 'Person';
    name: string;
    url: string;
  }[];
}

/**
 * @description constructor of ArticleStructuredData
 */
export const mkArticleStructuredData: (
  blogConfig: BlogConfig,
) => (post: CollectionEntry<'posts'>) => ArticleStructuredData =
  (blogConfig) => (post) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',

    headline: post.data.title,
    image: post.data.cover ? [post.data.cover] : [],

    datePublished: post.data.createdDate.toISOString(),

    author: [
      {
        '@type': 'Person',
        name: blogConfig.author,
        url: blogConfig.site,
      },
    ],
  });

/**
 * @description any structured data
 */
export type StructuredData = ArticleStructuredData;
