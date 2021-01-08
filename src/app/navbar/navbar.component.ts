import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login/login.service';
import { User } from '../shared/login/User.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
currentUser: User;
  constructor(private authenticationService: LoginService, private route: Router) {
    this.authenticationService.currentUser.subscribe(
      x=> (this.currentUser = x)
    );
   }

  ngOnInit() {
    if (this.authenticationService.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      // console.log(this.currentUser);
}
  }

  logout() {
    this.authenticationService.logout();
    this.route.navigate(["/login"]);
  }

}
