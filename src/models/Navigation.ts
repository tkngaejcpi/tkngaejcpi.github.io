export interface Navigation {
  emoji: string;
  description: string;
  location: string;
}

export const defaultNavigations: Navigation[] = [
  { emoji: '🏡', description: '主頁', location: '/' },
  { emoji: '🗃️', description: '歸檔', location: '/archive' },
  { emoji: '🤖', description: '關於我', location: '/about' },
  { emoji: '📡', description: 'RSS', location: '/rss.xml' },
];
