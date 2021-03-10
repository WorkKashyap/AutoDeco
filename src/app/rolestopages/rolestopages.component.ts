import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { pages, rolespages } from '../shared/pages/pages.model';
import { PagesService } from '../shared/pages/pages.service';

@Component({
  selector: 'app-rolestopages',
  templateUrl: './rolestopages.component.html',
  styleUrls: ['./rolestopages.component.css']
})
export class RolestopagesComponent implements OnInit {
  cols: { field: string; header: string; }[];
  pageList: pages[];
  rolePagesList : rolespages[];
  ex_rolePagesList : rolespages;
  roleID : number;
  is_checked: boolean;
  flag: boolean;

  constructor(private spinner: NgxSpinnerService, private pageservice: PagesService) { }

  ngOnInit() {
    this.ex_rolePagesList = {
      id : 0,
      roleid : 0,
      pageid : 0
    }

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2500);

    this.roleID = 1;
    this.getPageListbyRole(this.roleID);
    this.getPageTbData();

    this.cols = [
      { field: "chkbox", header: "-" },
      { field: "name", header: "Page" },
      ];
  }

  getPageTbData()
  {
    this.pageservice.getAllPages()
    .toPromise()
    .then(res =>
        this.pageList = res as pages[]);
  }

  getPageListbyRole(rid: number)
  {
    this.pageservice.getPagesbyRole(this.roleID)
    .toPromise()
    .then(res => 
      this.rolePagesList = res as rolespages[]);
  }

  checkValue(x: number)
  {
    this.is_checked = false;
    this.rolePagesList.forEach(element => {
      if(element.pageid == x)
      {
        this.is_checked = true;
      }
    });
    return this.is_checked;
  }

  pageRoleChng(pid: number)
  {
    this.flag = false;
    this.rolePagesList.forEach(element => {
      if(element.pageid == pid)
      {
        //delete the data
        this.flag = true;
        this.pageservice.deletePageRecordbyRole(element.id).subscribe(
          res => {
            this.getPageListbyRole(this.roleID);
          },
          err => {
            console.log(err);
          }
        )
      }
    });
    if(!this.flag)
    {
      //insert new record
      this.ex_rolePagesList.roleid = this.roleID;
      this.ex_rolePagesList.pageid = pid;
      this.pageservice.postPageRecordbyRole(this.ex_rolePagesList).subscribe(
        res => {
          this.getPageListbyRole(this.roleID);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  roleChng(x: number)
  {
    this.roleID = x;
    this.getPageListbyRole(this.roleID);
  }
}
