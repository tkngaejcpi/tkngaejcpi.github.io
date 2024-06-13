import { getCollection, type CollectionEntry } from "astro:content";

type Article = CollectionEntry<'articles'>;

type Tag = Article['data']['tags'][0];

/**
 * @description Article Query, is used to query articles.
 * Notice that an Article Query should be created by constructors.
 */
export interface ArticleQuery {
    query: (articles: Article[]) => Article[]
}

/**
 * @description an Article Query, that return all the result
 */
export const idQuery: ArticleQuery = {
    query: (x) => x
}

/**
 * @description an Article Query constructor, that takes a tag,
 * and make an Article Query that return the articles that contains that tag.
 */
export const mkArticleQueryByTag = (tag: Tag): ArticleQuery => ({
    query: (articles) => articles.filter((article) => article.data.tags.includes(tag))
})

/**
 * @description an function that takes an Article Query, and async return the result.
 */
export const query = async (articleQuery: ArticleQuery): Promise<Article[]> => (articleQuery.query(await getCollection('articles')))