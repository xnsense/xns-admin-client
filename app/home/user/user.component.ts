import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IUser } from '../../api/user';
import { ISolution } from '../../solutions/solution';
import { XnsService } from '../../api/xns.service';

@Component({
    templateUrl: 'app/home/user/user.component.html',
    styleUrls: ['app/home/user/user.component.css']
})

export class UserComponent implements OnInit {
    public user:IUser = null;
    public errorMessage: string;
    solutions: ISolution[];

   constructor(
                private _service: XnsService,
                private _route: ActivatedRoute
              ) {}

    ngOnInit(): void
    {
        this.user = this._service.getUser();
        this._service.onLogin.subscribe((value) => {
            if (value) {
                this.user = this._service.getUser();
            }else
            {
                this.user = null;
            }
        });
    
        this._service.getSolutions()
        .subscribe(data => {
            this.solutions = data;
            },
            error => this.errorMessage = <any>error);
    }
    saveUser(): void {
        
        console.log(this.user);
    }    
}