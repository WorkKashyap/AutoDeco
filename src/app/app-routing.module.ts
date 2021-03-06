import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/AuthGuard';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { DashboardComponent } from './home/dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AddjobworkComponent } from './home/addjobwork/addjobwork.component';
// import { ViewJobworkComponent } from './home/view-jobwork/view-jobwork.component';
import { AdditemComponent } from './home/additem/additem.component';
import { ViewitemComponent } from './home/viewitem/viewitem.component';
import { AddproductionComponent } from './home/addproduction/addproduction.component';
import { ViewproductionComponent } from './home/viewproduction/viewproduction.component';
//import { CompanyDropdownComponent } from './company-dropdown/company-dropdown.component';
import { InspectionDashboardComponent } from './inspection-dashboard/inspection-dashboard.component';
import { CompanyDropdownComponent } from './utilities/company-dropdown/company-dropdown.component';
import { YearDropdownComponent } from './utilities/year-dropdown/year-dropdown.component';
import { RolesComponent } from './roles/roles.component';
import { RolepagesComponent } from './rolepages/rolepages.component';
import { RolestouserComponent } from './rolestouser/rolestouser.component';
import { RolestopagesComponent } from './rolestopages/rolestopages.component';
import { QualityCalenderComponent } from './qualitycalendar/qualitycalendar';
import { ViewJobworkComponent } from './home/view-jobwork/view-jobwork.component';
import { DefectDashboardComponent } from './defect-dashboard/defect-dashboard.component';
import { ProductionValSummaryComponent } from './production-val-summary/production-val-summary.component';
import { ConsumptionCalendarComponent } from './consumption-calendar/consumption-calendar.component';
import { RejectionDetailComponent } from './rejection/rejection-detail/rejection-detail.component';
import { RejectionSummaryComponent } from './rejection/rejection-summary/rejection-summary.component';
import { RejectionComponent } from './rejection/rejection.component';
import { AddroundhoursComponent } from './roundhours/addroundhours/addroundhours.component';
import { RoundhoursComponent } from './roundhours/roundhours.component';
import { SalesinfoComponent } from './salesinfo/salesinfo.component';
import { SalesItemComponent } from './sales-item/sales-item.component';
import { SalesDetailComponent } from './sales-detail/sales-detail.component';

const routes: Routes = [
    { path: "", component:HomeComponent,canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'xyz', component: DashboardComponent,canActivate: [AuthGuard]  },
  { path: 'dashboard', component: InspectionDashboardComponent,canActivate: [AuthGuard]  },
  { path: 'dashboard1', component: DefectDashboardComponent,canActivate: [AuthGuard]  },
  { path: 'additem', component: AdditemComponent,canActivate: [AuthGuard]  },
  { path: 'itemmsts', component: ViewitemComponent,canActivate: [AuthGuard]  },
  { path: 'addproduction', component: AddproductionComponent,canActivate: [AuthGuard]  },
  { path: 'productions', component: ViewproductionComponent,canActivate: [AuthGuard]  },
  { path: 'companydropdown', component: CompanyDropdownComponent,canActivate: [AuthGuard]  },
  { path: 'yeardropdown', component: YearDropdownComponent,canActivate: [AuthGuard]  },
  { path: 'roles', component: RolesComponent,canActivate: [AuthGuard]  },
  { path: 'rolepages', component: RolepagesComponent,canActivate: [AuthGuard]  },
  { path: 'roletouser', component: RolestouserComponent,canActivate: [AuthGuard]  },
  { path: 'roletopages', component: RolestopagesComponent,canActivate: [AuthGuard]  },
  { path: 'calendar', component: QualityCalenderComponent,canActivate: [AuthGuard]  },
  { path: 'jobWorkMaterial', component: ViewJobworkComponent,canActivate: [AuthGuard]  },
  { path: 'addjobwork', component: AddjobworkComponent,canActivate: [AuthGuard]  },
  { path: 'rejvalue', component: ProductionValSummaryComponent,canActivate: [AuthGuard]  },
  { path: 'mouldconscalendar', component: ConsumptionCalendarComponent,canActivate: [AuthGuard]  },
  { path: 'rejection-main', component: RejectionDetailComponent,canActivate: [AuthGuard]  },
  { path: 'rejection-detail', component: RejectionSummaryComponent,canActivate: [AuthGuard]  },
  { path: 'rejection', component: RejectionComponent,canActivate: [AuthGuard]  },
  { path: 'addroundhour', component: AddroundhoursComponent,canActivate: [AuthGuard]  },
  { path: 'roundhours', component: RoundhoursComponent,canActivate: [AuthGuard]  },
  { path: 'salesinfo', component: SalesinfoComponent,canActivate: [AuthGuard]  },
  { path: 'salesitem', component: SalesItemComponent,canActivate: [AuthGuard]  },
  { path: 'salesdetail', component: SalesDetailComponent,canActivate: [AuthGuard]  },

  { path: "**", redirectTo: "" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
