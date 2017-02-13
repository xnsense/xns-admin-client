import { Component, Input } from '@angular/core';
import { XnsService } from './api/xns.service';

@Component({
    selector: 'pm-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'XNSENSE';
    @Input() menuToggled: boolean = false;

    constructor (private _service: XnsService) {

    }
    public menuButtonClick() :void {
        this.menuToggled = !this.menuToggled;
    }
    public isLoggedIn() : boolean {
        return this._service.isLoggedIn();
    }
}
