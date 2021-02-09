import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/login/User.model';
import { Plant } from 'src/app/shared/plant/plant.model';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { ProductionService } from 'src/app/shared/production/production.service';

@Component({
  selector: 'app-addproduction',
  templateUrl: './addproduction.component.html',
  providers: [DatePipe],
  styleUrls: ['./addproduction.component.css']
})
export class AddproductionComponent implements OnInit {

  public currentUser: User;
  public selectedcode: any;

  public loading = false;
  date : string;
  public insOrdeno: number;
  
  constructor(private service:ProductionService, private router:Router, private toastr: ToastrService,
    private plantservice: PlantService,private datePipe: DatePipe) { }
  
  ngOnInit() {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    // console.log(this.currentUser.id);
  this.plantservice
  .sgetPlantData(this.currentUser.id)
  .toPromise()
  .then(res => {
    this.plantservice.splantlist = [];
    const splantlist = res as Plant[];
    splantlist.forEach(splant => {
      if (splant.plantcode == "1040" || splant.plantcode == "1050") {
        this.plantservice.splantlist.push(splant);
        // this.selectedcode = ''//this.plantservice.splantlist[0].plantcode;
      }
    });
    // this.plantservice.splantlist = res as Plant[];
    // console.log(splantlist[0]);
    // console.log(this.plantservice.splantlist[0].plantcode);
    this.selectedcode = this.plantservice.splantlist[0].plantcode;
    this.randomData();
  });
    
    this.resetForm();
  }
 
 backBtn()
 {
   this.router.navigate(['/viewproduction']);
 }

 randomData() {
    const minm = 10;
    const maxm = 99;
    const value = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    const date = this.datePipe.transform(new Date(), "ddMMyyyy");
    
    this.insOrdeno = parseInt(this.selectedcode + "" + date + "" + value);
    if (this.service.productionData) {
      this.service.productionData.insplot = this.insOrdeno;
      this.service.productionData.orderno = this.insOrdeno;
    }
  }

onPlantcodeChange()
 {
  this.selectedcode = this.service.productionData.plantcode;
  // console.log(this.selectedcode);
  this.randomData();
 }

 resetForm(form?:NgForm){
   if(form!=null)
     form.resetForm();
    this.service.productionData = {
    id:0,
    insplot: 0,
    orderno: 0,
    qty: 0,
    roundno:"",
    plantcode: this.selectedcode,
    shift: "A",
    itemcode: "",
    itemname: "",
    size: "",
    type: "",
    okqty: 0,
    holdqty: 0,
    buffingqty: 0,
    rejectionqty: 0,
    pitting: 0,
    pinhole: 0,
    patchmark: 0,
    nickle: 0,
    crburning: 0,
    skipplating: 0,
    dent: 0,
    handmouldingrej: 0,
    scratchmark: 0,
    roughness: 0,
    silver:0,
    mouldingrej:0,
    warpage:0,
    copperburning:0,
    whitemark:0,
    dotplastic:0,
    watermark:0,
    blister:0,
    jigdamage:0,
    otheR1:0,
    otheR2:0,
    otheR3:0,
    otheR4:0,
    mechfail:0,
    tooldef:0,
    others:0,
    shadevar:0,
    platingpeel:0,
    flowmark:0,
    chemicalmark:0,
    pstngdate:this.date
   }
  }

 onSubmit(form:NgForm){
   console.log("onsubmit func");
   if(this.service.productionData.id == 0)
     this.insertRecord(form);
   else
     this.updateRecord(form);
 }

 insertRecord(form:NgForm){
   this.loading = true;
   this.service.postproduction().subscribe(
     res => {
       this.loading = false;
       this.resetForm(form);
       this.toastr.info('Inserted Successfully','Production');
       this.service.refresList();
     },
     err => {
       this.loading = false;
       console.log(err);
       this.toastr.error('Error while inserting data','Production');
     }
   )
 }

 updateRecord(form:NgForm){
   this.loading = true;
   this.service.putproduction().subscribe(
     res => {
       this.loading = false;
       this.resetForm(form);
       this.toastr.info('Updated Successfully','Production');
       this.service.refresList();
     },
     err => {
       this.loading = false;
       console.log(err);
       this.toastr.error('Error while updating data','Production');
     }
   )
 }
}