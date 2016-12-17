
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { XnsService } from './xns.service';

@Injectable()
export class XnsServiceGuard implements CanActivate
{
    constructor(private _service: XnsService,
    private _router: Router
    ) {

    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._service.isLoggedIn()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}