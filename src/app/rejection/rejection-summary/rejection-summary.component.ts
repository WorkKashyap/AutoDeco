import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DailyproductionService } from "src/app/shared/dailyproduction/dailyproduction.service";
import { Itemwiserej } from "src/app/shared/dailyproduction/itemwiserej.model";
import { TopDefect } from "src/app/shared/dailyproduction/topdefect.model";
import { LoginService } from "src/app/shared/login/login.service";
import { User } from "src/app/shared/login/User.model";
import { Plant } from "src/app/shared/plant/plant.model";
import { PlantService } from "src/app/shared/plant/plant.service";

@Component({
  selector: "app-rejection-summary",
  templateUrl: "./rejection-summary.component.html",
  styleUrls: ["./rejection-summary.component.css"],
  providers: [DatePipe],
  styles: [
    `
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
        overflow-x: initial !important;
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
export class RejectionSummaryComponent implements OnInit {
  currentUser: User;
  Fromdate: string;
  cDate: string;
  Todate: string;
  selectedType: string;
  cols: any[];
  subcols: any[];
  plantcode: any;
  selected_plantname: any;
  selectedItemrej: Itemwiserej;
  filterItemrejarray: Itemwiserej[] = [];

  plantlistc: Plant[] = [];

  totalBuffQty: number = 0;
  totalBuffVal: number = 0;
  totalHoldQty: number = 0;
  totalHoldVal: number = 0;

  totalRejQty: number = 0;
  totalRejPer: number = 0;
  totalRejVal: number = 0;

  totalRejPer2: number = 0;

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

  totalQtySum: number = 0;
  totalRejValueSum: number = 0;

  totalOthers_value: number = 0;
  totalOthersqty: number = 0;

  iv: number;
  filterenable = false;

  constructor(
    public datePipe: DatePipe,
    public DPservice: DailyproductionService,
    public plantservice: PlantService,
    public lservice: LoginService,
    public route: Router,private spinner: NgxSpinnerService

  ) {
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.selectedType = "zcrm";
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }
  onselecttype(type) {
    this.selectedType = type;
  }

  onviewDetail() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
    this.filterenable = false;
    this.DPservice.itemwiserejlist = [];

    if (this.selectedType != " ") {
      this.selectedType = this.selectedType;
    } else {
      this.selectedType = "NULL";
    }

    this.DPservice.getRejectdetail(
      this.plantcode,
      this.selectedType,
      this.Fromdate,
      this.Todate
    )
      .toPromise()
      .then((res) => {
        this.DPservice.itemwiserejlist = res as Itemwiserej[];
        this.rejectpersum();
      });
      this.rejectpersum();
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
    const me = this;
    this.spinner.show("spinner1");
    this.spinner.hide("spinner2");

    setTimeout(() => {
      this.spinner.hide("spinner1");
      this.spinner.hide("spinner2");
    }, 2000);

    // this.plantcode = '1010';
    this.plantservice.plantcode = this.plantcode;
    this.DPservice.plantshortname = "GDPL Vapi";
    this.plantservice.getPlantData(this.currentUser.id);


    if(!this.DPservice.plantcode)
    {
      console.log("not initialized",this.plantcode);
      this.plantcode= '1010';
      this.DPservice.plantcode = '1010';
    }
    else{
      console.log("initialized",this.DPservice.plantcode);
      this.plantcode = this.DPservice.plantcode;
    }

    if(!this.DPservice.date)
    {
      this.Fromdate = this.cDate;
      this.Todate = this.cDate;
    }
    else
    {      
      this.Fromdate = this.DPservice.date.replace("T00:00:00","");
      this.Todate = this.DPservice.date.replace("T00:00:00","");
    }

    this.cols = [
      { field: "itemCode", header: "Code" },
      { field: "itemName", header: "Name" },

      { field: "inspection_qty", header: "Insp. qty" },
      { field: "okqty", header: "Ok qty" },
      { field: "reject_qty", header: "Reject qty" },
      { field: "mouldingqty", header: "Moulding qty " },
      { field: "platingqty", header: "Plating qty" },

      { field: "inspection_value", header: "Insp. Value" },
      { field: "okvalue", header: "Ok Value" },
      { field: "reject_value", header: "Reject Val" },
      { field: "rejper", header: "Rej %" },

      { field: "holdqty", header: "Hold Qty" },
      { field: "holdvalue", header: "Hold Val" },
      { field: "buffingqty", header: "Buffing Qty" },
      { field: "buffingvalue", header: "Buffing Val" },

      { field: "moulding_value", header: "Moulding Val" },
      { field: "plating_value", header: "Plating Val" },

      { field: "othersqty", header: "Others Qty" },
      { field: "othersvalue", header: "Others Val" },
    ];

    this.subcols = [
      { field: "id", header: "ID" },
      { field: "ordertype", header: "Type" },
      { field: "defect", header: "Defect" },
      { field: "totalqty", header: "Total Qty" },
      { field: "rejvalue", header: "Reject Value" },
    ];

    if (this.plantcode) {
      console.log(this.plantcode);
      this.plantservice
        .sgetPlantData(me.currentUser.id)
        .toPromise()
        .then((res) => {
          this.plantlistc = res as Plant[];
          this.plantlistc.forEach((splant) => {
            if (splant.plantcode == this.plantcode) {
              console.log(splant.plantcode);
              this.selected_plantname = splant.plantShortName;
              console.log(this.selected_plantname);
            }
          });
        });

      me.DPservice.getRejectdetail(
        this.plantcode,
        "NULL",
        me.Fromdate,
        me.Todate
      )
        .toPromise()
        .then((res) => {
          me.DPservice.itemwiserejlist = res as Itemwiserej[];
          me.rejectpersum();
          // me.loading = false;
        });
    }
  }

  getPlant(plantc) {
    if (plantc) {
      const me = this;
      this.plantcode = plantc;
      this.DPservice.plantcode = this.plantcode;

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
  backtoRejection() {
    this.route.navigate(["./rejection"]);
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

  onRowSelect(event) {
    this.selectedItemrej = event.data;
    console.log(this.selectedItemrej);


    this.DPservice.itemtopdefectlist = [];
    this.DPservice.getRejectdefectdetail2(
      this.selectedItemrej.plant,
      this.selectedItemrej.item_type,
      this.Fromdate,
      this.Todate,
      this.selectedItemrej.itemcode
    )
      .toPromise()
      .then((res) => {
        this.DPservice.itemtopdefectlist = res as TopDefect[];
      });
    (<any>$("#basicExampleModal")).modal("show");
  }

  rejectpersum() {
    this.totalinsValue = 0;
    this.totalokValue = 0;
    this.totalokqtyValue = 0;

    this.totalMouldedQty = 0;
    this.totalMouldedPer = 0;

    this.totalPlantingQty = 0;
    this.totalPlantingPer = 0;

    this.totalRejVal = 0;

    this.totalMouldedVal = 0;
    this.totalPlantingVal = 0;

    this.totalBuffQty = 0;
    this.totalBuffVal = 0;

    this.totalHoldQty = 0;
    this.totalHoldVal = 0;

    this.totalRejPer2 = 0;

    this.totalOthersqty = 0;
    this.totalOthers_value = 0;

      this.totalRejQty = 0;
      this.totalinsQty = 0;
      this.totalRejPer = 0;
      for (const rq of this.DPservice.itemwiserejlist) {
        this.totalOthersqty += rq.othersqty;
        this.totalOthers_value += rq.othersvalue;

        const rejqty = rq.reject_qty;
        const insqty = rq.inspection_qty;
        //
        this.totalRejQty += rejqty;
        this.totalinsQty += insqty;
        //
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
      
      this.totalRejPer2 = (this.totalRejVal * 100) / this.totalinsValue;
    }
    if (!this.totalRejPer2) {
      this.totalRejPer2 = 0;
    }
    return this.totalRejPer2;
  }
}
