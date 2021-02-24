import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { year } from './year.service.model';

@Injectable({
  providedIn: 'root'
})
export class YearService {
  readonly rootURL = environment.apiUrl;

  yearlist: year[];


  constructor(private http:HttpClient) { }

  refreshList(){
    this.http.get(this.rootURL+'/year')
    .toPromise()
    .then(res => this.yearlist = res as year[]);
    }
}
