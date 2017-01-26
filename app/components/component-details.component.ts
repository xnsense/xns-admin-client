import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IComponent } from './component';
import { XnsService } from '../api/xns.service';

@Component({
    selector: 'xns-component',
    templateUrl: 'app/components/component-details.component.html',
    styleUrls: ['app/components/component-details.component.css']
})
export class ComponentDetailsComponent implements OnInit, OnChanges {
    @Input() component: IComponent;
    loading: boolean = false;
    latest: any = {};

   constructor(
                private _service: XnsService) {
    
    }
    
    hasTemperature() : boolean {
        return this.latest && this.latest.data && this.latest.data.Temperatures != null;
        for (let key in this.latest) {
            if (this.latest[key].temperature)
                return true;
        }
        return false;
    }

    hasPosition() : boolean {
        return this.latest && this.latest.data && this.latest.data.Positions != null;
        for (let key in this.latest) {
            if (this.latest[key].position)
                return true;
        }
        return false;
    }

    hasWeigth() : boolean {
        return this.latest && this.latest.data && this.latest.data.Weights != null;
        for (let key in this.latest) {
            if (this.latest[key].weight)
                return true;
        }
        return false;
    }
    
    getJson() : string {
        return JSON.stringify(this.latest, null, 2);
    }
    ngOnInit(): void {
        this.latest = {};
    }
    ngOnChanges() : void {
        this.latest = {};
        this.loadLatest();
    }

    loadLatest() : void {
        this.loading = true;
        this._service.getComponentLatestData(this.component).subscribe(data => {
            this.latest = data;
            this.loading = false;
            setTimeout(() => {
                this.loadLatest();
            }, 10000);  
        });
    }
}
