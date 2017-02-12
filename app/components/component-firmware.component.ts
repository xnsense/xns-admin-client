import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload';

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
    public errorMessage: any;
    public firmware: IFirmware;
    public hardware: IHardware;
    @Output() public autoOTA: boolean = false;

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
        this.updateUrl();

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

    updateUrl() : void {
        //let url = "http://localhost:8080/api";
        let url = this._service.getFirmwareUrl(this.component, this.autoOTA);
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
