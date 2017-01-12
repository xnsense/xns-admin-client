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

    latest: any = {};

   constructor(
                private _service: XnsService) {
    
    }
    
    hasTemperature() : boolean {
        return this.latest.Temperatures != null;
        for (let key in this.latest) {
            if (this.latest[key].temperature)
                return true;
        }
        return false;
    }

    hasPosition() : boolean {
        return this.latest.Positions != null;
        for (let key in this.latest) {
            if (this.latest[key].position)
                return true;
        }
        return false;
    }

    hasWeigth() : boolean {
        return this.latest.Weights != null;
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
        this._service.getComponentLatestData(this.component).subscribe(data => {
            this.latest = data;
            setTimeout(() => {
                this.loadLatest();
            }, 10000);  
        });
    }
}
