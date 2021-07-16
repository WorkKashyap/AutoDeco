import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ViewJobworkComponent } from 'src/app/home/view-jobwork/view-jobwork.component';
import { environment } from 'src/environments/environment';
import { jobworkmaterial } from './jobworkmaterial.model';

@Injectable({
  providedIn: 'root'
})
export class JobworkmaterialService {
  readonly rootURL =  environment.apiUrl;
  
  jobworkData: jobworkmaterial;
  list : jobworkmaterial[];
  public jid:number;

  public loading = false;


  constructor(private http:HttpClient,private router:Router) { }

  postjobworkmaterial()
  {
    //console.log(this.rootURL+'/jobworkmaterials');
    return this.http.post(this.rootURL+'/jobworkmaterials',this.jobworkData);
  }
  putjobworkmaterial()
  {
    //console.log(this.rootURL+'/PaymentDetails');
    return this.http.put(this.rootURL+'/jobworkmaterials/'+ this.jobworkData.id, this.jobworkData);
  }
  deletejobworkmaterial(id)
  {
    //console.log(this.rootURL+'/PaymentDetails');
    return this.http.delete(this.rootURL+'/jobworkmaterials/'+ id);
  }

  public getJobworkmaterialDetailbyID(id): any {
    return this.http
      .get(this.rootURL + "/jobworkmaterials/" + id)
      .toPromise()
      .then(res => {
        this.jobworkData = res as jobworkmaterial;
        //console.log(this.jobworkData);
      });
  }

  refresList(){
    this.http.get(this.rootURL+'/jobworkmaterials')
    .toPromise()
    .then(res =>
      this.list = res as jobworkmaterial[]
      //console.log(res)
      );
      this.loading = false;
  }
}
