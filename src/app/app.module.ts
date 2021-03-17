import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JobworkmaterialService } from './shared/jobworkmaterial/jobworkmaterial.service';


import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api'; 
import {TableModule} from 'primeng/table';

import {ButtonModule} from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { AddjobworkComponent } from './home/addjobwork/addjobwork.component';
import { ViewJobworkComponent } from './home/view-jobwork/view-jobwork.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxLoadingModule } from 'ngx-loading';
import { Toast, ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { AdditemComponent } from './home/additem/additem.component';
import { ViewitemComponent } from './home/viewitem/viewitem.component';
import { AddproductionComponent } from './home/addproduction/addproduction.component';
import { ViewproductionComponent } from './home/viewproduction/viewproduction.component';
import { InspectionDashboardComponent } from './inspection-dashboard/inspection-dashboard.component';
import { CompanyDropdownComponent } from './utilities/company-dropdown/company-dropdown.component';
import { YearDropdownComponent } from './utilities/year-dropdown/year-dropdown.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { RolesComponent } from './roles/roles.component';
import { RolepagesComponent } from './rolepages/rolepages.component';
import { RolestouserComponent } from './rolestouser/rolestouser.component';
import { RolestopagesComponent } from './rolestopages/rolestopages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddjobworkComponent,
    ViewJobworkComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    HomeComponent,
    AdditemComponent,
    ViewitemComponent,
    AddproductionComponent,
    ViewproductionComponent,
    CompanyDropdownComponent,
    InspectionDashboardComponent,
    YearDropdownComponent,
    RolesComponent,
    RolepagesComponent,
    RolestouserComponent,
    RolestopagesComponent
  ],
  imports: [
    ButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabViewModule,
    TableModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
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
    NgxSpinnerModule,
    FullCalendarModule
    ],
  providers: [JobworkmaterialService],
  bootstrap: [AppComponent]
})
export class AppModule { }
