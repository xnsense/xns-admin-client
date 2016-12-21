import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'XNSENSE', menuType: MenuType.BRAND, anonymous: true },
  { path: 'components', title: 'Components', menuType: MenuType.LEFT, anonymous: false },
  { path: 'login', title: 'Logout', menuType: MenuType.RIGHT, anonymous: false },
  { path: 'login', title: 'Login', menuType: MenuType.RIGHT, anonymous: true }
];