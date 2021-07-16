import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Dailyproduction } from "../shared/dailyproduction/dailyproduction.model";
import { DailyproductionService } from "../shared/dailyproduction/dailyproduction.service";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { Plant } from "../shared/plant/plant.model";
import { PlantService } from "../shared/plant/plant.service";
import { RejectionDetailComponent } from "./rejection-detail/rejection-detail.component";
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-rejection",
  templateUrl: "./rejection.component.html",
  styleUrls: ["./rejection.component.css"],
  providers: [DatePipe],
})
export class RejectionComponent implements OnInit {
  currentUser: User;
  cDate: string;
  Fromdate: string;
  Todate: string;
  selectedPlant: string;
  plantcode: any;
  marked = false;
  modename: string;
  mode: string;
  plantcodec: string;
  selected_plantname: string;
  // p = {};
  plantlistc: Plant[] = [];
  constructor(
    public datePipe: DatePipe,
    public DPservice: DailyproductionService,public route:Router,public plantservice:PlantService,public lservice: LoginService,private spinner: NgxSpinnerService
  ) {
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.lservice.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    
    const me=this;
    this.Fromdate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.Todate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.plantcode = this.DPservice.plantcode;
    console.log(this.DPservice.plantcode);
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = [];
        const splantlist = res as Plant[];
        splantlist.forEach(splant => {
         me.plantservice.splantlist.push(splant);
        });
      });
   
    this.plantcodec = '1010';
  }

  plantchange(ev) {
    console.log(ev);
    this.DPservice.plantcode = ev;
    this.selectedPlant = ev;
  }
  // getPlant(plantc) {
  //   if (plantc) {
  //     this.plantcode = plantc;
  //   }
  // }

  checkchange(e)
  {
    this.marked = e.target.checked;
  }

  Loadrecord() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
    
    if (this.marked == true) {
      this.modename = "";
      this.mode = "";
      this.DPservice.getDailyPReject(this.DPservice.plantcode, this.Fromdate, this.Todate)
        .toPromise()
        .then((res) => {
          this.DPservice.dailyprodlist = res as Dailyproduction[];
        });
    } else {
      this.DPservice.getDailyPRejectmode(this.DPservice.plantcode, this.mode)
        .toPromise()
        .then((res) => {
          this.DPservice.dailyprodlist = res as Dailyproduction[];
        });
    }
  }


  openRejectionDetail(id,date)
  {
    console.log(id);
    console.log(date);
    // this.DPservice.plantcode = plant;
    this.DPservice.date = date;
    // console.log("onRejectiondetail",this.DPservice.date);

    // this.loading = true;
    if(!this.DPservice.date)
    {
      // console.log("not assigned not oninit");
      this.Fromdate = this.cDate;
      this.Todate = this.cDate;
    }
    else
    {
      // console.log("assigned not on init");
      this.Fromdate = this.DPservice.date;
      this.Todate = this.DPservice.date;
      
    }

    if(this.selectedPlant != null)
    {
      this.DPservice.plantcode =this.selectedPlant;
    }
    this.route.navigate(['./rejection-detail']);

  }

  monthClick() {
    this.mode = "M";
    this.modename = "Current Month";

    this.DPservice.getDailyPRejectmode(this.selectedPlant, this.mode)
      .toPromise()
      .then((res) => {
        this.DPservice.dailyprodlist = res as Dailyproduction[];
      });
  }
  weekClick() {
    this.mode = "W";
    this.modename = "Current Week";

    this.DPservice.getDailyPRejectmode(this.selectedPlant, this.mode)
      .toPromise()
      .then((res) => {
        this.DPservice.dailyprodlist = res as Dailyproduction[];
      });
  }

  dayClick() {
    this.mode = "D";
    this.modename = "Today";

    this.DPservice.getDailyPRejectmode(this.selectedPlant, this.mode)
      .toPromise()
      .then((res) => {
        this.DPservice.dailyprodlist = res as Dailyproduction[];
      });
  }
}
