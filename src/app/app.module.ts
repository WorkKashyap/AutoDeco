import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AutoDecoService } from './shared/auto-deco.service';


import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api'; 
import {TableModule} from 'primeng/table';

import {ButtonModule} from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxLoadingModule } from 'ngx-loading';
import { Toast, ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    ButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabViewModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({})
    // RouterModule.forRoot([
    //   {
    //     path: "",
    //     component: HomeComponent
    //   },
    //   {
    //     path: "login",
    //     component: LoginComponent
    //   }
      
    // ])
    ],
  providers: [AutoDecoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
