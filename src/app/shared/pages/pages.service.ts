import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { pages, rolespages } from './pages.model';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  readonly rootURL = environment.apiUrl;
  pagelist : pages[];
  pgList : pages[];
  parentpglist : pages[];

  constructor(private http: HttpClient) { }

  getPagesbyId(id)
  {
    this.http.get(this.rootURL + '/pages/getpages/' + id)
    .toPromise()
    .then(res => 
      this.pagelist = res as pages[]);
  }

  getParentPages()
  {
    this.http.get(this.rootURL + '/pages/getparentpages')
    .toPromise()
    .then(res => 
         this.parentpglist = res as pages[]);
  }

  getPagesbyParent(pid)
  {
    this.http.get(this.rootURL + '/pages/getpagesbyparent/' + pid)
    .toPromise()
    .then(res =>
      this.pgList = res as pages[]);
  }

  getPagesbyRole(rid)
  {
    return this.http.get(this.rootURL + '/rolespages/getpagesbyrole/' + rid);
  }

  getAllPages()
  {
    return this.http.get(this.rootURL + '/pages');
  }
}
