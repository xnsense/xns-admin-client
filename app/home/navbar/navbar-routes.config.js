"use strict";
var navbar_metadata_1 = require("./navbar.metadata");
exports.ROUTES = [
    { path: '', title: 'XNSENSE', menuType: navbar_metadata_1.MenuType.BRAND, anonymous: true },
    { path: 'components', title: 'Components', menuType: navbar_metadata_1.MenuType.LEFT, anonymous: false },
    { path: 'login', title: 'Logout', menuType: navbar_metadata_1.MenuType.RIGHT, anonymous: false },
    { path: 'login', title: 'Login', menuType: navbar_metadata_1.MenuType.RIGHT, anonymous: true }
];
//# sourceMappingURL=navbar-routes.config.js.map