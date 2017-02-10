import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IComponent } from './component';
import { IFirmware } from './firmware';
import { IHardware } from './hardware';
import { XnsService } from '../api/xns.service';

@Component({
    selector: 'xns-component-firmware',
    templateUrl: 'app/components/component-firmware.component.html',
    styleUrls: ['app/components/component-firmware.component.css']
})
export class ComponentFirmwareComponent implements OnInit, OnChanges {
    
    @Input() public component: IComponent;
    errorMessage: any;
    firmware: IFirmware;
    hardware: IHardware;
    comp: IComponent;

    constructor(private _service: XnsService) {
    }

    ngOnInit(): void {
        this.comp = this.component;
        let fwId = this.component.firmwareId;
        let hwId = this.component.hardwareId;
        
        this._service.getFirmware(fwId)
            .subscribe(
                data => {
                    this.firmware = data;
                },
                error => this.errorMessage = <any>error
            );

        this._service.getHardware(hwId)
            .subscribe(
                data => {
                    this.hardware = data;
                },
                error => this.errorMessage = <any>error
            );        
    }
    
    ngOnChanges() : void {
        
    }
}
