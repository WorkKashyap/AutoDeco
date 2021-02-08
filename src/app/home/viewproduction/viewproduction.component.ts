import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/login/User.model';
import { Plant } from 'src/app/shared/plant/plant.model';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { production } from 'src/app/shared/production/production.model';
import { ProductionService } from 'src/app/shared/production/production.service';

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
  
  constructor(
      private service:ProductionService,
      private router:Router,  
      private toastr: ToastrService,
      public plantservice: PlantService) { }

  ngOnInit() {
    //to get user from localstorage
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));

    const me = this;
    this.service.loading = true;
    this.service.refresList();
    this.cols = [
    { field: "view", header: "Action" },
    { field: "pstngdate", header: "Posting Date" },
    { field: "insplot", header: "Insplot" },
    { field: "orderno", header: "Orderno" },
    { field: "qty", header: "Qty" },
    { field: "plantcode", header: "Plantcode" },
    { field: "itemcode", header: "Itemcode" },
    { field: "itemname", header: "Itemname" },
    { field: "size", header: "Size" },
    { field: "type", header: "Type" },
    { field: "okqty", header: "Okqty" },
    { field: "holdqty", header: "Holdqty" },
    { field: "buffingqty", header: "Buffingqty" },
    { field: "rejectionqty", header: "Rejectionqty" },
  ];
  // console.log(me.currentUser.id);
  this.plantservice
  .sgetPlantData(me.currentUser.id)
  .toPromise()
  .then(res => {
    me.plantservice.splantlist = [];
    const splantlist = res as Plant[];
    splantlist.forEach(splant => {
      if (splant.plantcode == "1040" || splant.plantcode == "1050") {
        me.plantservice.splantlist.push(splant);
        // me.selectedcode = ''//me.plantservice.splantlist[0].plantcode;
      }
    });
    // me.plantservice.splantlist = res as Plant[];
    // console.log(splantlist[0]);
    // console.log(splantlist[0].plantcode);
    me.selectedcode = me.plantservice.splantlist[0].plantcode;
    me.getDetail();
  });
  }
  
  getDetail() {
    let me = this;

    // console.log(me.selectedcode);

    me.loading = true;
    me.service.productionlist = [];
    me.service.productions(me.selectedcode).toPromise().then(res => {
      me.productionlist2 = res as production[];
      me.getFilterData();
      // me.productionsService.productionlist = res as Productions[];
      me.loading = false;
    }, err => {
      me.loading = false;
    });
  }

  selectedPlant(ev) {
    this.selectedcode = ev;
    //  this.getFilterData()
    this.getDetail()
  }
  getFilterData() {
    let me = this;
    me.loading = true;
    me.service.productionlist = [];

    if (me.productionlist2 && me.productionlist2.length) {
      me.productionlist2.forEach(prdEle => {
        if (prdEle.plantcode == me.selectedcode) {
          me.service.productionlist.push(prdEle);
          // console.log(prdEle);
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

  // onDelete(id){
  //     if(confirm('Are you sure?')){
  //       this.service.deleteproduction(id).subscribe(
  //       res => {
  //       this.service.refresList();
  //       this.toastr.success('Deleted Successfully','Production');
  //       },
  //       err => {
  //         console.log(err)
  //       }
  //       )
  //     }
  //   }
}
