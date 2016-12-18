import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { IComponent } from './component';
import { XnsService } from '../api/xns.service';

@Component({
    templateUrl: 'app/components/component-edit.component.html',
    styleUrls: ['app/components/component-edit.component.css']
})
export class ComponentEditComponent implements OnInit {

    component: IComponent;    
    errorMessage: string;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _service: XnsService) {
    }

    ngOnInit(): void {
        this._route.params.subscribe(
            params => {
                let id = params['id'];
                this._service.getComponent(id)
                    .subscribe(
                        data => {
                            this.component = data;
                        },
                        error => this.errorMessage = <any>error
                    );
            });
    }

    save() : void {
        this._service
            .saveComponent(this.component)
            .subscribe(success => {
                if (success)
                    this._router.navigate(['components', this.component.componentAddress]);
            }, e => {

            });
    }
}