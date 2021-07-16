import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DailyproductionService } from "src/app/shared/dailyproduction/dailyproduction.service";
import { ItemwiseRejDetail } from "src/app/shared/dailyproduction/itemwiserejdetail.model";
import { TopDefect } from "src/app/shared/dailyproduction/topdefect.model";
import { LoginService } from "src/app/shared/login/login.service";
import { User } from "src/app/shared/login/User.model";
import { Plant } from "src/app/shared/plant/plant.model";
import { PlantService } from "src/app/shared/plant/plant.service";

@Component({
  selector: "app-rejection-detail",
  templateUrl: "./rejection-detail.component.html",
  styleUrls: ["./rejection-detail.component.css"],
  providers: [DatePipe],
  styles: [
    `
    ::ng-deep  .ui-table table, .ui-table table
    {  table-layout:fixed !important;
    }
    ::ng-deep .ui-table-tablewrapper {
        width: auto!important;
    }
    
    ::ng-deep .ui-table-resizable {
        padding-bottom: 1px;
        /* overflow: auto; */
        width: auto !important;
    }
      :host ::ng-deep .ui-table .ui-table-thead > tr > th {
        position: -webkit-sticky;
        position: sticky;
        background: blue;
        color: white;
        font-size: 10px;
        top: 0px;
        z-index: 1;
        padding: 0.571em 0.857em !important;
      }

      :host ::ng-deep .ui-table .ui-table-tbody > tr > td {
        padding: 0.571em 0.857em !important;
      }

      :host ::ng-deep .ui-table-resizable > .ui-table-wrapper {
        overflow-x: hidden !important;
      }

      :host ::ng-deep .ui-table-resizable .ui-resizable-column {
        position: sticky !important;
      }

      @media screen and (max-width: 64em) {
        :host ::ng-deep .ui-table .ui-table-thead > tr > th {
          top: 0px;
        }
      }
    `,
  ],
})
export class RejectionDetailComponent implements OnInit {
  currentUser: User;
  selectedType: any;
  filterenable: boolean = false;
  plantcode: string;
  iv: number;
  cols: any[];
  subcols: any[];


  selectedItemrej: ItemwiseRejDetail;

  selectedItemrejarray: ItemwiseRejDetail[] = [];
  filterItemrejarray: ItemwiseRejDetail[] = [];

  plantlistc: Plant[] = [];

  public totalRejValueSum: any;
  public totalQtySum: any;
  public plant_name: string;

  totalRejQty: number = 0;
  totalRejPer: number = 0;
  totalRejVal: number = 0;

  totalBuffQty: number = 0;
  totalBuffVal: number = 0;
  totalHoldQty: number = 0;
  totalHoldVal: number = 0;

  totalinsQty: number = 0;
  totalinsValue: number = 0;

  totalokValue: number = 0;
  totalokqtyValue: number = 0;

  totalMouldedQty: number = 0;
  totalMouldedPer: number = 0;
  totalMouldedVal: number = 0;

  totalPlantingQty: number = 0;
  totalPlantingPer: number = 0;

  totalPlantingVal: number = 0;

  totalOthers_value: number = 0;
  totalOthersqty: number = 0;
  cDate: string;
  Fromdate: string;
  Todate: string;
  selected_plantname: string;

  constructor(
    public datePipe: DatePipe,
    public DPservice: DailyproductionService,
    public plantservice: PlantService,
    public lservice: LoginService,
    public route:Router,
    public spinner: NgxSpinnerService
  ) {
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.selectedType = "CHROME";
    this.lservice.currentUser.subscribe((x) => (this.currentUser = x));
    if(!this.DPservice.date)
    {
      // console.log("not assigned");
      this.Fromdate = this.cDate;
      this.Todate = this.cDate;
    }
    else
    {
      // console.log("assigned");
      console.log("in rejection deatil",this.DPservice.date);
      this.Fromdate = this.DPservice.date;
      this.Todate = this.DPservice.date;
    }
  }
  onselecttype(type) {
    this.selectedType = type;
  }

  ngOnInit() {
    this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
          }, 2500);

    const me = this;
    this.plantcode = '1010';
    this.DPservice.plantcode = '1010';
    this.DPservice.plantshortname = "GDPL Vapi";
    // console.log("In rejection detail component ngOnInit",this.DPservice.date);

    if(!this.DPservice.date)
    {
      // console.log("not assigned");
      this.Fromdate = this.cDate;
      this.Todate = this.cDate;
    }
    else
    {
      // console.log("assigned");
      console.log("in rejection deatil",this.DPservice.date);
      this.Fromdate = this.DPservice.date;
      this.Todate = this.DPservice.date;
    }
    
    this.cols = [
      //  { field: 'id', header: 'ID' },
      { field: "pstngdate", header: "Posting Date" },
      { field: "insplot", header: "Insplot" },
      { field: "item_type", header: "Type" },
      { field: "itemCode", header: "Code" },
      { field: "itemName", header: "Name" },
      { field: "inspection_qty", header: "Insp. qty" },
      { field: "inspection_value", header: "Insp. value" },
      { field: "okvalue", header: "Ok Value" },
      { field: "okqty", header: "Ok qty" },

      { field: "reject_qty", header: "Reject qty" },
      { field: "rejper", header: "Rej %" },
      { field: "reject_value", header: "Reject val" },

      { field: "holdqty", header: "Hold Qty" },
      //{ field: 'holdvalue', header: 'Hold Val' },
      { field: "buffingqty", header: "Buffing Qty" },
      //  { field: 'buffingvalue', header: 'Buffing Val' },

      { field: "mouldingqty", header: "Moulding Defect qty" },
      { field: "moulding_value", header: "Moulding val" },
      { field: "platingqty", header: "Plating Defect qty" },
      { field: "plating_value", header: "Plating val" },
      { field: "othersqty", header: "Others qty" },
      { field: "others_value", header: "Others value" },
    ];

    this.subcols = [
      // { field: 'id', header: 'ID' },
      { field: "inspectiondate", header: "Date" },
      { field: "ordertype", header: "Type" },
      { field: "defect", header: "Defect" },
      { field: "totalqty", header: "Total Qty" },
      { field: "rejvalue", header: "Reject Value" }
    ];

    if (this.plantcode) {
      this.plantservice
        .sgetPlantData(me.currentUser.id)
        .toPromise()
        .then((res) => {
          this.plantlistc = res as Plant[];
          this.plantlistc.forEach((splant) => {
            if (splant.plantcode == this.plantcode) {
              this.selected_plantname = splant.plantShortName;
            }
          });
        });

      this.DPservice.itemwiserejdetaillist = [];

      this.DPservice.getRejectmaindetail(
        this.plantcode,
        this.selectedType,
        this.Fromdate,
        this.Todate
      )
        .toPromise()
        .then((res) => {
          this.DPservice.itemwiserejdetaillist = res as ItemwiseRejDetail[];
          this.rejectpersum();
          
          
        });
      this.rejectpersum();
    }
  }

  

  

  onviewDetail() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);

    this.filterenable = false;
   
    if (this.selectedType != "") {
      this.selectedType = this.selectedType;
    } else {
      this.selectedType = "NULL";
    }
    console.log(this.plantcode,this.selectedType,this.Fromdate,this.Todate);
    this.DPservice.getRejectmaindetail(
      this.plantcode,
      this.selectedType,
      this.Fromdate,
      this.Todate
    )
      .toPromise()
      .then((res) => {
        this.DPservice.itemwiserejdetaillist = res as ItemwiseRejDetail[];
        this.rejectpersum();
      });
    console.log(this.DPservice.itemwiserejdetaillist);

    this.rejectpersum();
  }
  totalQty() {
    this.totalQtySum = 0;

    if (this.DPservice.itemtopdefectlist) {
      for (const rq of this.DPservice.itemtopdefectlist) {
        this.totalQtySum += rq.totalqty;
      }
    }
    return this.totalQtySum;
  }

  totalRejValue() {
    this.totalRejValueSum = 0;

    if (this.DPservice.itemtopdefectlist) {
      for (const rq of this.DPservice.itemtopdefectlist) {
        this.totalRejValueSum += rq.rejvalue;
      }
    }
    return this.totalRejValueSum;
  }
  backtoRejection() {
    // this.plantcode = this.DPservice.plantcode;
    // this.Fromdate = this.DPservice.date;
    this.route.navigate(["./rejection"]);
  }
  getPlant(plantc) {
    if (plantc) {
      const me = this;
      this.plantcode = plantc;
      this.DPservice.plantcode = plantc;
      console.log( this.DPservice.plantcode);
      this.plantservice
        .sgetPlantData(me.currentUser.id)
        .toPromise()
        .then((res) => {
          this.plantlistc = res as Plant[];
          this.plantlistc.forEach((splant) => {
            if (splant.plantcode == this.plantcode) {
              this.selected_plantname = splant.plantShortName;
            }
          });
        });
    }
  }
  onRowSelect(ev) {
    this.selectedItemrej = ev.data;
    // this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.DPservice.getRejectdefectdetail(
      this.selectedItemrej.plant,
      this.selectedItemrej.item_type,
      this.selectedItemrej.pstngdate.replace("T00:00:00", ""),
      this.selectedItemrej.pstngdate.replace("T00:00:00", ""),
      this.selectedItemrej.itemCode
    )
      .toPromise()
      .then((res) => {
        this.DPservice.itemtopdefectlist = res as TopDefect[];
        // this.loading = false;
      });
    (<any>$("#basicExampleModal")).modal("show");
  }
  

  rejectpersum() {
    this.totalinsValue = 0;
    this.totalokValue = 0;
    this.totalokqtyValue = 0;

    this.totalMouldedQty = 0;
    this.totalMouldedPer = 0;

    this.totalPlantingPer = 0;
    this.totalPlantingQty = 0;

    this.totalMouldedVal = 0;
    this.totalPlantingVal = 0;

    this.totalRejQty = 0;
    this.totalinsQty = 0;
    this.totalRejPer = 0;

    this.totalRejVal = 0;

    this.totalBuffQty = 0;
    this.totalBuffVal = 0;
    this.totalHoldQty = 0;
    this.totalHoldVal = 0;

    this.totalOthersqty = 0;
    this.totalOthers_value = 0;

    // if (this.filterenable == true) {
    //   for (const rq of this.filterItemrejarray) {
    //     this.totalOthersqty += rq.othersqty;
    //     this.totalOthers_value += rq.Others_value;

    //     //
    //     this.totalRejQty += rq.reject_qty;
    //     this.totalRejVal += rq.reject_value;
    //     this.totalinsQty += rq.inspection_qty;
    //     //
    //     this.totalokValue += rq.okvalue;
    //     this.totalokqtyValue += rq.okqty;
    //     this.totalinsValue += rq.inspection_value;

    //     this.totalMouldedQty += rq.mouldingqty;
    //     this.totalMouldedPer += rq.mouldingper;

    //     this.totalPlantingPer += rq.platingper;
    //     this.totalPlantingQty += rq.platingqty;

    //     this.totalMouldedVal += rq.moulding_value;
    //     this.totalPlantingVal += rq.plating_value;

    //     this.totalHoldVal += rq.holdvalue;
    //     this.totalHoldQty += rq.holdqty;
    //     this.totalBuffQty += rq.buffingqty;
    //     this.totalBuffVal += rq.buffingvalue;
    //   }
    // } else {
      this.filterenable=false;
      for (const rq of this.DPservice.itemwiserejdetaillist) {
        this.totalOthersqty += rq.othersqty;
        this.totalOthers_value += rq.others_value;
        
        this.totalRejQty += rq.reject_qty;
        this.totalinsQty += rq.inspection_qty;
        this.totalRejVal += rq.reject_value;
        
        this.totalokValue += rq.okvalue;
        this.totalokqtyValue += rq.okqty;
        this.totalinsValue += rq.inspection_value;

        this.totalMouldedQty += rq.mouldingqty;
        this.totalMouldedPer += rq.mouldingper;

        this.totalPlantingPer += rq.platingper;
        this.totalPlantingQty += rq.platingqty;

        this.totalMouldedVal += rq.moulding_value;
        this.totalPlantingVal += rq.plating_value;

        this.totalHoldVal += rq.holdvalue;
        this.totalHoldQty += rq.holdqty;
        this.totalBuffQty += rq.buffingqty;
        this.totalBuffVal += rq.buffingvalue;
      
    }
    //this.totalRejPer = (this.totalRejQty / this.totalinsQty) * 100;
    return;
  }
}
