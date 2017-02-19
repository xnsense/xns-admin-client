import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng2BootstrapModule }  from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';

import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload';

import { IComponent } from './component';
import { IFirmware } from './firmware';
import { IFirmwareAction } from './firmwareAction';
import { IHardware } from './hardware';
import { XnsService } from '../api/xns.service';

@Component({
    selector: 'xns-component-firmware',
    templateUrl: 'app/components/component-firmware.component.html',
    styleUrls: ['app/components/component-firmware.component.css']
})
export class ComponentFirmwareComponent implements OnInit, OnChanges {
    
    @Input() public component: IComponent;
    public errorMessage: any;
    public firmware: IFirmware;
    public firmwareActions: IFirmwareAction[];
    public hardware: IHardware;
    public autoOTA: boolean = false;
    public release: boolean = false;
    public uploader:FileUploader = new MyUploader({});
    public hasBaseDropZoneOver:boolean = false;

    constructor(private _service: XnsService) {
    }

    fileOverBase(e:any): void {
        this.hasBaseDropZoneOver = e;
        console.log("File is over zone");
    }
    upload(): void {
        this.uploader.uploadAll();
    }
    ngOnInit(): void {
        this.updateUrl(false);

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

        this._service.getFirmwareActionList()
            .subscribe(data => {
                this.firmwareActions = data;
                //Filter he Actions to only the Components Firmware
                this.firmwareActions = this.firmwareActions.filter(x => x.firmwareId == fwId);
                },
                error => this.errorMessage = <any>error);
    }

    sendCommand(firmwareAction:IFirmwareAction) : void {
        let command: any;
        let commandName: any;
        this.errorMessage = null;
        try 
            {
                command = JSON.parse(firmwareAction.commandDetails);
                commandName = firmwareAction.command;
            }
            catch (ex)
            {
                this.errorMessage = ex;
                console.log(this.errorMessage);
                return;
            }
        this._service.sendCustomCommand(this.component, commandName, command).subscribe(success => {
        });
    }

    updateUrl() : void {
        let url: any;

        if(this.release)
        {
            url = this._service.getReleaseFirmwareUrl(this.component,this.firmware, this.hardware, this.autoOTA);
        }else
        {
            url = this._service.getFirmwareUrl(this.component, this.autoOTA);
        }
        let auth = this._service.getAuthHeader();
        this.uploader.setOptions({ url: url, autoUpload: true, removeAfterUpload: true, method: "POST", authTokenHeader: auth[0], authToken: auth[1] });      
    }

    ngOnChanges() : void {

    }
}

/*
    This is a trick to turn off Credentials in the request, 
    allowing use of wildcard host header in CORS request
*/
class MyUploader extends FileUploader {
    onAfterAddingFile(file: FileItem) {
        file.withCredentials = false;
    }
}
