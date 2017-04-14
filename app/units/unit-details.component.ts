import { Component, OnInit, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IUnit } from './unit';
import { XnsService } from '../api/xns.service';

@Component({
    templateUrl: 'app/units/unit-details.component.html',
    styleUrls: ['app/units/unit-details.component.css']
})

export class UnitDetailsComponent implements OnInit, OnChanges 
{
    @Input() unit: IUnit;
    public pageTitle: string = 'Unit';
    public errorMessage: string;
    public unitConfig: string;
   constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _service: XnsService) {

    }
    ngOnChanges() : void 
    {
        console.log("Change Happen");
    }
    ngOnInit(): void 
    {
        this._route.params.subscribe(
            params => 
            {
                let id = params['id'];
                this._service.getUnit(id).subscribe(
                    data => {
                        this.unit = data;
                    }
                );
            }
        );
    }
    save() : void 
    {
        this._service
            .saveUnit(this.unit)
            .subscribe(success => {
                if (success)
                    this._router.navigate(['units', this.unit.id]);
            }, e => 
            {
                this.errorMessage = e;
            });
    }
    
    getUnitConfig(): void {
        try {

            this._service.getUnitConfig(this.unit.id).subscribe(data => {
                if (data != null)
                    this.unitConfig = JSON.stringify(data,null,3);
                else
                    console.log("No Config");
            });
        }
        catch(ex)
        {
            this.errorMessage = ex;
        }
    }
    createUnitConfig(): void {
        try {

            this._service.crateUnitConfig(this.unit.id).subscribe(data => {
                if (data != null)
                    this.unitConfig = JSON.stringify(data,null,3);
                else
                    console.log("No Config");
            });
        }
        catch(ex)
        {
            this.errorMessage = ex;
        }
    }    
}