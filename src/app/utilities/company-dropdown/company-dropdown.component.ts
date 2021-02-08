import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/shared/login/login.service';
import { User } from 'src/app/shared/login/User.model';
import { PlantService } from 'src/app/shared/plant/plant.service';

@Component({
  selector: 'app-company-dropdown',
  templateUrl: './company-dropdown.component.html',
  styleUrls: ['./company-dropdown.component.css']
})
export class CompanyDropdownComponent implements OnInit {

  currentUser: User;
  @Output() plantEvent = new EventEmitter<string>(); 


  constructor(public plantservice: PlantService, public lservice: LoginService) { 
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    this.plantservice.getPlantData(this.currentUser.id);
    this.plantservice.plantcode = '1010';
  }

  onPlantChange(plantcode){
    this.plantEvent.emit(plantcode);
  }

}
