import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DailyproductionService } from '../shared/dailyproduction/dailyproduction.service';
import { Itemvalueqty } from '../shared/dailyproduction/itemvalueqty.model';
import { Itemwiserej } from '../shared/dailyproduction/itemwiserej.model';
import { TopDefect } from '../shared/dailyproduction/topdefect.model';
import { LoginService } from '../shared/login/login.service';
import { User } from '../shared/login/User.model';
import { Plant } from '../shared/plant/plant.model';
import { PlantService } from '../shared/plant/plant.service';

@Component({
  selector: 'app-production-val-summary',
  templateUrl: './production-val-summary.component.html',
  styleUrls: ['./production-val-summary.component.css'],
  providers: [DatePipe],
  styles: [`
  :host ::ng-deep .all .ui-table  table {
    width:auto;
  }
  :host ::ng-deep .ui-table-resizable > .ui-table-wrapper > table{
    transform:rotateX(180deg);
    -ms-transform:rotateX(180deg); /* IE 9 */
    -webkit-transform:rotateX(180deg);
  }
  :host ::ng-deep .ui-table-resizable > p-paginator > div {
    transform: rotateX(180deg);
    -ms-transform: rotateX(180deg);
    -webkit-transform: rotateX(180deg);
  }
  :host ::ng-deep ::-webkit-scrollbar {
    width: 8px;
  }
  /* Track */
  :host ::ng-deep ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
   
  /* Handle */
  :host ::ng-deep ::-webkit-scrollbar-thumb {
    background: #c1c1c1; 
  }
  
  /* Handle on hover */
  :host ::ng-deep ::-webkit-scrollbar-thumb:hover {
    background: #c1c1c1; 
  }

`]
})
export class ProductionValSummaryComponent implements OnInit {

  type:string;
  typename:string;
  cols: any;

  public selectedPlant: string;
  public selectedtype: string;
  reporttype: any = 'All';
  public plant_name: string;

  totalQtySum: number = 0;
  totalRejValueSum: number = 0;

  filterenable = false;
  selectedItemrejarray: Itemvalueqty[] = [];
  filterItemrejarray: Itemvalueqty[] = [];
  iv: number;

  pinholEvalue: number = 0;
  skipplatinGval: number = 0;
  whitemarKval: number = 0;
  dotplastiCval: number = 0;
  crburninGval: number = 0;
  copperburninGval: number = 0;
  nicklEval: number = 0;
  roughnesSval: number = 0;
  blisteRval: number = 0;
  watermarKval: number = 0;
  shadevaRval: number = 0;
  platingpeeLval: number = 0;
  chemicalmarKval: number = 0;

  silveRval: number = 0;
  denTval: number = 0;
  handmouldingreJval: number = 0;
  pittinGval: number = 0;
  flowmarKval: number = 0;

  tooldeF_value: number = 0;
  jigdamagEval: number = 0;

  warpagEval: number = 0;
  scratchmarKval: number = 0;
  otheR1val: number = 0;
  otheR2val: number = 0;


  totalBuffVal: number = 0;
  totalHoldVal: number = 0;
  totalRejVal: number = 0;
  totalokValue: number = 0;
  totalinsValue: number = 0;
  totalRejPer2: number = 0;

  moulding_value: number = 0;
  plating_value: number = 0;
  othersvalue: number = 0;
  mechfail_value: number = 0;

  patchmarKval: number = 0;
  mouldingreJval:number=0;

  public loading = false;
  public Fromdate: string;
  public Todate: string;

  selectedItemrej: Itemwiserej;
  public cDate: string;
  public currentUser: User;

  constructor(
    private router: Router,
    public plantservice: PlantService,
    public DPservice: DailyproductionService,
    private datePipe: DatePipe,
    private lservice: LoginService,
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.selectedtype = "zcrm";
   }

  ngOnInit() {
    let me = this;
    this.type='All';
    this.typename='CHROME';
    if (!this.DPservice.date) {
      this.Fromdate = this.cDate;
      this.Todate = this.cDate;
    }
    else {
      this.Fromdate = this.DPservice.date.replace('T00:00:00', '');
      this.Todate = this.DPservice.date.replace('T00:00:00', '');
    }
    this.loading = true;
    //  this.plantservice.getPlantData(this.currentUser.id);
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.plantlist = res as Plant[];
        me.DPservice.plantcode = me.plantservice.plantlist[0].plantcode;
        me.plant_name = me.plantservice.plantlist[0].plantShortName;
        this.onviewDetail()
      });
  }

  getPlant(plant)
  {
    this.selectedPlant = plant;
    this.selectedPlanName();
  }

  onselectReporttype(ev)
  {
    this.reporttype = ev;
    this.mycol();
  }

  getselectedtype(ev)
  {
    this.selectedtype = ev;
  }

  selectedPlanName() {
    const me = this;
    if (this.plantservice && this.plantservice.plantlist && me.selectedPlant) {
      this.plantservice.plantlist.forEach(function (element, i) {
        if (element.plantcode == me.selectedPlant) {
          me.plant_name = element.plantShortName;
        }
      });
    }
    // return this.selected_plantname;
  }

  mycol() {
    this.cols = [
      { field: 'itemcode', header: 'Code' },
      { field: 'itemname', header: 'Name' },
      { field: "inspection_value", header: "Insp. Val." },
      { field: "okvalue", header: "Ok Value" },
      { field: "reject_value", header: "Reject Val." },
      { field: "rejper", header: "Reject%" },
      { field: "holdvalue", header: "Hold Val." },
      { field: "buffingvalue", header: "Buffing Val." },
    ];
    if (this.reporttype == "All") {
      this.cols.push(
        { field: "plating_value", header: "Plating" ,width:"10px"},
        { field: "moulding_value", header: "Moulding" ,width:"10px"},
        { field: 'tooldeF_value', header: 'Tooldef' ,width:"10px"},
        { field: 'othersvalue', header: 'others' ,width:"10px"},
        { field: 'mechfail_value', header: 'Mechfail' ,width:"10px"},

        { field: "pinholEvalue", header: "Pinhole" ,width:"10px"},
        { field: "skipplatinGval", header: "Skipplating" ,width:"10px"},
        { field: 'whitemarKval', header: 'Whitemark' ,width:"10px"},
        { field: 'dotplastiCval', header: 'Dotplastic' ,width:"10px"},
        { field: 'crburninGval', header: 'Crburning' ,width:"10px"},
        { field: "copperburninGval", header: "Copper Burning" ,width:"10px"},
        { field: "nicklEval", header: "Nickle" ,width:"10px"},
        { field: "roughnesSval", header: "Roughness" ,width:"10px"},
        { field: "blisteRval", header: "Blister" ,width:"10px"},
        { field: "watermarKval", header: "Watermark" ,width:"10px"},
        { field: "shadevaRval", header: "Shadevar" ,width:"10px"},
        { field: "platingpeeLval", header: "Platingpeel" ,width:"10px"},
        { field: "chemicalmarKval", header: "Chemicalmark" ,width:"10px"},

        { field: "silveRval", header: "Silver" ,width:"10px"},
        { field: "denTval", header: "Dent" ,width:"10px"},

        { field: 'handmouldingreJval', header: 'Hand Moulding Rej' ,width:"10px"},
        { field: 'patchmarKval', header: 'Patchmark' ,width:"10px"},
        { field: 'mouldingreJval', header: 'Moulding rej' ,width:"10px"},

        { field: "pittinGval", header: "Pitting" ,width:"10px"},
        { field: "flowmarKval", header: "Flowmark" ,width:"10px"},

        { field: "jigdamagEval", header: "Jig Damage" ,width:"10px"},

        { field: "warpagEval", header: "War Page" ,width:"10px"},
        { field: "scratchmarKval", header: "Scratch Mark" ,width:"10px"},
        { field: 'otheR1val', header: 'Other1' ,width:"10px"},
        { field: "otheR2val", header: "Other2" ,width:"10px"},
      )
    }
    if (this.reporttype == "Plating") {
      this.cols.push(
        { field: "plating_value", header: "Plating" },
        { field: "moulding_value", header: "Moulding" },
        { field: 'tooldeF_value', header: 'Tooldef' },
        { field: 'othersvalue', header: 'others' },

        { field: "pinholEvalue", header: "Pinhole" },
        { field: "skipplatinGval", header: "Skipplating" },
        { field: 'whitemarKval', header: 'Whitemark' },
        { field: 'dotplastiCval', header: 'Dotplastic' },
        { field: 'crburninGval', header: 'Crburning' },
        { field: "copperburninGval", header: "Copper Burning" },
        { field: "nicklEval", header: "Nickle" },
        { field: "roughnesSval", header: "Roughness" },
        { field: "blisteRval", header: "Blister" },
        { field: "watermarKval", header: "Watermark" },
        { field: "shadevaRval", header: "Shadevar" },
        { field: "platingpeeLval", header: "Platingpeel" },
        { field: "chemicalmarKval", header: "Chemicalmark" },
      )
    }
    if (this.reporttype == "Moulding") {
      this.cols.push(
        { field: "moulding_value", header: "Moulding" },

        { field: "silveRval", header: "Silver" },
        { field: "denTval", header: "Dent" },
        { field: 'handmouldingreJval', header: 'Hand Moulding Rej' },
        { field: 'patchmarKval', header: 'Patchmark' },
        { field: 'mouldingreJval', header: 'Moulding rej' },

        { field: "pittinGval", header: "Pitting" },
        { field: "flowmarKval", header: "Flowmark" },


      );
    }
    if (this.reporttype == "ToolDefect") {
      this.cols.push(
        { field: "tooldeF_value", header: "Tooldef" },
        { field: "jigdamagEval", header: "Jig Damage" },
      );
    }
    if (this.reporttype == "Others") {
      this.cols.push(

        { field: 'othersvalue', header: 'others' },

        { field: "warpagEval", header: "War Page" },
        { field: "scratchmarKval", header: "Scratch Mark" },
        { field: 'otheR1val', header: 'Other1' },
        { field: "otheR2val", header: "Other2" },
      );
    }

    if (this.reporttype == "Summary") {
      this.cols.push(
        { field: "plating_value", header: "Plating" },
        { field: "moulding_value", header: "Moulding" },
        { field: 'tooldeF_value', header: 'Tooldef' },
        { field: 'othersvalue', header: 'others' },

        { field: 'mechfail_value', header: 'Mechfail' },
      );
    }
  }

  totalQty() {
    this.totalQtySum = 0;
    if (this.DPservice && this.DPservice.itemtopdefectlist) {
      for (const rq of this.DPservice.itemtopdefectlist) {
        this.totalQtySum += rq.totalqty;
      }
    }
    return this.totalQtySum;
  }
  totalRejValue() {
    this.totalRejValueSum = 0;
    if (this.DPservice && this.DPservice.itemtopdefectlist) {
      for (const rq of this.DPservice.itemtopdefectlist) {
        this.totalRejValueSum += rq.rejvalue;
      }
    }
    return this.totalRejValueSum;
  }

  loadper(ev, dt) {
    this.filterenable = true;
    this.selectedItemrejarray = dt.value;
    this.iv = 0;
    this.filterItemrejarray = [];
    // console.log(this.selectedItemrejarray[0].id);
    for (const c of this.selectedItemrejarray) {
      if (c.itemcode.toString().includes(ev.toString()) || c.itemname.toString().includes(ev.toString())
        || c.item_type.toString().includes(ev.toString()
          || c.plant.toString().includes(ev.toString()) || c.id.toString().includes(ev.toString()))) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      }
      else {
        this.iv += 1;
      }
    }
    this.rejectpersum();
  }

  rejectpersum() {
    console.log("In rejectpersum func");
    this.pinholEvalue = 0;
    this.skipplatinGval = 0;
    this.whitemarKval = 0;
    this.dotplastiCval = 0;
    this.crburninGval = 0;
    this.copperburninGval = 0;
    this.nicklEval = 0;
    this.roughnesSval = 0;
    this.blisteRval = 0;
    this.watermarKval = 0;
    this.shadevaRval = 0;
    this.platingpeeLval = 0;
    this.chemicalmarKval = 0;

    this.silveRval = 0;
    this.denTval = 0;
    this.handmouldingreJval = 0;
    this.pittinGval = 0;
    this.flowmarKval = 0;

    this.tooldeF_value = 0;
    this.jigdamagEval = 0;

    this.warpagEval = 0;
    this.scratchmarKval = 0;
    this.otheR1val = 0;
    this.otheR2val = 0;

    this.totalBuffVal = 0;
    this.totalHoldVal = 0;
    this.totalRejVal = 0;
    this.totalokValue = 0;
    this.totalinsValue = 0;

    this.totalRejPer2 = 0;

    this.moulding_value = 0;
    this.plating_value = 0;
    this.othersvalue = 0;
    this.mechfail_value = 0;

    this.patchmarKval = 0;
    this.mouldingreJval = 0;
    if (this.filterenable == true) {
      console.log("filterenable==true");
      for (const rq of this.filterItemrejarray) {
        this.mouldingreJval += rq.mouldingreJval;

        this.patchmarKval += rq.patchmarKval;
        this.mechfail_value += rq.mechfail_value;

        this.moulding_value += rq.moulding_value;
        this.plating_value += rq.plating_value;
        this.othersvalue += rq.othersvalue;

        this.totalBuffVal += rq.buffingvalue;
        this.totalHoldVal += rq.holdvalue;
        this.totalRejVal += rq.reject_value;
        this.totalokValue += rq.okvalue;
        this.totalinsValue += rq.inspection_value;


        this.pinholEvalue += rq.pinholEvalue;
        this.skipplatinGval += rq.skipplatinGval;
        this.whitemarKval += rq.whitemarKval;
        this.dotplastiCval += rq.dotplastiCval;
        this.crburninGval += rq.crburninGval;
        this.copperburninGval += rq.copperburninGval;
        this.nicklEval += rq.nicklEval;
        this.roughnesSval += rq.roughnesSval;
        this.blisteRval += rq.blisteRval;
        this.watermarKval += rq.watermarKval;
        this.shadevaRval += rq.shadevaRval;
        this.platingpeeLval += rq.platingpeeLval;
        this.chemicalmarKval += rq.chemicalmarKval;

        this.silveRval += rq.silveRval;
        this.denTval += rq.denTval;
        this.handmouldingreJval += rq.handmouldingreJval;
        this.pittinGval += rq.pittinGval;
        this.flowmarKval += rq.flowmarKval;

        this.tooldeF_value += rq.tooldeF_value;
        this.jigdamagEval += rq.jigdamagEval;

        this.warpagEval += rq.warpagEval;

        this.scratchmarKval += rq.scratchmarKval;
        this.otheR1val += rq.otheR1val;
        this.otheR2val += rq.otheR2val;
      }
      this.totalRejPer2 = this.totalRejVal * 100 / this.totalinsValue;
    }
    else {
      console.log("Else part");
      for (const rq of this.DPservice.itemwiserejlist2) {
        console.log("Else for");
        this.mechfail_value += rq.mechfail_value;
        this.mouldingreJval += rq.mouldingreJval;

        this.patchmarKval += rq.patchmarKval;

        this.moulding_value += rq.moulding_value;
        this.plating_value += rq.plating_value;
        this.othersvalue += rq.othersvalue;

        this.totalBuffVal += rq.buffingvalue;
        this.totalHoldVal += rq.holdvalue;
        this.totalRejVal += rq.reject_value;
        this.totalokValue += rq.okvalue;
        this.totalinsValue += rq.inspection_value;

        this.pinholEvalue += rq.pinholEvalue;
        this.skipplatinGval += rq.skipplatinGval;
        this.whitemarKval += rq.whitemarKval;
        this.dotplastiCval += rq.dotplastiCval;
        this.crburninGval += rq.crburninGval;
        this.copperburninGval += rq.copperburninGval;
        this.nicklEval += rq.nicklEval;
        this.roughnesSval += rq.roughnesSval;
        this.blisteRval += rq.blisteRval;
        this.watermarKval += rq.watermarKval;
        this.shadevaRval += rq.shadevaRval;
        this.platingpeeLval += rq.platingpeeLval;
        this.chemicalmarKval += rq.chemicalmarKval;

        this.silveRval += rq.silveRval;
        this.denTval += rq.denTval;
        this.handmouldingreJval += rq.handmouldingreJval;
        this.pittinGval += rq.pittinGval;
        this.flowmarKval += rq.flowmarKval;

        this.tooldeF_value += rq.tooldeF_value;
        this.jigdamagEval += rq.jigdamagEval;

        this.warpagEval += rq.warpagEval;
        this.scratchmarKval += rq.scratchmarKval;
        this.otheR1val += rq.otheR1val;
        this.otheR2val += rq.otheR2val;
      }
      this.totalRejPer2 = this.totalRejVal * 100 / this.totalinsValue;

    }
  }

  onviewDetail() {
    this.filterenable = false;
    this.loading = true;
    this.DPservice.itemwiserejlist2 = [];
    this.mycol();

    this.DPservice.getRejectdetailQtyValue(this.DPservice.plantcode, this.Fromdate, this.Todate, this.selectedtype)
      .toPromise()
      .then(res => {
        this.DPservice.itemwiserejlist2 = res as Itemvalueqty[];
        this.rejectpersum();
        this.loading = false;
      });
      this.rejectpersum();
      // console.log(this.totalinsValue);
      // console.log(this.DPservice.itemwiserejlist2);
  }
}
