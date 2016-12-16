
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { XnsService } from './xns.service';

@Injectable()
export class XnsServiceGuard implements CanActivate
{
    constructor(private _service: XnsService) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean{
        return this._service.isLoggedIn();
    }
}