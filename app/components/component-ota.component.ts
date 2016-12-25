import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { IComponent } from './component';
import { XnsService } from '../api/xns.service';

@Component({
    selector: 'xns-component-ota',
    templateUrl: 'app/components/component-ota.component.html',
    styleUrls: ['app/components/component-ota.component.css']
})
export class ComponentOtaComponent implements OnInit {

    @Input() component: IComponent;    
    message: string;
    firmwareUrl: string;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _service: XnsService) {
    }

    ngOnInit(): void {
        
    }

    update() : void {
        this._service
            .otaUpdateComponent(this.component, this.firmwareUrl)
            .subscribe(success => {
                this.message = "Successfully sent upgrade command. Monitor messages for status";
            }, e => {

            });
    }
}