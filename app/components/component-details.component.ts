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
    

    ngOnInit(): void {
    }
    ngOnChanges() : void {
        this.latest = {};
         this._service.getComponentLatestData(this.component).subscribe(data => {
                this.latest = data;
            });
    }
}
