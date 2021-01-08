import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JobworkmaterialService } from 'src/app/shared/jobworkmaterial/jobworkmaterial.service';


@Component({
  selector: 'app-addjobwork',
  templateUrl: './addjobwork.component.html',
  styleUrls: ['./addjobwork.component.css']
})
export class AddjobworkComponent implements OnInit {

  constructor(private service:JobworkmaterialService, private router:Router) { }

  ngOnInit() {
    this.resetForm();
    //console.log(this.service.jid);
  }

  cancelRecord()
  {
    this.resetForm();
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
     // this.updateRecord(form);
     this.service.getJobworkmaterialDetailbyID(this.service.jid);
  }

  insertRecord(form:NgForm){
    this.service.postjobworkmaterial().subscribe(
      res => {
        //console.log(this.service.jobworkData);
       /* this.resetForm(form);
        //this.toastr.success('Submitted Successfully','Payment Detail register');
        this.service.refresList();*/
        this.router.navigate(['/view-jobwork']);
      },
      err => {
        console.log(err)
      }
    )
  }

  updateRecord(form:NgForm){
    this.service.putjobworkmaterial().subscribe(
      res => {
        this.resetForm(form);
        //this.toastr.info('updated Successfully','Payment Detail register');
        this.service.refresList();
      },
      err => {
        console.log(err)
      }
    )
  }

}
