import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { DailyproductionService } from '../shared/dailyproduction/dailyproduction.service';
import { LoginService } from '../shared/login/login.service';
import { User } from '../shared/login/User.model';
import { PlantService } from '../shared/plant/plant.service';
import dayGridPlugin from '@fullcalendar/daygrid';
// import { Dailyproduction } from '../shared/dailyproduction/dailyproduction.model';
import { DatePipe } from '@angular/common';
import { FullCalendarComponent } from '@fullcalendar/angular';
// import { Top5Rejection } from '../shared/dailyproduction/top5rejection.model';
// import { Itemwiserej } from '../shared/dailyproduction/itemwiserej.model';
import { Plant } from '../shared/plant/plant.model';
import { DailyReportSummary } from '../shared/dailyproduction/dailyreportsummary.model';
import { Dailyproduction } from '../shared/dailyproduction/dailyproduction.model';
import { Itemwiserej } from '../shared/dailyproduction/itemwiserej.model';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-qualitycalendar',
  templateUrl: './qualitycalendar.component.html',
  styleUrls: ['./qualitycalendar.component.css'],
  providers: [DatePipe]
})
export class QualityCalenderComponent implements OnInit {
  currentUser: User;
  plantcode: string;
  options: any;
  public selected_plantname : string;
  company_per : any;
  startdate: string;
  sdate : Date;
  ldate: Date;
  monthname: any;
  noRecord : any;
  calendarApi : any;
  rejper: number = 0;
  monthNames: any;
// @Input() table : Table;
// localStorage.setItem('', event);

//   onClick(event : Event)
//   {
//     this.table.value.push
//   }

  //Once you’ve explicitly marked your child component (#calendar), you can get the underlying Calendar object via the getApi method:
  //All these dependencies have been accessed in the ParentComponent using the ViewChild decorator and the read property specifying each of the corresponding tokens.
  //here @ViewChild is a decorator provide access to child elements
  //calendar is a selector :The selector property specifies what child element within the component view is to be queried.
  @ViewChild('calendar',{static: false}) calendarComponent: FullCalendarComponent;

  public dailyprodlist: Dailyproduction[] = [];
  public dailyprodsummary: DailyReportSummary[] = [];
  public itemwiserejlist: Itemwiserej[] = [];
  filterItemrejarray: Itemwiserej[] = [];
  selectedItemrejarray: Itemwiserej[] = [];

  selectedItemrej: Itemwiserej;




  // public top5reject : Top5Rejection[] = [];
  public title: string;
  typename: any;
  cols: any[];

  colspanAmount: any = 2;
  btnLabel: any;
  monthName: any;
  plantshortname: any;
  plantlistc : Plant[] = [];
  plantsname: string;
  inspectionQtysum: number;
  inspectionvsum: number;
  filterenables: boolean;
  iv:number;
  okqtysum: number;
  okvsum: number;
  holdqtysum: number;
  holdvsum: number;
  bufferqtysum: number;
  buffervsum: number;
  rejqtysum: number;
  rejvsum: number;
  rejpersum: number;
  okpersum: number;
  selected_eventdate: string;


  constructor(public service: DailyproductionService,public dpservice: DailyproductionService,
    public plantservice: PlantService, public lservice: LoginService,public datePipe: DatePipe,private spinner: NgxSpinnerService



 ) { 
    
      this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
      this.typename = "PLATING";
      this.lservice.currentUser.subscribe(x => (this.currentUser = x));

  }
  calendarPlugins = [dayGridPlugin];



  ngOnInit() {
    const me=this;
    // this.plantservice.getPlantData(this.currentUser.id);
    

    this.spinner.show();


    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
    
    // this.service.plantcode = '1010';
     this.service.plantshortname = 'GDPL Vapi';
    this.plantcode= '1010';

    this.options = {
      editable: true,
      height:100,
      header: {
        left: '',
        center: 'title',
        right: ''//'dayGridMonth,dayGridWeek',

      },
      // contentHeight: '500px',

      // plugins: [dayGridPlugin],
    };
    
    this.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    // console.log(this.startdate);
    var date = new Date();

    this.sdate = new Date(date.getFullYear(),date.getMonth(),1);
    // console.log(this.sdate);

    this.ldate = new Date(date.getFullYear(),date.getMonth()+1,0);
    // console.log(this.sdate);
    // console.log(this.ldate); 

   
    if(this.plantcode)
    {
      
      me.dpservice
      .getRejectcalendar(me.plantcode,me.startdate)
      .toPromise()
      .then(res => {
        // me.dpservice.top5reject = res as Top5Rejection[];
        me.dpservice.dailyprodlist = res as Dailyproduction[];
        me.loadchart1();
        // const month = new Date(this.startdate).getMonth();
        // const monthName = this.monthNames[month];
      });

      this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        this.plantlistc = res as Plant[];
        this.plantlistc.forEach(splant => {
          if (splant.plantcode == this.plantcode) {
            this.selected_plantname = splant.plantShortName;
            console.log("Plantshortname in loop",splant.plantShortName);
          }
        });
      });
          // console.log(this.selected_plantname);
  }

  
}


  Next()
  {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.next();// call a method on the Calendar object
    this.sdate = this.calendarApi.getDate();//to get the current date
    this.startdate = this.datePipe.transform(this.sdate,'yyyy-MM-dd');
    this.ldate = new Date(this.sdate.getFullYear(), this.sdate.getMonth() + 1, 0);
    // console.log(this.ldate);
  }
  Previous()
  {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.prev();
    this.sdate = this.calendarApi.getDate();//to get the current date
    // console.log(this.sdate);
    this.startdate = this.datePipe.transform(this.sdate, 'yyyy-MM-dd');
    // console.log(this.startdate);
    this.ldate = new Date(this.sdate.getFullYear(), this.sdate.getMonth() + 1, 0);
    // console.log(this.ldate);

  }

  loaddata() {
    if(this.plantcode)
    {
      const me=this;
      me.dpservice
      .getRejectcalendar(me.plantcode,me.startdate)
      .toPromise()
      .then(res => {
        // me.dpservice.top5reject = res as Top5Rejection[];
        me.dpservice.dailyprodlist = res as Dailyproduction[];
        me.loadchart1();
        // const month = new Date(this.startdate).getMonth();
        // const monthName = this.monthNames[month];
      });
    }
  }

  loadchart1() {
    this.rejper = 0;
    const month = new Date(this.startdate).getMonth();
    const monthName = this.monthNames[month];
    this.dpservice.dailyreportsummary = [];
    const yearName = new Date(this.startdate).getFullYear();
    this.dpservice.getprochartsummary(this.plantcode, "M", monthName,yearName).then((res: any) => {
      this.dpservice.dailyreportsummary.forEach(drsummary => {
        if (drsummary.itemtype == this.typename) {
          this.rejper = drsummary.rejper;
        }
      });
    });
  }

  loadper(plantc, dt) {

    if(this.plantcode)
    {
      plantc = this.plantcode;
      console.log("here",plantc);
    }
    this.filterenables = true;
    this.selectedItemrejarray = dt.value;
    this.iv = 0;
    this.filterItemrejarray = [];
    // console.log(this.selectedItemrejarray[0].id);
    for (const c of this.selectedItemrejarray) {
      if (c.item_type.toString().includes(plantc.toString()) || c.itemcode.toString().includes(plantc.toString())
        || c.itemname.toString().includes(plantc.toString()) || c.inspection_qty.toString().includes(plantc.toString()
          || c.plant.toString().includes(plantc.toString()) || c.id.toString().includes(plantc.toString()))) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      }
      else {
        this.iv += 1;
      }
    }
    this.sumAllData();
    console.log(this.sumAllData);
  }
  
  getPlant(plantc){
    if(plantc)
    {
      //this.plantservice.plantcode = plantc;
      this.plantcode = plantc;
      
      const me= this;
      this.selectedPlantName();

      this.dpservice.getRejectcalendar(plantc,this.startdate)
      .toPromise()
      .then(res => {
        // me.dpservice.top5reject = res as Top5Rejection[];
        me.dpservice.dailyprodlist = res as Dailyproduction[];
        me.loadchart1();
  
        // const month = new Date(this.startdate).getMonth();
        // const monthName = this.monthNames[month];
    });

    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        this.plantlistc = res as Plant[];
        this.plantlistc.forEach(splant => {
          if (splant.plantcode == this.plantcode) {
            this.selected_plantname = splant.plantShortName;
            console.log("Plantshortname in loop",splant.plantShortName);
          }
        });
      });   
  }
}

  selectedPlantName()
  {
    const me=this;
    if(this.plantservice && this.plantservice.splantlist && me.plantcode)
    {
      this.plantservice.splantlist.forEach(function(element)
      {
        if(element.plantcode == me.plantcode)
          me.selected_plantname = element.plantShortName;
      });
    }
  }

  
  
  
  extraVal(val)
  {
    this.colspanAmount = 2;
    this.dpservice.itemwiserejlist = [];
    this.filterItemrejarray = [];
    this.cols = [
      //{ field: 'item_type', header: 'Type' },
      { field: 'itemCode', header: 'Code' },
      { field: 'itemName', header: 'Name' }
    ];
    if (val == 7) {
      this.cols.push({ field: 'inspection_value', header: 'Insp. Value' },
        { field: 'okvalue', header: 'Ok Value' },
        { field: 'okper', header: 'Ok Value %' },
        { field: 'reject_value', header: 'Rej. Value' },
        { field: 'rejper', header: 'Reject %' },
      );
      this.colspanAmount = 10;
    }
    else if(val == 1) {
      this.cols.push({ field: 'inspection_qty', header: 'Insp. Qty' });
      this.cols.push({ field: 'inspection_value', header: 'Insp. Value' });
    }
    else if(val == 2) {
      this.cols.push({ field: 'okqty', header: 'OK. Qty' });
      this.cols.push({ field: 'okvalue', header: 'OK. Value' });
    }
    else if(val == 3) {
      this.cols.push({ field: 'holdqty', header: 'Hold. Qty' });
      this.cols.push({ field: 'holdvalue', header: 'Hold. Value' });
    }
    else if(val == 4) {
      this.cols.push({ field: 'buffingqty', header: 'Buff. Qty' });
      this.cols.push({ field: 'buffingvalue', header: 'Buff. Value' });
    }
    else if(val == 5) {
      this.cols.push({ field: 'reject_qty', header: 'Rej. Qty' });
      this.cols.push({ field: 'reject_value', header: 'Rej. Value' });
    }
    else  if(val == 6) {
      this.cols.push({ field: 'rejper', header: 'Rej. %' });
    }
    else{
      return;
    }
    this.btnLabel = val;
    this.monthName = this.datePipe.transform(this.sdate, 'yyyy-MM-d');
    // this.selected_plantname = this.plantservice.splantlist[0].plantshortname;
    // console.log(this.selected_plantname);
   
    (<any>$('#basicExampleModal')).modal('show');
    const fdate = this.datePipe.transform(this.sdate, 'yyyy-MM-dd');
    const edate = this.datePipe.transform(this.ldate, 'yyyy-MM-dd');
    this.dpservice.getRejectdetail(this.plantcode, 'NULL', fdate, edate)
    .toPromise()
    .then(res => {
        this.dpservice.itemwiserejlist = res as Itemwiserej[];
        this.sumAllData();
        // this.loading = false;
      });

    // const fdate = this.datePipe.transform(this.sdate, 'yyyy-MM-dd');
    // const edate = this.datePipe.transform(this.ldate, 'yyyy-MM-dd');
    // this.dpservice.getRejectdetail(this.plantcode, 'NULL', fdate, edate)
    // .toPromise()
    // .then(res => {
    //   this.dpservice.itemwiserejlist = res as Itemwiserej[];
      // this.dpservice.dailyprodlist = res as Dailyproduction[];
      // this.sumAllData();
      // this.loading = false;
    // });

  
  }
  eventClick(model)
  {
    console.log(model);
    this.dpservice.itemwiserejlist = [];
    this.filterItemrejarray =[];
    this.colspanAmount =2;
    this.cols = [
      { field: 'itemCode', header: 'Code' },
      { field: 'itemName', header: 'Name' },
      { field: 'reject_qty', header: 'Reject qty' },
      { field: 'rejper', header: 'Rej %' },
      { field: 'reject_value', header: 'Reject Value' },
      { field: 'inspection_value', header: 'Insp. Value' },
      { field: 'holdvalue', header: 'Hold Value' },
      { field: 'buffingvalue', header: 'Buff. Value' }
    ];
    this.btnLabel = ''; this.monthName = '';
    console.log(this.plantcode);
    (<any>$('#basicExampleModal')).modal('show');
    this.selected_eventdate = this.datePipe.transform(model.event.start, 'yyyy-MM-dd');
    this.dpservice.getRejectdetail(this.plantcode, 'NULL', this.selected_eventdate, this.selected_eventdate)
      .toPromise()
      .then(res => {
        this.dpservice.itemwiserejlist = res as Itemwiserej[];
        this.sumAllData();
    });
  }

  sumAllData(){
    this.inspectionQtysum = 0;
    this.inspectionvsum = 0;

    this.okqtysum = 0;
    this.okvsum = 0;
    this.okpersum = 0;

    this.holdqtysum = 0;
    this.holdvsum=0;

    this.bufferqtysum = 0;
    this.buffervsum = 0;

    this.rejqtysum = 0;
    this.rejvsum = 0;

    this.rejpersum = 0;


    if(this.filterenables == true)
    {
      for (const rq of this.filterItemrejarray) {
        this.inspectionQtysum += rq.inspection_qty;
        this.inspectionvsum += rq.inspection_value;

        this.okqtysum += rq.okqty;
        this.okvsum += rq.okvalue;

        this.holdqtysum += rq.holdqty;
        this.holdvsum += rq.holdvalue;

        this.bufferqtysum += rq.buffingqty;
        this.buffervsum += rq.buffingvalue;

        this.rejqtysum += rq.reject_qty;
        this.rejvsum += rq.reject_value;
        
        this.rejpersum += rq.rejper;
        this.okpersum += rq.okper;

      }
      return;
    }
      for (const rq of this.dpservice.itemwiserejlist) {
        this.inspectionQtysum += rq.inspection_qty;
        this.inspectionvsum += rq.inspection_value;

        this.okqtysum += rq.okqty;
        this.okvsum += rq.okvalue;

        this.holdqtysum += rq.holdqty;
        this.holdvsum += rq.holdvalue;

        this.bufferqtysum += rq.buffingqty;
        this.buffervsum += rq.buffingvalue;

        this.rejqtysum += rq.reject_qty;
        this.rejvsum += rq.reject_value;

        this.rejpersum += rq.rejper;
        this.okpersum += rq.okper;

      }
  }


  // refreshList(){
  //   let me = this;
  //   this.monthname = this.datePipe.transform(this.sdate,'yyyy-MM-d');
  //   this.noRecord = ' ';
  //   const monthname = this.datePipe.transform(this.monthname,'MMMM');

  // }
}
