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
import { ViewJobworkComponent } from './home/view-jobwork/view-jobwork.component';

const routes: Routes = [
  // { path: '', component: HomeComponent},
 
  { path: "", component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]  },
  { path: 'view-jobwork', component: ViewJobworkComponent,canActivate: [AuthGuard]  },
  { path: 'addjobwork', component: AddjobworkComponent,canActivate: [AuthGuard]  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
