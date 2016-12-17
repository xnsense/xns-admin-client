import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { ComponentListComponent } from './component-list.component';
import { ComponentDetailsComponent } from './component-details.component';
import { ComponentMessagesComponent } from './component-messages.component';

import { XnsService } from '../api/xns.service';
import { XnsServiceGuard } from '../api/xns-guard.service';

@NgModule({
  imports: [
      CommonModule,
    RouterModule.forChild([
      { path: 'components', component: ComponentListComponent, canActivate: [XnsServiceGuard] },
      { path: 'components/:id', component: ComponentListComponent, canActivate: [XnsServiceGuard] }
    ])
  ],
  declarations: [
    ComponentListComponent,
    ComponentDetailsComponent,
    ComponentMessagesComponent
//    ProductDetailComponent,
//    ProductFilterPipe
  ],
  providers: [
    XnsService,
    XnsServiceGuard
//    ProductDetailGuard
  ]
})
export class ComponentModule {}
