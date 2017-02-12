import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { IComponent } from './component';
import { XnsService } from '../api/xns.service';

@Component({
    selector: 'xns-component-details',
    templateUrl: 'app/components/component-details.component.html',
    styleUrls: ['app/components/component-details.component.css']
})
export class ComponentDetailsComponent implements OnInit, OnChanges {
    @Input() public component: IComponent;

    constructor(private _service: XnsService,
                private _router: Router) 
    {
    }

    ngOnInit(): void {
        
    }
    
    ngOnChanges() : void {
        
    }
    save() : void {
        this._service
            .saveComponent(this.component)
            .subscribe(success => {
                if (success)
                    this._router.navigate(['components', this.component.componentAddress]);
            }, e => {
                console.error(e);
            });
    }
}
