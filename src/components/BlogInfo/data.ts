interface Navigation {
	emoji: string;
	description: string;
	location: string;
}

export const navigations: Navigation[] = [
	{ emoji: '🏡', description: '主頁', location: '/' },
	{ emoji: '🗃️', description: '歸檔', location: '/archive' },
	{ emoji: '🧐', description: '關於', location: '/about' },
];
