import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IComponentMessage } from './component-message';
import { IComponent  } from './component';
import { XnsService } from '../api/xns.service';

@Component({
    selector: 'xns-component-messages',
    templateUrl: 'app/components/component-messages.component.html',
    styleUrls: ['app/components/component-messages.component.css']
})
export class ComponentMessagesComponent implements OnInit, OnChanges {
    @Input() component: IComponent;
    echoMessage: string;
    messages: IComponentMessage[];

   constructor(
                private _service: XnsService) {

    }
    
    ngOnChanges() : void {
        this.messages = [];
        this._service.getComponentMessages(this.component).subscribe(data => {
                this.messages = data;
            });
    }

    ngOnInit(): void {
    }

    echo() : void {
        this._service.echo(this.component, this.echoMessage).subscribe(success => {
            setTimeout(() => {
                this.ngOnChanges();
            }, 3000);            
        });
    }
  
}
