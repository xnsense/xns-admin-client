import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {IUser} from '../../api/user';
import { XnsService } from '../../api/xns.service';

@Component({
    templateUrl: 'app/home/user/user.component.html',
    styleUrls: ['app/home/user/user.component.css']
})

export class UserComponent implements OnInit {
    public user:IUser = null;

   constructor(
                private _service: XnsService,
                private _route: ActivatedRoute) {}

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
    }
}