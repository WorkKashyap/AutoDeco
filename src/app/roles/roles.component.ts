import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Roles } from '../shared/roles/roles.model';
import { RolesService } from '../shared/roles/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  cols:any[];
  allRoles: any;
  role:any = '';
  fieldArray: Array<any> = [
    {
      "this.service.rolesData" : ""
    }
  ];

  editing: boolean = false;

  isAddRoles: boolean;
  isEditRoles: boolean;

  clonedRoles: { [s: string]: any; } = {};

  constructor(private service:RolesService, 
    private router:Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.isAddRoles=false;
    this.isEditRoles=false;
    
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2500);

    this.service.refreshRoles();

    this.cols = [
      { field: "role", header: "Role" },
      { field: "edit", header: "Action" }
    ];
    this.getData();
  }

  getData() {
    this.service
      .getAllRoles()
      .toPromise()
      .then(res => {
        this.allRoles = res as Roles[];
      });
  }

  onRowEditInit(pd : any){
    console.log("Inside onRowEditInit function");
    this.clonedRoles[pd.id] = {...pd};
  }

  onRowEditSave(row: any) {
    if (row.id) {
      this.service.putRolesDetail(row).subscribe(
        res => {
          this.toastr.success('Updated Successfully', 'Save Role');
          this.getData();
        },
        err => {
          console.log(err);
        });
    } else {
      this.service.postRolesDetail(row).subscribe(
        res => {
          this.toastr.success('Submitted Successfully', 'Save Role');
          this.getData();
        },
        err => {
          console.log(err);
        });
    }
  }

  onRowEditCancel(row:any, index: number) {
    if (!row.id) {
      this.allRoles.splice(index, 1);
    }
    delete this.clonedRoles[row.id];
    // this.roles2[index] = this.clonedRoles[pd.id];
    // delete this.clonedRoles[pd.id];
  }

  onAddRoles() {
    this.isAddRoles = true;
  }

  // onEditRoles(roleId){
  //   this.isEditRoles = true;
  //   this.service.rolesId=roleId;
  //   console.log(this.service.rolesId);
  //   // this.service.getRolesbyID(this.service.rolesId);
  //   // this.service.rolesData.id=this.service.rolesId;
  //   // console.log(this.service.rolesData.id);
  //   // this.saveEditChanges();
  // }
  
  onSave(row:any){
    this.service.postRolesDetail(row).subscribe(
      res => {
        this.toastr.success('Submitted Successfully','Roles');
        this.service.refreshRoles();
        this.isAddRoles = false;
      },
      err => {
        console.log(err)
      }
    )
  }
  onCancel(){
    this.isAddRoles = false;
  }

  saveEditChanges(){
    // this.service.putRolesDetail().subscribe(
    //   res => {
    //     this.toastr.info('updated Successfully','Roles');
    //     this.service.refreshRoles();
    //   },
    //   err => {
    //     console.log(err)
    //   }
    // )
  }

  deleteRole(row:any){
    if(confirm('Are you sure?')){
      this.service.deleteRolesDetail(row).subscribe(
        res => {
        this.toastr.success('Deleted Successfully','Roles');
        this.getData();
        },
        err => {
        console.log(err);
        }
      )
    }
  }

}