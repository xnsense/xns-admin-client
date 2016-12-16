import { Component, OnInit, Input } from '@angular/core';
import { IComponent } from './component';
import { XnsService } from '../api/xns-service';

@Component({
    selector: 'xns-component',
    templateUrl: 'app/components/component-details.component.html',
    styleUrls: ['app/components/component-details.component.css']
})
export class ComponentDetailsComponent implements OnInit {
    @Input() component: IComponent;

   constructor(
                private _service: XnsService) {

    }
    

    ngOnInit(): void {
        
    }
  
}
