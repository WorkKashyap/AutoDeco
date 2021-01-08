import { Injectable } from '@angular/core';
import { jobworkmaterial } from './auto-deco.model';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutoDecoService {
  //readonly rootURL =  'http://192.168.0.104:1111/api';
  readonly rootURL =  'http://localhost:1122/api';
  
  jobworkData: jobworkmaterial;
  list : jobworkmaterial[];
  public jid:number;

  constructor(private http:HttpClient) { }

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

  refresList(){
    this.http.get(this.rootURL+'/jobworkmaterials')
    .toPromise()
    .then(res => this.list = res as jobworkmaterial[]);
  }

}



