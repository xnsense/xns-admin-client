import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { IUnit } from './unit';
import { XnsService } from '../api/xns.service';

@Component({
    templateUrl: 'app/units/unit-list.component.html',
    styleUrls: ['app/units/unit-list.component.css']
})

export class UnitListComponent implements OnInit 
{
    public pageTitle: string = 'Units';
    public errorMessage: string;
    units: IUnit[];
    private sub: Subscription;
    
   constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _service: XnsService) {

    }

    ngOnInit(): void 
    {
        this._service.getUnits()
            .subscribe(data => {
                this.units = data;
                
                this.sub = this._route.params.subscribe(
                    params => {
                        let id = params['id'];
                        //this.selectedComponent = this.components.find(c => c.componentAddress == id);
                    });
                },
                error => this.errorMessage = <any>error);
    }
}