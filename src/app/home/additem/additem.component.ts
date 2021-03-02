import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Itemmsts } from 'src/app/shared/Itemmsts/itemmsts.model';
import { ItemmstsService } from 'src/app/shared/Itemmsts/itemmsts.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styles: []
})
export class AdditemComponent implements OnInit {

  Itemdetail:Itemmsts;
  public loading = false;

  constructor(private service:ItemmstsService,
    private toastr: ToastrService,
    private router:Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.resetForm();
}

  back(){
    this.router.navigate(['viewitem']);
  }

  cancel()
  {
    this.resetForm();
  }
  
  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.service.itemData = {
      id: 0,
      itemcode: 0,
      plant: 0,
      ctype: '',
      itemname: '',
      itemtype: '',
      price: 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.itemData.id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm){
    //this.loading = true;
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.service.postItemDetail().subscribe(
      res => {
        //this.loading = false;
        this.resetForm(form);
        this.toastr.success('Submitted Successfully','Item Master');
        this.service.refreshList();
      },
      err => {
        //this.loading = false;
        console.log(err)
      }
    )
  }

  updateRecord(form:NgForm){
   // this.loading = true;
   this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);

    this.service.putItemDetail().subscribe(
      res => {
       // this.loading = false;
        this.resetForm(form);
        this.toastr.info('updated Successfully','Item Master');
        this.service.refreshList();
      },
      err => {
        //this.loading = false;
        console.log(err)
      }
    )
  }
}