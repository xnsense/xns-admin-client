import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { IComponent } from './component';
import { XnsService } from '../api/xns.service';

@Component({
    selector: 'xns-component-details',
    templateUrl: 'app/components/component-details.component.html',
    styleUrls: ['app/components/component-details.component.css']
})
export class ComponentDetailsComponent implements OnInit, OnChanges {
    @Input() public component: IComponent;

    constructor(private _service: XnsService) {
    }

    ngOnInit(): void {
        
    }
    
    ngOnChanges() : void {
        
    }
}
