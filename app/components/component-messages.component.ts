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
    errorMessage: any;
    messages: IComponentMessage[] = [];
    loading: boolean = false;
    latestMessage: Date = null;
    reloadTimer: NodeJS.Timer;
    autoRefresh: boolean = true;

   constructor(
                private _service: XnsService) {

    }
    
    ngOnChanges() : void {
        this.loading = true;
        this.messages = [];
        this.latestMessage = null;
        this.loadNewMessages();
    }

    toggleAutoRefresh(): void {
        this.autoRefresh = !this.autoRefresh;
        
        if (this.autoRefresh)
            this.loadNewMessages();
        else if (this.reloadTimer)
            clearTimeout(this.reloadTimer);

        localStorage.setItem('autoRefresh', JSON.stringify(this.autoRefresh);            
    }
    loadNewMessages(): void {
        try {
            if (this.reloadTimer)
                clearTimeout(this.reloadTimer);

            this.loading = true;
            this._service.getComponentMessages(this.component, this.latestMessage).subscribe(data => {
                if (data.length > 0)
                    this.latestMessage = data[0].processed;
                if (this.messages)
                    this.messages = data.concat(this.messages);
                else
                    this.messages = data;
                this.loading = false;

                if (this.autoRefresh)
                {
                    this.reloadTimer = setTimeout(() => {
                        this.loadNewMessages();
                    }, 5000); 
                }
            });
        }
        catch(ex)
        {
            this.errorMessage = ex;
            this.loading = false;
        }
    }

    ngOnInit(): void {
        let vSaved = JSON.parse(localStorage.getItem('autoRefresh'));
        if (vSaved == false)
            this.autoRefresh = false;
    }

    echo() : void {
        this._service.echo(this.component, this.echoMessage).subscribe(success => {
            setTimeout(() => {
                this.loadNewMessages();
            }, 3000);            
        });
    }

    keyDownFunction(event:any) : void {
        if(event.keyCode == 13) {
            this.echo();
        }
    }
  
    refresh() :void {
        this.loadNewMessages();
    }
}
