import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';

/* Feature Modules */
import { ComponentModule } from './components/component.module';
import { XnsServiceGuard } from './api/xns-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
    ,ComponentModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    //XnsServiceGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
