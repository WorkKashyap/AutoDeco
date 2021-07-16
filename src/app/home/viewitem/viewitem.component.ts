import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemmstsService } from 'src/app/shared/Itemmsts/itemmsts.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-viewitem',
  templateUrl: './viewitem.component.html',
  styles: []
})
export class ViewitemComponent implements OnInit {
  cols: any;
  //public loading = false;

  constructor(private service:ItemmstsService, 
    private router:Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    //this.loading = true;
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2500);

    this.service.refreshList();
    this.cols = [
      { field: "view", header: "Action" ,width:"30px"},
      { field: "itemcode", header: "Itemcode" ,width:"50px"},
      { field: "plant", header: "Plant" ,width:"30px"},
      { field: "ctype", header: "Ctype" ,width:"30px"},
      { field: "itemname", header: "Itemname" ,width:"100px"},
      { field: "itemtype", header: "Itemtype" ,width:"40px"},
      { field: "price", header: "Price" ,width:"20px"}
    ];
  }

  additem()
  {
    this.router.navigate(['additem']);
  }

  ViewitemDetail(id)
  {
    this.service.itemid=id;
    this.service.getitemsbyID(this.service.itemid);
    this.router.navigate(['additem']);
  }

  onDelete(id){
    if(confirm('Are you sure?')){
      this.service.deleteItemDetail(id).subscribe(
        res => {
          this.service.refreshList();
          this.toastr.info('Deleted Successfully','Item Master');
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}