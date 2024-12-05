/**
 * @description internal, decide what locale is used.
 */
const locale = new Intl.Locale("zh-HK");

export const formatDate = (date: Date) => date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})