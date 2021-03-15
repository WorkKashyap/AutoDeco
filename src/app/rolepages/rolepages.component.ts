import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { pages } from '../shared/pages/pages.model';
import { PagesService } from '../shared/pages/pages.service';
import { ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-rolepages',
  templateUrl: './rolepages.component.html',
  styleUrls: ['./rolepages.component.css']
})
export class RolepagesComponent implements OnInit {
  cols: any;
  prid : number;
  allPagesbyParent: any;
  
  isAddPages: boolean;
  clonedPages: { [s: string]: any; } = {};

  @ViewChild('closeAddPageModal',{static: true}) closeAddPageModal: ElementRef;

  constructor(private spinner: NgxSpinnerService,
     private pageservice: PagesService,
     private toastr: ToastrService){}

  ngOnInit() {
    this.spinner.show();
    this.isAddPages=false;

    setTimeout(() => {
      this.spinner.hide();
    }, 2500);

    this.pageservice.getParentPages();
    this.prid = 1;
    // this.pageservice.getPagesbyParent(this.prid);

    this.cols = [
    { field: "name", header: "Name", width: "100px"},
    { field: "description", header: "Description", width: "150px"},
    { field: "url", header: "Url", width: "75px"},
    { field: "view", header: "Action", width:"40px"}
    ];
    this.getData();
  }

  getData() {
    this.pageservice
      .getPagesbyParent(this.prid)
      .toPromise()
      .then(res => {
        this.allPagesbyParent = res as pages[];
      });
  }

  onParentPageChange(parentpgid: number)
  {
    this.prid = parentpgid;
    this.pageservice.getPagesbyParent(this.prid);
    this.getData();
  }

  onModalSubmit(){
    this.pageservice.pageData.parentid=0;
    this.pageservice.postPagesDetail().subscribe(
      res => {
        this.toastr.success('Submitted Successfully','Pages');
        this.isAddPages = false;
        this.pageservice.getParentPages();
      },
      err => {
        console.log(err)
      }
    );
    this.closeAddPageModal.nativeElement.click();
  }

  onModalClose(){
    this.resetModal();
  }

  resetModal(modalForm?:NgForm){
    if(modalForm!=null)
    modalForm.resetForm();
    this.pageservice.pageData = {
      id: 0,
      name: "",
      description: "",
      url: "",
      parentid: 0
    }
  }

  onRowEditInit(pd : any){
    this.clonedPages[pd.id] = {...pd};
  }

  onRowEditSave(row: any) {
    row.parentid=this.prid;
    this.pageservice.putPagesDetail(row).subscribe(
    res => {
      this.toastr.success('Updated Successfully', 'Save Page');
      this.getData();
    },
    err => {
      console.log(err);
    });
  }

  onRowEditCancel(row:any, index: number) {
    if (!row.id) {
      this.allPagesbyParent.splice(index, 1);
    }
    delete this.clonedPages[row.id];
  }

  onAddPages() {
    this.isAddPages = true;
  }
  
  onSave(){
    this.pageservice.pageData.parentid=this.prid;
    this.pageservice.postPagesDetail().subscribe(
      res => {
        this.toastr.success('Submitted Successfully','Pages');
        this.getData();
        this.isAddPages = false;
      },
      err => {
        console.log(err)
      }
    )
  }
  onCancel(){
    this.isAddPages = false;
  }

  deleteRole(row:any){
    if(confirm('Are you sure?')){
      console.log("id ",row.id," deleted");
      this.pageservice.deletePagesDetail(row).subscribe(
        res => {
        this.toastr.info('Deleted Successfully','Pages');
        this.getData();
        },
        err => {
        console.log(err);
        }
      )
    }
  }

}
