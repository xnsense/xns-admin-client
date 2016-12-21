import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Ng2BootstrapModule }  from 'ng2-bootstrap';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login.component';
import { NavbarComponent } from './home/navbar/navbar.component';

/* Feature Modules */
import { ComponentModule } from './components/component.module';
import { XnsService } from './api/xns.service';
import { XnsServiceGuard } from './api/xns-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    ComponentModule,
    Ng2BootstrapModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent
  ],
  providers: [
    XnsService,
    XnsServiceGuard,
    DatePipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
