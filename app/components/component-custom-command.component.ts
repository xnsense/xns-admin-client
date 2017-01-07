import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IComponentMessage } from './component-message';
import { IComponent  } from './component';
import { XnsService } from '../api/xns.service';

@Component({
    selector: 'xns-component-custom-command',
    templateUrl: 'app/components/component-custom-command.component.html',
    styleUrls: ['app/components/component-custom-command.component.css']
})
export class ComponentCustomCommandComponent implements OnInit {
    @Input() component: IComponent;
    errorMessage: any;
    commandName: string;
    commandDetails: string;

    constructor(
                private _service: XnsService) {
    }

    ngOnInit(): void {
    }

    sendCommand() : void {
        let command: any;
        this.errorMessage = null;

        if (this.commandDetails)
        {
            try {
                command = JSON.parse(this.commandDetails);
            }
            catch (ex)
            {
                this.errorMessage = ex;
                return;
            }
        }

        this._service.sendCustomCommand(this.component, this.commandName, command).subscribe(success => {

        });
    }

    keyDownFunction(event:any) : void {
        if(event.keyCode == 13) {
            this.sendCommand();
        }
    }
}
