import { Component, OnInit, Input } from '@angular/core';
import { XnsService } from '../../api/xns.service';
import { Router } from '@angular/router';
import {IUser} from '../../api/user';

@Component({
  moduleId: module.id,
  selector: 'xns-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: [ 'sidebar.component.css' ]
})
export class SidebarComponent implements OnInit {
  @Input() toggled: boolean = false;
  public user:IUser = null;
  public isLoggedIn:boolean = false;

  constructor(private _service: XnsService, private _router: Router) {

  }

  ngOnInit(): void{
    this.isLoggedIn = this._service.isLoggedIn();
    this.user = this._service.getUser();
    
    this._service.onLogin.subscribe((value) => {
      if (value) {
        this.isLoggedIn = true;
        this.user = this._service.getUser();
      }else
      {
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this._service.logout();
    this.isLoggedIn = false;
    this.user = null;
    this._router.navigate(['home']);
  }

}