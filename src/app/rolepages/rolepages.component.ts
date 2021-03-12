import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../shared/login/login.service';
import { User } from '../shared/login/User.model';
import { pages } from '../shared/pages/pages.model';
import { PagesService } from '../shared/pages/pages.service';

@Component({
  selector: 'app-rolepages',
  templateUrl: './rolepages.component.html',
  styleUrls: ['./rolepages.component.css']
})
export class RolepagesComponent implements OnInit {
  cols: any;
  prid : number;
  allPagesbyParent: any;
  currentUser: User;

  isAddPages: boolean;
  clonedPages: { [s: string]: any; } = {};

  constructor(private spinner: NgxSpinnerService,
     private pageservice: PagesService,
     private toastr: ToastrService,
     private authenticationService: LoginService) {
      this.authenticationService.currentUser.subscribe(
        x=> (this.currentUser = x)
      )
      }

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
    { field: "name", header: "Name", width: "120px"},
    { field: "description", header: "Description", width: "175px"},
    { field: "url", header: "Url", width: "75px"},
    { field: "view", header: "Action", width:"50px"}
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
        this.getData();
        this.isAddPages = false;
      },
      err => {
        console.log(err)
      }
    );
    this.pageservice.getParentPages();
    this.pageservice.getPagesbyId(this.currentUser.id);
  }

  onModalClose(){
    console.log(this.pageservice.pageData);
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
    this.clonedPages[pd.parentid] = this.prid;
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
        this.toastr.success('Deleted Successfully','Pages');
        this.getData();
        },
        err => {
        console.log(err);
        }
      )
    }
  }

}
