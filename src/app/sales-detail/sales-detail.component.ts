import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DailyproductionService } from "../shared/dailyproduction/dailyproduction.service";
import { Salesdetail } from "../shared/dailyproduction/salesdetail.model";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { Plant } from "../shared/plant/plant.model";
import { PlantService } from "../shared/plant/plant.service";

@Component({
  selector: "app-sales-detail",
  templateUrl: "./sales-detail.component.html",
  styleUrls: ["./sales-detail.component.css"],
  providers: [DatePipe],
  styles: [
    `
      :host ::ng-deep .ui-table .ui-table-thead > tr > th {
        position: -webkit-sticky;
        position: sticky;
        background: blue;
        color: white;
        font-size: 9px;
        top: 0px;
        z-index: 1;
      }
      body .ui-table .ui-table-tbody > tr > td {
        font-size: 9px;
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
export class SalesDetailComponent implements OnInit {
  public currentUser: User;
  public cDate: string;
  public selectedtype: string;
  public Fromdate: string;
  public Todate: string;
  cols: any[];
  plantcode: string;
  totalSumofValue: number = 0;
  salesDetailInfo: Salesdetail[] = [];
  selectedItemrejarray: Salesdetail[] = [];
  filterItemrejarray: Salesdetail[] = [];
  iv: number;
  filterenable = false;
  public selectedPlant: string;


  constructor(
    private lservice: LoginService,
    public dpservice: DailyproductionService,
    private router: Router,
    private datePipe: DatePipe,
    public plantservice: PlantService,
    private spinner: NgxSpinnerService
  ) {
    this.lservice.currentUser.subscribe((x) => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.selectedtype = "netSales";
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
    let me = this;
    this.plantcode="1010";
    if (!this.dpservice.date) {
      console.log(this.dpservice.date);
      this.Fromdate = this.cDate;
      this.Todate = this.cDate;
    } else {
      this.Fromdate = this.dpservice.date.replace("T00:00:00", "");
      this.Todate = this.dpservice.date.replace("T00:00:00", "");
    }

    this.cols = [
      { field: "plantName", header: "Plant Name" },
      //{ field: 'billingDocTYPE', header: 'Billingdoctype' },
      { field: "invoiceNumber", header: "Invoiceno" },
      //{ field: 'accDocNo', header: 'Accdocno' },
      { field: "billingDocDate", header: "Billingdocdate" },
      // { field: 'materialType', header: 'Materialtype' },
      { field: "materialNumber", header: "Material No." },
      { field: "materialDesc", header: "Materialdesc" },
      { field: "soldToParty", header: "Soldtoparty" },
      { field: "soldToPartyName", header: "Soldtopartyname" },
      // { field: 'payer', header: 'Payer' },
      // { field: 'payerName', header: 'Payername' },
      // { field: 'soType', header: 'Sotype' },
      { field: "soTypedesc", header: "Sotypedesc" },
      { field: "basicAmtINR", header: "BasicAmtINR" },
    ];

    if(this.plantcode)
    {
      this.loadData();
    }
  }
  onselecttype(ev) {
    this.selectedtype = ev;
  }
  loadData() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
    let me = this;
    this.totalSumofValue = 0;

    this.salesDetailInfo = [];

    //this.loading = true;
    this.dpservice.getSalesDetail(this.plantcode, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        const salesdetail = res as Salesdetail[];
        this.salesDetailInfo = res as Salesdetail[];
        this.salesDetailInfo = [];

        salesdetail.forEach(sales_detail => {
          console.log("salesReturn", sales_detail);

          if (this.selectedtype == "salesReturn") {
            if (sales_detail.billingDocTYPE == "ZRET") {
              console.log("salesReturn");
              this.salesDetailInfo.push(sales_detail);
            } else if (sales_detail.billingDocTYPE == "ZCR") {
              console.log("salesReturn");
              this.salesDetailInfo.push(sales_detail);
            }
            else if (sales_detail.billingDocTYPE == "G2") {
              console.log("salesReturn");
              this.salesDetailInfo.push(sales_detail);
            }
          } else if (this.selectedtype == "netSales") {

            if (sales_detail.billingDocTYPE == "ZDOM") {
              this.salesDetailInfo.push(sales_detail); console.log("netSales");
            } else if (sales_detail.billingDocTYPE == "ZJOB") {
              this.salesDetailInfo.push(sales_detail); console.log("netSales");
            } else if (sales_detail.billingDocTYPE == "ZRAW") {
              this.salesDetailInfo.push(sales_detail); console.log("netSales");

            } else if (sales_detail.billingDocTYPE == "S2") {
              this.salesDetailInfo.push(sales_detail); console.log("netSales");

            } else if (sales_detail.billingDocTYPE == "ZDR") {
              this.salesDetailInfo.push(sales_detail); console.log("netSales");
            }

          } else if (this.selectedtype == "cancelInvoice") {
            if (sales_detail.billingDocTYPE == "S1") {
              console.log("cancelInvoice");
              this.salesDetailInfo.push(sales_detail);
            }
          } else if (this.selectedtype == "") {
            this.salesDetailInfo = res as Salesdetail[];
          }
        });
        //this.salesDetailInfo = res as Salesdetail[];
        console.log("salesDetailInfo : ", this.salesDetailInfo);
        this.sumgetsale(this.selectedtype);
        //this.loading = false;
      });

  }
 
  sumgetsale(val) {
    this.totalSumofValue = 0;
    this.filterenable = false;
    for (const sd of this.salesDetailInfo) {
      this.totalSumofValue = (this.totalSumofValue + sd.basicAmtINR);
    }
    return;
  }
  getPlant(plantc) {
    if (plantc) {
      this.plantcode = plantc;
    }
  }

}
