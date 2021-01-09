import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobworkmaterialService } from 'src/app/shared/jobworkmaterial/jobworkmaterial.service';

@Component({
  selector: 'app-view-jobwork',
  templateUrl: './view-jobwork.component.html',
  styleUrls: ['./view-jobwork.component.css']
})
export class ViewJobworkComponent implements OnInit {
  cols: any;

  constructor(private service:JobworkmaterialService, private router:Router) { }

  ngOnInit() {
    this.service.refresList();
    this.cols = [
    { field: "view", header: "Action" },
    { field: "materialNumber", header: "number" },
    { field: "materialDesc", header: "Desc" },
    { field: "rateINR", header: "rate" },
  ];
}

  displayJobworkdata()
  {
    this.router.navigate(['/addjobwork']);
  }

  ViewDetail(id)
    {
    this.service.jid=id;
    this.service.getJobworkmaterialDetailbyID(this.service.jid);
    this.router.navigate(['/addjobwork']);
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
