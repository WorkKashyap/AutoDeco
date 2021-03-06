import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobworkmaterialService } from 'src/app/shared/jobworkmaterial/jobworkmaterial.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-view-jobwork',
  templateUrl: './view-jobwork.component.html',
  styleUrls: ['./view-jobwork.component.css']
})
export class ViewJobworkComponent implements OnInit {
  cols: any;

  constructor(private service:JobworkmaterialService, private router:Router,  private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    //this.service.loading = true;
    this.spinner.show();

    this.service.refresList();

    setTimeout(()=>{
      this.spinner.hide()
    }, 2500);
    
    this.cols = [
    { field: "view", header: "Action" ,width:"30px"},
    { field: "materialNumber", header: "number" ,width:"50px"},
    { field: "materialDesc", header: "Desc" ,width:"100px"},
    { field: "rateINR", header: "rate" ,width:"30px"},
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
        this.toastr.info('Deleted Successfully','Job work material');
        },
        err => {
          console.log(err)
        }
        )
      }
    }
}
