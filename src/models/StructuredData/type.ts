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
 * @description any structured data
 */
export type StructuredData = ArticleStructuredData;
