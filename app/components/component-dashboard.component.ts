import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IComponent } from './component';
import { XnsService } from '../api/xns.service';

@Component({
    templateUrl: 'app/components/component-dashboard.component.html',
    styleUrls: ['app/components/component-dashboard.component.css']
})
export class ComponentDashboardComponent implements OnInit, OnChanges {
    @Input() component: IComponent;
    loading: boolean = false;
    latest: any = {};
    data: any = {};

   constructor(
                private _service: XnsService,
                private _route: ActivatedRoute) {
    
    }
    
    hasTemperature() : boolean {
        return this.latest && this.latest.data && this.latest.data.Temperatures != null;
        /*
        for (let key in this.latest) {
            if (this.latest[key].temperature)
                return true;
        }
        return false;
        */
    }

    hasPosition() : boolean {
        return this.latest && this.latest.data && this.latest.data.Positions != null;
        /*
        for (let key in this.latest) {
            if (this.latest[key].position)
                return true;
        }
        return false;
        */
    }

    hasWeigth() : boolean {
        return this.latest && this.latest.data && this.latest.data.Weights != null;
        /*
        for (let key in this.latest) {
            if (this.latest[key].weight)
                return true;
        }
        return false;
        */
    }
    
    getJson() : string {
        return JSON.stringify(this.latest, null, 2);
    }
    ngOnInit(): void {
        this.latest = {};

        this._route.params.subscribe(
            params => {
                let id = params['id'];
                this._service.getComponent(id).subscribe(
                    data => {
                        this.component = data;
                        this.loadLatest();
                    }
                );
            }
        );
    }

    
    ngOnChanges() : void {
        this.latest = {};
        this.loadLatest();
    }

    loadLatest() : void {
        this.loading = true;
        this._service.getComponentLatestData(this.component).subscribe(data => {
            this.latest = data;
            this.data = this.evaluateData();
            this.loading = false;
            setTimeout(() => {
                this.loadLatest();
            }, 10000);  
        });
    }

    evaluateData() : any {
        let path:string = "return data.Temperatures.ute;";
        try {
            let func = new Function('data', path);
            let value = func(this.latest.data);
            return value;
        }
        catch (ex) {
            return null;
        }
    }
}
