import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng2BootstrapModule }  from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';

import { IComponent } from './component';
import { IFirmware } from './firmware';
import { IFirmwareAction } from './firmwareAction';
import { IHardware } from './hardware';
import { XnsService } from '../api/xns.service';


@Component({
    selector: 'xns-component-firmware-action',
    templateUrl: 'app/components/component-firmware-action.component.html',
    styleUrls: ['app/components/component-firmware-action.component.css']
})

export class ComponentFirmwareActionComponent implements OnInit {

    constructor(private _service: XnsService) {
    }

    ngOnInit(): void {
    }
}