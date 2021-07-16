import { DatePipe } from '@angular/common';
import { Component, OnInit, ɵgetDebugNode__POST_R3__ } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared/login/login.service';
import { User } from 'src/app/shared/login/User.model';
import { RoundhoursService } from 'src/app/shared/roundhours/roundhours.service';
// import { CompanyDropdownComponent } from 'src/app/utilities/company-dropdown/company-dropdown.component';


@Component({
    selector: 'app-addroundhours',
    templateUrl: './addroundhours.component.html',
    styleUrls: ['./addroundhours.component.css'],
    providers: [DatePipe]
  })
  export class AddroundhoursComponent implements OnInit {
  rtype = 'Production';
  ptype = 'Chrome';
  plant : string;


  public currentUser: User;
  public roundTotal: number;
  public proType: string;
  public insType: string;
  public actionValue:string;
  plantcode = '1010';
  date: string;

  constructor(public datePipe: DatePipe,public rhService: RoundhoursService,private route: Router,public lservice: LoginService,private toastr: ToastrService) {
    const me = this;
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
   }

  ngOnInit() {
    const me=this;
    const length = (<any>$('select')).children('option').length;
    console.log("length",length);
   this.rhService.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
   console.log("date",this.rhService.date);
  this.getInItval();
 

   
    if(length > 0)
    {
      this.proType = this.rhService.ptype;
      this.insType = this.rhService.rtype;
      this.plant = this.plantcode;
      console.log(this.proType,this.insType,this.plant);
    }
    else
    {
      this.proType = this.ptype;
      this.insType = this.rtype;
      this.plant = "1010";
      console.log(this.proType,this.insType,this.plant);
    }
    
     

  if (this.proType == 'Chrome' && this.insType == 'Jigging' && this.plantcode == "1010" ) {
    this.roundTotal = 300;
  } else if (this.proType == 'Satin' && this.insType == 'Jigging' && this.plantcode == "1010" ) {
    this.roundTotal = 250;
  } else if (this.proType == 'Chrome' && this.insType == 'Production' && this.plantcode == "1010" ) {
    this.roundTotal = 275;
  } else if (this.proType == 'Satin' && this.insType == 'Production' && this.plantcode == "1010" ) {
    this.roundTotal = 220;
  } else {
  this.roundTotal = 175;
  }

  
  }

  getInItval() {
    const me = this;

    if (me.rhService.date && me.rhService.plant && me.rhService.rtype) {
      this.rhService.date = this.datePipe.transform(this.rhService.date, 'yyyy-MM-dd');
      this.date = this.rhService.date;
      this.rtype = this.rhService.rtype;
      console.log("Initfunction",this.rtype);
      this.ptype = this.rhService.ptype;
      this.plant = this.rhService.plant.toString();
      console.log('s', this.rhService.plant.toString());
      me.rhService.getRoundHour(me.rhService.date, me.rhService.plant, me.rhService.rtype, me.rhService.ptype);
      // this.selectedcode = this.rhService.roundhourInfo.plant.toString(8);
      // this.rtype = this.rhService.roundhourInfo.rtype;

    } else {
      me.rhService.roundhourInfo = {
        id: 0,
        shifta: 'A',
        shiftb: 'B',
        shiftc: 'C',
        r7to8: 0,
        r8to9: 0,
        r9to10: 0,
        r10to11: 0,
        r11to12: 0,
        r12to13: 0,
        r13to14: 0,
        r14to15: 0,
        r15to16: 0,
        r16to17: 0,
        r17to18: 0,
        r18to19: 0,
        r19to20: 0,
        r20to21: 0,
        r21to22: 0,
        r22to23: 0,
        r23to24: 0,
        r24to1: 0,
        r1to2: 0,
        r2to3: 0,
        r3to4: 0,
        r4to5: 0,
        r5to6: 0,
        r6to7: 0,
        plant: 0,
        shiftaname: '',
        rtype: '',
        ptype: '',
        shiftbname: '',
        shiftcname: '',
        pstng_date: '',
      };
    }
    console.log("In addroundhour r8to9",this.rhService.roundhourInfo.r8to9);
  }

  getPlant(plantc)
  {
    if(plantc)
    {
      this.plantcode = plantc;

      if (this.plantcode !== '1010') {
        this.roundTotal = 175;
        console.log('from company drop down',this.roundTotal);
      }
      else
      {
        this.plantcode = plantc;
  
        if (this.proType == 'Chrome' && this.insType == 'Jigging' && this.plantcode == '1010') {
            this.roundTotal = 300;
        } else if (this.proType == 'Satin' && this.insType == 'Jigging' && this.plantcode == '1010') {
            this.roundTotal = 250;
        } else if (this.proType == 'Chrome' && this.insType == 'Production' && this.plantcode == '1010') {
            this.roundTotal = 275;
        } else if (this.proType == 'Satin' && this.insType == 'Production' && this.plantcode == '1010') {
            this.roundTotal = 220;
        } else {
            this.roundTotal = 175;
        }
    
      }
    }
  }

  onTypeChange(val) {
    this.proType = val;
    console.log(val);

    if (this.proType == 'Chrome' && this.insType == 'Jigging' && this.plantcode == '1010') {
        this.roundTotal = 300;
    } else if (this.proType == 'Satin' && this.insType == 'Jigging' && this.plantcode == '1010') {
        this.roundTotal = 250;
    } else if (this.proType == 'Chrome' && this.insType == 'Production' && this.plantcode == '1010') {
        this.roundTotal = 275;
    } else if (this.proType == 'Satin' && this.insType == 'Production' && this.plantcode == '1010') {
        this.roundTotal = 220;
    } else {
        this.roundTotal = 175;
    }
  }
  onTypePChange(val) {
    this.insType = val;
    console.log(val);

    if (this.proType == 'Chrome' && this.insType == 'Jigging' && this.plantcode == '1010') {
        this.roundTotal = 300;
    } else if (this.proType == 'Satin' && this.insType == 'Jigging' && this.plantcode == '1010') {
        this.roundTotal = 250;
    } else if (this.proType == 'Chrome' && this.insType == 'Production' && this.plantcode == '1010') {
        this.roundTotal = 275;
    } else if (this.proType == 'Satin' && this.insType == 'Production' && this.plantcode == '1010') {
        this.roundTotal = 220;
    } else {
        this.roundTotal = 175;
    }

  }
  onTypePlantChange(val) {
    if (val !== '1010') {
      this.roundTotal = 175;
    }
}

  getTotalA() {
    return this.rhService.roundhourInfo.r7to8 + this.rhService.roundhourInfo.r8to9 + this.rhService.roundhourInfo.r9to10 + this.rhService.roundhourInfo.r10to11 + this.rhService.roundhourInfo.r11to12 + this.rhService.roundhourInfo.r12to13 + this.rhService.roundhourInfo.r13to14 + this.rhService.roundhourInfo.r14to15;
  }

  getTotalb() {
    return this.rhService.roundhourInfo.r15to16 + this.rhService.roundhourInfo.r16to17 + this.rhService.roundhourInfo.r17to18 + this.rhService.roundhourInfo.r18to19 + this.rhService.roundhourInfo.r19to20 + this.rhService.roundhourInfo.r20to21 + this.rhService.roundhourInfo.r21to22 + this.rhService.roundhourInfo.r22to23;

  }
 
  getTotalC() {
    return this.rhService.roundhourInfo.r23to24 + this.rhService.roundhourInfo.r24to1 + this.rhService.roundhourInfo.r1to2 + this.rhService.roundhourInfo.r2to3 + this.rhService.roundhourInfo.r3to4 + this.rhService.roundhourInfo.r4to5 + this.rhService.roundhourInfo.r5to6 + this.rhService.roundhourInfo.r6to7;
  }

  getTotal()
  {
    return this.rhService.roundhourInfo.r7to8 + this.rhService.roundhourInfo.r8to9 + this.rhService.roundhourInfo.r9to10 + this.rhService.roundhourInfo.r10to11 + this.rhService.roundhourInfo.r11to12 + this.rhService.roundhourInfo.r12to13 + this.rhService.roundhourInfo.r13to14 + this.rhService.roundhourInfo.r14to15
    + this.rhService.roundhourInfo.r15to16 + this.rhService.roundhourInfo.r16to17 + this.rhService.roundhourInfo.r17to18 + this.rhService.roundhourInfo.r18to19 + this.rhService.roundhourInfo.r19to20 + this.rhService.roundhourInfo.r20to21 + this.rhService.roundhourInfo.r21to22 + this.rhService.roundhourInfo.r22to23
    + this.rhService.roundhourInfo.r23to24 + this.rhService.roundhourInfo.r24to1 + this.rhService.roundhourInfo.r1to2 + this.rhService.roundhourInfo.r2to3 + this.rhService.roundhourInfo.r3to4 + this.rhService.roundhourInfo.r4to5 + this.rhService.roundhourInfo.r5to6 + this.rhService.roundhourInfo.r6to7;
  }

  compliance()
  {
    const total = this.getTotal();
    return Math.round((total / this.roundTotal) * 100);
  }

  backtoProduction() {
    this.route.navigate(['./roundhours']);
  }

  onSaveClick()
  {
    this.actionValue = 'Save';
  }
  onCancelClick()
  {
    this.actionValue = 'Cancel';
  }
  
  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
  }

  onComplete(form:NgForm)
  {
    this.rhService.roundhourInfo.plant = parseInt(this.plantcode);
   this.rhService.roundhourInfo.rtype = this.rtype;
    this.rhService.roundhourInfo.ptype = this.ptype;

    if(this.actionValue == 'Save')
    {
      this.rhService.roundhourInfo.pstng_date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
      if(this.rhService.roundhourInfo.id > 0)
      {
        console.log('update date',this.rhService.roundhourInfo);
        this.rhService.updateRoundHour(this.rhService.roundhourInfo.id).subscribe(res => {
          //this.resetForm(form);
          this.getInItval();
          //this.loading = false;

          this.toastr.success(
            'Successfully Updated.',
            'Round Hours'
          );
          this.route.navigate(['./roundhours']);
        }, err => {
          console.log(err);
          //this.loading = false;
        });
      }
      else {
        this.rhService.roundhourInfo.pstng_date = this.rhService.date;
        //this.loading = false;

        this.rhService.saveRoundHour().subscribe(res => {
          this.resetForm(form);
          this.toastr.success(
            'Successfully Saved.',
            'Round Hours'
          );
          this.route.navigate(['./roundhours']);
        }, err => {
          console.log(err);
          //this.loading = false;

        });
      }

    }
    else
    {
      //this.loading = false;
      this.backtoProduction();
    }

  }
  
}