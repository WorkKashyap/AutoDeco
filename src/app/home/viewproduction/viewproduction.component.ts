import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared/login/login.service';
import { User } from 'src/app/shared/login/User.model';
import { Plant } from 'src/app/shared/plant/plant.model';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { production } from 'src/app/shared/production/production.model';
import { ProductionService } from 'src/app/shared/production/production.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-viewproduction',
  templateUrl: './viewproduction.component.html',
  styleUrls: ['./viewproduction.component.css']
})
export class ViewproductionComponent implements OnInit {
  public currentUser: User;
  public selectedcode: any;
  public loading = false;
  cols : any;
  productionlist2: any = [];
  plantcode:string;
  flag: boolean;
  
  constructor(
      private service:ProductionService,
      private router:Router,  
      private toastr: ToastrService,
      public plantservice: PlantService,
      public lservice:LoginService,
      private spinner: NgxSpinnerService) {
        this.lservice.currentUser.subscribe(x => (this.currentUser = x));
       }

  ngOnInit() {
    this.flag = true;
    //to get user from localstorage
    // this.currentUser=JSON.parse(localStorage.getItem('currentUser'));

    const me = this;
   // this.service.loading = true;
   this.spinner.show();

    this.service.refresList();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
    this.cols = [
      { field: "view", header: "Action" ,width:"5px"},
      { field: "pstngdate", header: "Posting Date" ,width:"30px"},
      { field: "insplot", header: "Insplot" ,width:"42px"},
      { field: "orderno", header: "Orderno" ,width:"42px"},
      { field: "qty", header: "Qty" ,width:"5px"},
      { field: "plantcode", header: "Plant code" ,width:"5px"},
      { field: "itemcode", header: "Itemcode" ,width:"30px"},
      { field: "itemname", header: "Itemname" ,width:"70px"},
      { field: "size", header: "Size" ,width:"30px"},
      { field: "type", header: "Type" ,width:"20px"},
      { field: "okqty", header: "Okqty" ,width:"5px"},
      { field: "holdqty", header: "Holdqty" ,width:"5px"},
      { field: "buffingqty", header: "Buffingqty" ,width:"5px"},
      { field: "rejectionqty", header: "Rejectionqty" ,width:"5px"},
    ];
    this.plantcode="1040";
    this.getDetail();
  }
  //get plantcode from child component , assign it into a variable
  getPlant(plantc){
    if(plantc)
    {
      //this.plantservice.plantcode = plantc;
      this.plantcode = plantc;
      this.getDetail();
    }
  }
  //fetching data according to plantcode
  getDetail() {
    let me = this;
    me.loading = true;
    // me.service.productionlist = [];
    me.service.productions(me.plantcode).toPromise().then(res => {
      me.productionlist2 = res as production[];
      me.getFilterData();
      // me.productionsService.productionlist = res as Productions[];
      me.loading = false;
    }, err => {
      me.loading = false;
    });
  }
  //comparing and getting data of only plantcode 1040 and 1050
  getFilterData() {
    let me = this;
    me.loading = true;
    me.service.productionlist = [];

    if (me.productionlist2 && me.productionlist2.length) {
      me.productionlist2.forEach(prdEle => {
        if (prdEle.plantcode == me.plantcode) {
          me.service.productionlist.push(prdEle);
        }
      });
      me.loading = false;
    } else {
      me.loading = false;
    }
  }

  displayProductiondata()
  {
    this.router.navigate(['/addproduction']);
  }

  ViewDetail(id)
  {
    this.service.pid=id;
    this.service.getProductionDetailbyID(this.service.pid);
    this.router.navigate(['/addproduction']);
  }
}
