import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() menuButtonClick = new EventEmitter();
  public menuItems: any[];
  public brandMenu: any;
  isCollapsed = true;

  constructor(private _service: XnsService) {
    this._service.onLogin.asObservable().subscribe(loggedIn => {
      this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND && (menuItem.anonymous != loggedIn));  
    });
  }

  menuClicked(event:any): void {
    event.preventDefault();
    this.menuButtonClick.emit();
  }
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND && (menuItem.anonymous != this._service.isLoggedIn()));
    this.brandMenu = ROUTES.filter(menuItem => menuItem.menuType === MenuType.BRAND)[0];
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