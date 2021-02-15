import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login/login.service';
import { User } from 'src/app/shared/login/User.model';
import { YearService } from 'src/app/shared/yearService/year.service';

@Component({
  selector: 'app-year-dropdown',
  templateUrl: './year-dropdown.component.html',
  styleUrls: ['./year-dropdown.component.css']
})
export class YearDropdownComponent implements OnInit {
  currentUser: User;
  selectedYear: string;


  constructor(public yservice: YearService, public lservice: LoginService) { 
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    this.selectedYear = '2021';
    this.yservice.refreshList();
  }

}
