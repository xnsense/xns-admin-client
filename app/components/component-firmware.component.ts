import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { IComponent } from './component';
import { XnsService } from '../api/xns.service';

@Component({
    selector: 'xns-component-firmware',
    templateUrl: 'app/components/component-firmware.component.html',
    styleUrls: ['app/components/component-firmware.component.css']
})
export class ComponentFirmwareComponent implements OnInit, OnChanges {
    @Input() public component: IComponent;

    constructor(private _service: XnsService) {
    }

    ngOnInit(): void {
        
    }
    
    ngOnChanges() : void {
        
    }
}
