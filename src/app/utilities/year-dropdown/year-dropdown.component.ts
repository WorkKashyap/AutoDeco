import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/shared/login/login.service';
import { User } from 'src/app/shared/login/User.model';
import { YearService } from 'src/app/shared/yearService/year.service';

@Component({
  selector: 'app-year-dropdown',
  templateUrl: './year-dropdown.component.html',
  styleUrls: ['./year-dropdown.component.css']
})
export class YearDropdownComponent implements OnInit {

  @Input() currentyear: any;
  //@Output() yearEvent = new EventEmitter<string>(); 
  year: number;
  d:any;

  currentUser: User;
  
    constructor(public yservice: YearService, public lservice: LoginService) { 
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    this.d = new Date();
    this.year = this.d.getFullYear();
    localStorage.setItem('selectedYear', JSON.stringify(this.year));
    this.yservice.refreshList();
  }

  onYearChange(year)
  {
    //this.yearEvent.emit(year);
    localStorage.setItem('selectedYear', JSON.stringify(this.year));
  }

}
