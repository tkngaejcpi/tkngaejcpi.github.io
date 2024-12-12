import { getCollection, type CollectionEntry } from 'astro:content';

import {
	type Opr,
	id as _id,
	map,
	mergeOprs,
	pipe,
	take,
	unique,
} from '@utils/functional';

type Post = CollectionEntry<'posts'>;
export type PostFilter = Opr<Post[]>;

export const id: PostFilter = _id;

export const filterByTag: (tag: string) => PostFilter = (tag) => (posts) =>
	posts.filter((post) => post.data.tags.includes(tag));

export const filterByYearMonth: (year: number, month: number) => PostFilter =
	(year, month) => (posts) =>
		posts.filter(
			({ data: { createdDate } }) =>
				year == createdDate.getFullYear() && month == createdDate.getMonth(),
		);

export const sortByDate: PostFilter = (posts) =>
	posts.sort(
		(b, a) => a.data.createdDate.getTime() - b.data.createdDate.getTime(),
	);

export const limit: (n: number) => PostFilter = (n) => (posts) =>
	take<Post>(n)(posts);

export const mkFilterSeq: (...postFilters: PostFilter[]) => PostFilter =
	mergeOprs;

export const queryUniqueYearMonths = async () =>
	pipe(
		await getCollection('posts'),
		map(
			({ data: { createdDate } }) =>
				[createdDate.getFullYear(), createdDate.getMonth()] as [number, number],
		),
		unique(
			([yearA, monthA], [yearB, monthB]) => yearA == yearB && monthA == monthB,
		),
	);
