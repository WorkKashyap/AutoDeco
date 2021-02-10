import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { production } from './production.model';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  public productionData: production;
  public productionlist: production[] = [];

  readonly rootURL =  environment.apiUrl;
  
  // productionData: production;
  list : production[];
  public pid:number;

  public loading = false;

  constructor(private http:HttpClient,private router:Router) { }

  public productions(code): Observable<production[]> {
    // return this.http.get<Productions[]>(this.rootUrl + "/productions");
    return this.http.get<production[]>(this.rootURL + "/productions/GetProductionbycomp/" + code);
  }
  public productionbyid(id): Observable<production[]> {
    return this.http.get<production[]>(this.rootURL + "/productions/" + id);
  }

  postproduction()
  {
    //console.log(this.rootURL+'/jobworkmaterials');
    return this.http.post(this.rootURL+'/productions',this.productionData);
  }
  putproduction()
  {
    //console.log(this.rootURL+'/PaymentDetails');
    return this.http.put(this.rootURL+'/productions/'+ this.productionData.id, this.productionData);
  }
  // deleteproduction(id)
  // {
  //   //console.log(this.rootURL+'/PaymentDetails');
  //   return this.http.delete(this.rootURL+'/productions/'+ id);
  // }

  public getProductionDetailbyID(id): any {
    return this.http
      .get(this.rootURL + "/productions/" + id)
      .toPromise()
      .then(res => {
        this.productionData = res as production;
        //console.log(this.jobworkData);
      });
  }

  refresList(){
    this.http.get(this.rootURL+'/productions')
    .toPromise()
    .then(res =>
      this.list = res as production[]
      );
      this.loading = false;
  }
}
