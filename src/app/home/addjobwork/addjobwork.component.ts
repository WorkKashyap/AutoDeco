import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AutoDecoService } from 'src/app/shared/auto-deco.service';


@Component({
  selector: 'app-addjobwork',
  templateUrl: './addjobwork.component.html',
  styleUrls: ['./addjobwork.component.css']
})
export class AddjobworkComponent implements OnInit {

  constructor(private service:AutoDecoService) { }

  ngOnInit() {
    this.resetForm();
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
      this.updateRecord(form);
  }

  insertRecord(form:NgForm){
    this.service.postjobworkmaterial().subscribe(
      res => {
        //console.log(this.service.jobworkData);
        this.resetForm(form);
        //this.toastr.success('Submitted Successfully','Payment Detail register');
        this.service.refresList();
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
