import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Salesinfo } from "../shared/sales/salesinfo.model";
import { SalesinfoService } from "../shared/sales/salesinfo.service";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "../shared/login/User.model";
import { LoginService } from "../shared/login/login.service";

@Component({
  selector: "app-salesinfo",
  templateUrl: "./salesinfo.component.html",
  styleUrls: ["./salesinfo.component.css"],
  providers: [DatePipe],
  styles: [`
  :host ::ng-deep .ui-table .ui-table-thead > tr > th {
    font-size:10px;
  }
  :host ::ng-deep .ui-table .ui-table-tbody tr > td {
    font-size: 10px;
  }
  th.sub-heading.ui-sortable-column {
    background: blue !important;
    color: white !important;
  }
  
`]
})
export class SalesinfoComponent implements OnInit {
  selectedItemrej: Salesinfo;
  salesDetailInfo: any;

  plantcode: any;
  totalNetSale: number = 0;

  public currentUser: User;
  public loading = false;
  loadingSubData: boolean = false;
  public cDate: string;
  public todayDate: Date;
  public login: string;
  public Fromdate: string;
  public Todate: string;
  public selectedPlant: string;

  cols: any[];
  selectedItemrejarray: any;
  filterItemrejarray: any;

  iv: number;
  filterenable = false;
  
  constructor(
    private lservice: LoginService,
    public sinservice: SalesinfoService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
    let me = this;
    this.Fromdate = this.cDate;
    this.Todate = this.cDate;
    // this.spinner.show();

    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 2500);

    
    this.plantcode = "1010";

    this.cols = [
      { field: 'soldToParty', header: 'Sold To Customer' },
      { field: 'soldToPartyName', header: 'Sold To Customer Name' },
      { field: 'netsale', header: 'Netsale (In Lacs)' },
    ];

    if(this.plantcode)
    {
      this.loadData();
    }
  }

  loadData() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
    const me = this;
    this.salesDetailInfo = [];
    //this.loading = true;
    this.sinservice
      .netSaleSUM(this.plantcode, this.Fromdate, this.Todate)
      .toPromise()
      .then(
        (res) => {
          me.salesDetailInfo = res as Salesinfo[];
      
      }, error => {
      
      });
      console.log(this.totalNetSale);
  }
 
  getSubData(rowData) {
    console.log("rowData: ", rowData);
    console.log(rowData.list);
    if (!rowData.list) {
      rowData.list = [];
    }

    if (rowData.list && rowData.list.length > 0) {
      return;
    }

    this.sinservice
      .netSaleSumDetail(
        rowData.soldToParty,
        this.plantcode,
        this.Fromdate,
        this.Todate
      )
      .toPromise()
      .then((res) => {
        rowData.list = res as Salesinfo[];
      });
  }

  getPlant(plantc) {
    if (plantc) {
      this.plantcode = plantc;
    }
  }
}
