import type { CollectionEntry } from 'astro:content';

import { blogConfig } from '@config/blog';

import { useFetchData } from '@utils/hooks';

import type { Mention, MentionResponse } from './type';

type Slug = CollectionEntry<'posts'>['slug'];

/**
 * @description react hook, takes slug,
 * returns the state of `Mention[]` and a refetch trigger.
 */
export const useWebMention = (slug: Slug) =>
	useFetchData<Mention[]>(
		[],
		`https://webmention.io/api/mentions.jf2?target=https://${blogConfig.site}/posts/${slug}/`,
		(res) => res.json().then((res) => (res as MentionResponse).children),
	);
