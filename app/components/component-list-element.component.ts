import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IComponent } from './component';
import { IComponentData } from './componentData';
import { XnsService } from '../api/xns.service';

@Component({
    selector: 'xns-component-list-element',
    templateUrl: 'app/components/component-list-element.component.html',
    styleUrls: ['app/components/component-list-element.component.css']
})
export class ComponentListElementComponent implements OnInit, OnChanges {
    @Input() component: IComponent;
    showDetails: boolean = false;

   constructor(private _service: XnsService) {

    }
    
    ngOnInit(): void {
        
    }

    ngOnChanges(): void {

    }
    
    isOnline(lastReported:any): boolean {
        let last:Date;
        if (!lastReported)
            return false;
        else if (typeof(lastReported) == "string")
            last = new Date(lastReported);
        else if (typeof(lastReported) == "number")
            last = new Date(lastReported);
        else if (typeof(lastReported) == "date")
            last = lastReported;
        
        if (last)
            return (new Date().getTime() - last.getTime()) < 1000 * 60 * 60 * 24;
        else 
            return false;
    }

    showLatestData() :void {
        this.showDetails = !this.showDetails;
    }
    getComponentDataAsJson(): string {
        if (this.component && this.component.data)
        {
            return JSON.stringify(this.component.data, null, 3);
        }
        else
            return null;
    }
}