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

constructor(private service:ItemmstsService, private router:Router,private toastr: ToastrService,private spinner: NgxSpinnerService) { }

ngOnInit() {
//this.loading = true;
this.spinner.show();

setTimeout(() => {
  this.spinner.hide();
}, 2500);

this.service.refreshList();
this.cols = [
{ field: "view", header: "Action" },
{ field: "itemcode", header: "Itemcode" },
{ field: "plant", header: "Plant" },
{ field: "ctype", header: "Ctype" },
{ field: "itemname", header: "Itemname" },
{ field: "itemtype", header: "Itemtype" },
{ field: "price", header: "Price" }
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
this.router.navigate(['/additem']);
// console.log(id);
}
onDelete(id){
if(confirm('Are you sure?')){
this.service.deleteItemDetail(id).subscribe(
res => {
this.service.refreshList();
this.toastr.success('Deleted Successfully','Item Master');
},
err => {
console.log(err)
}
)
}
}
}