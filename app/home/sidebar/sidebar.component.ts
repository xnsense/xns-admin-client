import { Component, OnInit, Input } from '@angular/core';
import { XnsService } from '../../api/xns.service';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'xns-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: [ 'sidebar.component.css' ]
})
export class SidebarComponent implements OnInit {
  @Input() toggled: boolean = false;
  public username:string = null;
  public isLoggedIn:boolean = false;

  constructor(private _service: XnsService, private _router: Router) {

  }

  ngOnInit(): void{
    this.isLoggedIn = this._service.isLoggedIn();
    this.username = this._service.getUsername();
    
    this._service.onLogin.subscribe(v => {
      if (v) {
        this.isLoggedIn = true;
        this.username = this._service.getUsername();
      }
    });

  }

  logout() {
    this._service.logout();
    this.isLoggedIn = false;
    this.username = null;
    this._router.navigate(['home']);
  }

}