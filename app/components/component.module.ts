import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { ComponentListComponent } from './component-list.component';
//import { ProductDetailComponent } from './product-detail.component';
//import { ProductDetailGuard } from './product-guard.service';

//import { ProductFilterPipe } from './product-filter.pipe';
//import { ProductService } from './product.service';

//import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    //SharedModule,
    RouterModule.forChild([
      { path: 'components', component: ComponentListComponent },
//      { path: 'product/:id',
        //canActivate: [ ProductDetailGuard],
        //component: ProductDetailComponent
//      }
    ])
  ],
  declarations: [
    ComponentListComponent,
//    ProductDetailComponent,
//    ProductFilterPipe
  ],
  providers: [
//    ProductService,
//    ProductDetailGuard
  ]
})
export class ComponentModule {}
