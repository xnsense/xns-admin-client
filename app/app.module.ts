import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2BootstrapModule }  from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { UserComponent } from './home/user/user.component';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './home/sidebar/sidebar.directive';
import { DatePipe } from '@angular/common';

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
      { path: 'user', component: UserComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    ComponentModule,
    Ng2BootstrapModule,
    TabsModule.forRoot(),
    DropdownModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    UserComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,    
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "en-US" }, //replace "en-US" with your locale
    XnsService,
    XnsServiceGuard,
    DatePipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
