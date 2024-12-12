export interface Config {
	name: string;

	locale: Intl.Locale;
}

export const config: Config = {
	name: '枯之隨筆',

	locale: new Intl.Locale('zh-HK'),
};
