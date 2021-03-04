import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { pages } from './pages.model';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  readonly rootURL = environment.apiUrl;
  pagelist : pages[];

  constructor(private http: HttpClient) { }

  getPagesbyId(id)
  {
    this.http.get(this.rootURL + '/pages/getpages/' + id)
    .toPromise()
    .then(res => 
      this.pagelist = res as pages[]);
  }
}
