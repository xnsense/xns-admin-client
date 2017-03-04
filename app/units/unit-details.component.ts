import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
    
   constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _service: XnsService) {

    }
    ngOnChanges() : void 
    {
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
                console.error(e);
            });
    }
}