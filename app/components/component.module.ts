import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ComponentListComponent } from './component-list.component';
import { ComponentEditComponent } from './component-edit.component';
import { ComponentDashboardComponent } from './component-dashboard.component';
import { ComponentDetailsComponent } from './component-details.component';
import { ComponentMessagesComponent } from './component-messages.component';
import { ComponentCustomCommandComponent } from './component-custom-command.component';
import { ComponentOtaComponent } from './component-ota.component';

import { ReversePipe } from '../shared/reverse.pipe';
import { KeysPipe } from '../shared/keys.pipe';
import { MyDatePipe } from '../shared/mydate.pipe';
import { DurationPipe } from '../shared/duration.pipe';

import { XnsService } from '../api/xns.service';
import { XnsServiceGuard } from '../api/xns-guard.service';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild([
        { path: 'components', component: ComponentListComponent, canActivate: [XnsServiceGuard] },
        { path: 'components/:id', component: ComponentDashboardComponent, canActivate: [XnsServiceGuard] },
        { path: 'edit/component/:id', component: ComponentEditComponent, canActivate: [XnsServiceGuard] }
      ])
  ],
  declarations: [
    ComponentListComponent,
    ComponentDashboardComponent,
    ComponentMessagesComponent,
    ComponentDetailsComponent,
    ComponentEditComponent,
    ComponentOtaComponent,
    ComponentCustomCommandComponent,
    ReversePipe,
    KeysPipe,
    MyDatePipe,
    DurationPipe
  ],
  providers: [
    XnsService,
    XnsServiceGuard
  ]
})
export class ComponentModule {}
