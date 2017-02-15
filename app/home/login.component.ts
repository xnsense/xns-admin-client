import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { XnsService } from '../api/xns.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _service: XnsService) { }

    ngOnInit() 
    {
        
        if(!this._service.isLoggedIn())
        {
            /**document.querySelector('body').classList.remove('sidebar-fixed');
            document.querySelector('body').classList.add('sidebar-hidden');**/
        }
        
        // reset login status
        //this._service.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this._service.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this._router.navigate([this.returnUrl]);
                },
                error => {
                    console.error(error);
                    this.loading = false;
                });
    }
}
