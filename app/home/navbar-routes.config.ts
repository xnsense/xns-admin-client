import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'XNSENSE', menuType: MenuType.BRAND },
  { path: 'components', title: 'Components', menuType: MenuType.LEFT },
  { path: 'login', title: 'Logout', menuType: MenuType.RIGHT },
  { path: 'about', title: 'About Us', menuType: MenuType.RIGHT },
  { path: 'contact', title: 'Contact', menuType: MenuType.RIGHT }
];