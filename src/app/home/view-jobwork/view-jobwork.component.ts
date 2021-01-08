import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutoDecoService } from 'src/app/shared/auto-deco.service';

@Component({
  selector: 'app-view-jobwork',
  templateUrl: './view-jobwork.component.html',
  styleUrls: ['./view-jobwork.component.css']
})
export class ViewJobworkComponent implements OnInit {
  cols: any;

  constructor(private service:AutoDecoService, private router:Router) { }

  ngOnInit() {
    this.service.refresList();
    this.cols = [
    { field: "view", header: "Action" },
    { field: "MaterialNumber", header: "number" },
    { field: "MaterialDesc", header: "Desc" },
    { field: "RateINR", header: "rate" },
  ];
}

  ViewDetail(id)
    {
    this.service.jid=id;
    this.router.navigate(['home/addjobwork']);
    //console.log(id);
    }

  onDelete(id){
      if(confirm('Are you sure?')){
        this.service.deletejobworkmaterial(id).subscribe(
        res => {
        this.service.refresList();
        // add toatr
        },
        err => {
        console.log(err)
        }
        )
      }
    }
}
