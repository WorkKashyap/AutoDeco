import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { PagesService } from '../shared/pages/pages.service';

@Component({
  selector: 'app-rolepages',
  templateUrl: './rolepages.component.html',
  styleUrls: ['./rolepages.component.css']
})
export class RolepagesComponent implements OnInit {
  cols: { field: string; header: string; }[];
  prid : number;

  constructor(private spinner: NgxSpinnerService, private pageservice: PagesService) { }

  ngOnInit() {
    this.spinner.show();


    setTimeout(() => {
      this.spinner.hide();
    }, 2500);

    this.pageservice.getParentPages();
    this.prid = 1;
    this.pageservice.getPagesbyParent(this.prid);

    this.cols = [
    { field: "name", header: "Name" },
    { field: "description", header: "Description" },
    { field: "url", header: "Url" },
    { field: "view", header: "Action" }
    ];
  }

  onParentPageChange(parentpgid: number)
  {
    this.prid = parentpgid;
    this.pageservice.getPagesbyParent(this.prid);
  }

}
