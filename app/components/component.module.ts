import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { Ng2BootstrapModule }  from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';

import { UnitListComponent } from '../units/unit-list.component';
import { UnitDetailsComponent } from '../units/unit-details.component';
import { ComponentListComponent } from './component-list.component';
import { ComponentEditComponent } from './component-edit.component';
import { ComponentDashboardComponent } from './component-dashboard.component';
import { ComponentDetailsComponent } from './component-details.component';
import { ComponentFirmwareComponent } from './component-firmware.component';
import { ComponentMessagesComponent } from './component-messages.component';
import { ComponentCustomCommandComponent } from './component-custom-command.component';
import { ComponentOtaComponent } from './component-ota.component';
import { ComponentFirmwareActionComponent} from './component-firmware-action.component';
import { ComponentTagComponent } from './component-tag.component';
import { ComponentListElementComponent } from './component-list-element.component';

import { ReversePipe } from '../shared/reverse.pipe';
import { KeysPipe } from '../shared/keys.pipe';
import { MyDatePipe } from '../shared/mydate.pipe';
import { DurationPipe } from '../shared/duration.pipe';
import { TagFilterPipe } from '../shared/tagfilter.pipe';

import { XnsService } from '../api/xns.service';
import { XnsServiceGuard } from '../api/xns-guard.service';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      TabsModule,
      RouterModule.forChild([
        { path: 'units', component: UnitListComponent, canActivate: [XnsServiceGuard] },
        { path: 'units/:id', component: UnitDetailsComponent, canActivate: [XnsServiceGuard] },
        { path: 'components', component: ComponentListComponent, canActivate: [XnsServiceGuard] },
        { path: 'components/:id', component: ComponentDashboardComponent, canActivate: [XnsServiceGuard] },
        { path: 'edit/component/:id', component: ComponentEditComponent, canActivate: [XnsServiceGuard] }
      ])
  ],
  declarations: [
    UnitListComponent,
    UnitDetailsComponent,
    ComponentListComponent,
    ComponentDashboardComponent,
    ComponentMessagesComponent,
    ComponentDetailsComponent,
    ComponentFirmwareComponent,
    ComponentEditComponent,
    ComponentOtaComponent,
    ComponentCustomCommandComponent,
    ComponentFirmwareActionComponent,
    ComponentTagComponent,
    ComponentListElementComponent,
    ReversePipe,
    KeysPipe,
    MyDatePipe,
    DurationPipe,
    TagFilterPipe,
    FileSelectDirective, FileDropDirective
  ],
  providers: [
    XnsService,
    XnsServiceGuard
  ]
})
export class ComponentModule {}
