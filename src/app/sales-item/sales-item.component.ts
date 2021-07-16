import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../shared/login/login.service';
import { Salesinfo } from '../shared/sales/salesinfo.model';
import { SalesinfoService } from '../shared/sales/salesinfo.service';

@Component({
  selector: 'app-sales-item',
  templateUrl: './sales-item.component.html',
  styleUrls: ['./sales-item.component.css'],
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
export class SalesItemComponent implements OnInit {
  cDate: string;
  Fromdate: string;
  Todate: string;
  plantcode: string;
  cols: any[];
  salesDetailInfo: any;
  totalNetSale: number = 0;
  public selectedPlant: string;
  filterenable = false;
  iv: number;
  filterItemrejarray: any;
  loadingSubData: boolean = false;

  constructor(private lservice: LoginService,public datePipe: DatePipe,public sinservice: SalesinfoService,private spinner: NgxSpinnerService
    ) {
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
   }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
    this.Fromdate = this.cDate;
    this.Todate = this.cDate;
    this.plantcode = "1010";

    this.cols = [
      { field: 'materialNumber', header: 'Material Number' },
      { field: 'materialDesc', header: 'Material Desc ' },
      { field: 'netSale', header: 'Netsale  (In Lacs)' },
    ];
    if(this.plantcode)
    {
      this.loadData();
      console.log("ngOnInit",this.totalNetSale);
    }
  }
  loadData()
  {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
    const me = this;
    this.totalNetSale = 0;
    this.salesDetailInfo = [];
    this.sinservice.netSaleSumItem(this.plantcode, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        me.salesDetailInfo = res as Salesinfo[];
        me.sumgetsale();
        console.log("loadData");


      }, error => {

      });
  }
  sumgetsale()
  {
    this.totalNetSale = 0;
    if (this.filterenable == true) {
      for (const sd of this.filterItemrejarray) {
        this.totalNetSale += sd.netsale;
      }
      return;
    }
    this.salesDetailInfo.forEach(element => {
      this.totalNetSale += element.netsale;
    });
    return;
  }
  selectedGrid(ev) {
    this.selectedPlant = ev;
  }

  getSubData(product) {
    console.log("product : ", product);
    if (!product.list) {
      product.list = [];
    }
    if (product.list && product.list.length > 0) {
      return;
    }
    this.loadingSubData = true;
    this.sinservice.netSaleSumItemDetail(product.materialNumber, this.plantcode, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        product.list = res as Salesinfo[];
        this.loadingSubData = false;
      }, error => {
        this.loadingSubData = false;
      });

  }
  
  getPlant(plantc)
  {
    this.plantcode = plantc;
  }

}
