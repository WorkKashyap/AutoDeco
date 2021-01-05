import { Injectable } from '@angular/core';
import { PaymentDetail } from './auto-deco.model';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutoDecoService {
  formData:PaymentDetail;
  readonly rootURL =  'http://192.168.0.104:1111/api';
  
  list : PaymentDetail[];
  public paymentdetail:PaymentDetail;
  public pid:number;

  constructor(private http:HttpClient) { }

  /*postPaymentDetail(formData:PaymentDetail)
  {
    console.log(this.rootURL+'/PaymentDetails');
    return this.http.post(this.rootURL+'/PaymentDetails',formData);
  }*/
  postPaymentDetail()
  {
    //console.log(this.rootURL+'/PaymentDetails');
    return this.http.post(this.rootURL+'/PaymentDetails',this.formData);
  }
  postPaymentDetail2()
  {
    //console.log(this.rootURL+'/PaymentDetails');
    return this.http.post(this.rootURL+'/PaymentDetails',this.paymentdetail);
  }

  putPaymentDetail()
  {
    //console.log(this.rootURL+'/PaymentDetails');
    return this.http.put(this.rootURL+'/PaymentDetails/'+ this.formData.Pmid, this.formData);
  }

  putPaymentDetail2()
  {
    //console.log(this.rootURL+'/PaymentDetails');
    return this.http.put(this.rootURL+'/PaymentDetails/'+ this.paymentdetail.Pmid, this.paymentdetail);
  }

  deletePaymentDetail(id)
  {
    //console.log(this.rootURL+'/PaymentDetails');
    return this.http.delete(this.rootURL+'/PaymentDetails/'+ id);
  }

 /* getPaymentDetail(id)
  {
    //console.log(this.rootURL+'/PaymentDetails');
    console.log(id);
    return this.http.get(this.rootURL+'/PaymentDetails/'+ 1);
  }*/

  public getPaymentDetailbyID(id): any {
    return this.http
      .get(this.rootURL + "/PaymentDetails/" + id)
      .toPromise()
      .then(res => {
        this.paymentdetail = res as PaymentDetail;
        //console.log(this.paymentdetail);
      });
  }
  refresList(){
    this.http.get(this.rootURL+'/PaymentDetails')
    .toPromise()
    .then(res => this.list = res as PaymentDetail[]);
  }

}



