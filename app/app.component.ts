import { Component } from '@angular/core';
import { XnsService } from './api/xns.service';

@Component({
    selector: 'pm-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'XNSENSE';

    constructor (private _service: XnsService) {

    }

    public isLoggedIn() : boolean {
        return this._service.isLoggedIn();
    }
}
