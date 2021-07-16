import { Injectable } from '@angular/core';
import { Itemmsts } from './itemmsts.model';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
providedIn: 'root'
})
export class ItemmstsService {
itemData:Itemmsts;
// readonly rootURL = 'http://192.168.0.102:1122/api';
readonly rootURL = environment.apiUrl;

itemlist : Itemmsts[];
public itemid:number;
// public itemmst:Itemmsts;

constructor(private http:HttpClient) { }

postItemDetail()
{
//console.log(this.rootURL+'/PaymentDetails');
return this.http.post(this.rootURL+'/itemmsts',this.itemData);
}
// postPaymentDetail2()
// {
// //console.log(this.rootURL+'/PaymentDetails');
// return this.http.post(this.rootURL+'/PaymentDetails',this.paymentdetail);
// }

putItemDetail()
{
//console.log(this.rootURL+'/PaymentDetails');
return this.http.put(this.rootURL+'/itemmsts/'+ this.itemData.id, this.itemData);
}

deleteItemDetail(id)
{
//console.log(this.rootURL+'/PaymentDetails');
return this.http.delete(this.rootURL+'/itemmsts/'+ id);
}

public getitemsbyID(id): any {
return this.http
.get(this.rootURL + "/itemmsts/" + id)
.toPromise()
.then(res => {
this.itemData = res as Itemmsts;
//console.log(this.paymentdetail);
});
}
refreshList(){
this.http.get(this.rootURL+'/itemmsts')
.toPromise()
.then(res => this.itemlist = res as Itemmsts[]);
}

}


