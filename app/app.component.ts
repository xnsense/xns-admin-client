import { Component, Input } from '@angular/core';
import { XnsService } from './api/xns.service';
import { Ng2BootstrapModule }  from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';

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

    public sideBarClass(): string
    {
        if(this._service.isLoggedIn())
        {
            return "app header-fixed sidebar-fixed"
        }else
        {
            return "app header-fixed sidebar-hidden"
        }
    }


}
