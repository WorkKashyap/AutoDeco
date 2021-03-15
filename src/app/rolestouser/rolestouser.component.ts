import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { userroles } from '../shared/rolestouser/userroles.model';
import { UserrolesService } from '../shared/rolestouser/userroles.service';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-rolestouser',
  templateUrl: './rolestouser.component.html',
  styleUrls: ['./rolestouser.component.css']
})
export class RolestouserComponent implements OnInit {

  cols: { field: string; header: string; }[];
  roleID : number;
  userData : userroles[];
  ex_userData: userroles;
  is_checked : boolean;
  flag : boolean;

  constructor(private spinner: NgxSpinnerService, private urService:UserrolesService,
              private userService: UserService) { }

  ngOnInit() {
    this.spinner.show();
    this.ex_userData = {
      id : 0,
      roleid : 0,
      userid : 0
    }

    setTimeout(() => {
      this.spinner.hide();
    }, 2500);

    this.roleID = 1;

    this.cols = [
      { field: "chkbox", header: "-" },
      { field: "username", header: "User" }
      ];

      this.getUserdataByRoles(this.roleID);
      this.userService.getusers();
  }

  getUserdataByRoles(rid)
  {
    this.urService.getUsersbyRole(rid)
    .toPromise()
    .then(res =>
         this.userData = res as userroles[]);
    
  }

  checkValue(x:any) 
  {
    this.is_checked = false;
    this.userData.forEach(element => {
      if(element.userid == x)
      {
        this.is_checked = true;
      }
    });
    return this.is_checked;
  }

  roleChng(x:any)
  {
    this.roleID = x;
    this.getUserdataByRoles(this.roleID);
  }

  userRoleChng(uid:number)
  {
    this.flag = false;
    this.userData.forEach(element => {
      if(element.userid == uid)
      {
        //delete data
        this.urService.deleteUserRole(element.id).subscribe(
          res => {
            this.getUserdataByRoles(this.roleID);
          },
          err => {
            console.log(err);
          }
        )
        this.flag = true;
      }
    });
    if(!this.flag)
    {
      //insert data
      this.ex_userData.id=0;
      this.ex_userData.roleid=this.roleID;
      this.ex_userData.userid = uid;
      this.urService.postUserRole(this.ex_userData).subscribe(
        res => {
          this.getUserdataByRoles(this.roleID);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

}
