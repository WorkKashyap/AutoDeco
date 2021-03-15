import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobworkmaterialService } from 'src/app/shared/jobworkmaterial/jobworkmaterial.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-addjobwork',
  templateUrl: './addjobwork.component.html',
  styleUrls: ['./addjobwork.component.css']
})
export class AddjobworkComponent implements OnInit {
  
  public loading = false;

  constructor(private service:JobworkmaterialService, private router:Router, private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
     this.resetForm();
     //console.log(this.service.jobworkData);
    //console.log(this.service.jid);
  }

  cancelRecord()
  {
    this.spinner.show();
    this.resetForm();
    setTimeout(() => {
      this.spinner.hide();
    }, 2500);
  }

  backBtn()
  {
    this.router.navigate(['/view-jobwork']);
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.service.jobworkData = {
      id: 0,
      MaterialNumber: 0,
      MaterialDesc: '',
      RateINR: 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.jobworkData.id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
     /*this.service.getJobworkmaterialDetailbyID(this.service.jid);
     console.log(this.service.jobworkData);*/
  }

  insertRecord(form:NgForm){
   // this.loading = true;
   this.spinner.show();
    this.service.postjobworkmaterial().subscribe(
      res => {
        //console.log(this.service.jobworkData);
        //this.loading = false;
        this.spinner.hide();
        this.resetForm(form);
        this.toastr.info('Inserted Successfully','Job work material');
        this.service.refresList();
        //this.router.navigate(['/view-jobwork']);
      },
      err => {
        //this.loading = false;
        this.spinner.hide();
        console.log(err);
        this.toastr.error('Error while inserting data','Job work material');
      }
    )
  }

  updateRecord(form:NgForm){
    //this.loading = true;
    this.spinner.show();
    this.service.putjobworkmaterial().subscribe(
      res => {
        //this.loading = false;
        this.spinner.hide();
        this.resetForm(form);
        this.toastr.info('Updated Successfully','Job work material');
        this.service.refresList();
        //this.router.navigate(['/view-jobwork']);
      },
      err => {
        //this.loading = false;
        this.spinner.hide();
        console.log(err);
        this.toastr.error('Error while updating data','Job work material');
      }
    )
  }

}
