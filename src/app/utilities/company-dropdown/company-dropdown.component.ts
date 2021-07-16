import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/shared/login/login.service';
import { User } from 'src/app/shared/login/User.model';
import { Plant } from 'src/app/shared/plant/plant.model';
import { PlantService } from 'src/app/shared/plant/plant.service';

@Component({
  selector: 'app-company-dropdown',
  templateUrl: './company-dropdown.component.html',
  styleUrls: ['./company-dropdown.component.css']
})
export class CompanyDropdownComponent implements OnInit {

  currentUser: User;
  @Input() flag: boolean;
  @Output() plantEvent = new EventEmitter<string>(); 
  plantlistc: Plant[];  //plant list for child component
  plantcodec: string; //plant code for child component

  constructor(public plantservice: PlantService, public lservice: LoginService) { 
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    const me = this;
   // this.flag = false;
    if(this.flag)
    {
      this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = [];
        const splantlist = res as Plant[];
        splantlist.forEach(splant => {
          if (splant.plantcode == "1040" || splant.plantcode == "1050") {
            me.plantservice.splantlist.push(splant);
            console.log("Here",me.plantservice.splantlist);
          }
        });
      });
    }
    else{
      this.plantservice.getPlantData(this.currentUser.id);
    // this.plantservice.plantcode = '1010';
    }
    this.plantcodec = '1010';
  }

  onPlantChange(plantcode){
    console.log(plantcode);
    this.plantEvent.emit(plantcode);
  }

}