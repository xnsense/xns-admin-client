import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { IComponent } from './component';
import { XnsService } from '../api/xns.service';

@Component({
    templateUrl: 'app/components/component-edit.component.html',
    styleUrls: ['app/components/component-edit.component.css']
})
export class ComponentEditComponent {
    
}