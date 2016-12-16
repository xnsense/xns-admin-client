import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { ComponentListComponent } from './component-list.component';
import { ComponentDetailsComponent } from './component-details.component';

import { XnsService } from '../api/xns-service';

@NgModule({
  imports: [
      CommonModule,
    RouterModule.forChild([
      { path: 'components', component: ComponentListComponent },
      { path: 'components/:id', component: ComponentListComponent }
    ])
  ],
  declarations: [
    ComponentListComponent,
    ComponentDetailsComponent
//    ProductDetailComponent,
//    ProductFilterPipe
  ],
  providers: [
    XnsService,
//    ProductDetailGuard
  ]
})
export class ComponentModule {}
