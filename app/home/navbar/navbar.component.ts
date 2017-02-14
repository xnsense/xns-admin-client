import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ROUTES } from './navbar-routes.config';
import { MenuType } from './navbar.metadata';
import { XnsService } from '../../api/xns.service';

@Component({
  moduleId: module.id,
  selector: 'xns-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: [ 'navbar.component.css' ]
})
export class NavbarComponent implements OnInit {
  public menuItems: any[];
  public brandMenu: any;
  isCollapsed = true;
  public isLoggedIn:boolean = false;
  

  constructor(private _service: XnsService) {
    this._service.onLogin.asObservable().subscribe(loggedIn => {
      this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND && (menuItem.anonymous != loggedIn));  
    });
  }

  ngOnInit() {
    this.isLoggedIn = this._service.isLoggedIn();
    this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND && (menuItem.anonymous != this._service.isLoggedIn()));
    this.brandMenu = ROUTES.filter(menuItem => menuItem.menuType === MenuType.BRAND)[0];
    this._service.onLogin.subscribe(v => {
      if (v) {
        this.isLoggedIn = true;
      }
    });
  }

  public get menuIcon(): string {
    return this.isCollapsed ? '☰' : '✖';
  }

  public getMenuItemClasses(menuItem: any) {
    return {
      'pull-xs-right': this.isCollapsed && menuItem.menuType === MenuType.RIGHT
    };
  }



}