import type { BlogConfig } from '@models/BlogConfig';

export const mkLocaleDateString: (
	blogConfig: BlogConfig,
) => (date: Date) => string = (blogConfig) => (date) =>
	date.toLocaleDateString(blogConfig.dateLocale, blogConfig.dateOption);
