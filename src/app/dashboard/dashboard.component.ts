import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authenticationService: LoginService,private route: Router) { }

  ngOnInit() {
  }

  // logout() {
  //   this.authenticationService.logout();
  //   this.route.navigate(["/login"]);
  // }

}
