import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IComponent } from './component';
import { IComponentData } from './componentData';
import { XnsService } from '../api/xns.service';
import { IFirmwareDataPath } from './firmware-datapath';
import { IFirmwareAction } from './firmware-action';

@Component({
    selector: 'xns-component-list-element',
    templateUrl: 'app/components/component-list-element.component.html',
    styleUrls: ['app/components/component-list-element.component.css']
})
export class ComponentListElementComponent implements OnInit, OnChanges {
    @Input() component: IComponent;
    actions: IFirmwareAction[] = [];
    showDetails: boolean = false;

   constructor(private _service: XnsService) {

    }
    
    ngOnInit(): void {
        this._service.getFirmwareActionList().subscribe(data => {
            this.actions = data.filter(v=> v.firmwareId == this.component.firmwareId);
        });
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

    getDataValue(path:IFirmwareDataPath):string {
        let statement:string = "return " + path.path + ";";
        //console.log(path.path);
        try {
            let func = new Function('data', statement);
            let value = func(this.component.data.data);
            if(path.format)
            {
                return path.format.replace("%1", value);
            }else
            {
                return value;
            }
            
        }
        catch (ex) {
            console.log(ex);
            return null;
        }
    }

    
    sendCommand(firmwareAction:IFirmwareAction) : void {
        let command: any;
        let commandName: any;
        
        try 
            {
                command = JSON.parse(firmwareAction.commandDetails);
                commandName = firmwareAction.command;
            }
            catch (ex)
            {
                
                console.log(ex);
                return;
            }
        this._service.sendCustomCommand(this.component, commandName, command).subscribe(success => {
        });
    }
}