import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { pages, rolespages } from './pages.model';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  readonly rootURL = environment.apiUrl;
  pagelist : pages[];
  public pgList : pages[];
  parentpglist : pages[];
  public pageData:pages = {"id":0,"name":"","description":"","url":"","parentid":0};

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

  // getPagesbyParent(pid)
  // {
  //   this.http.get(this.rootURL + '/pages/getpagesbyparent/' + pid)
  //   .toPromise()
  //   .then(res =>
  //     this.pgList = res as pages[]);
  // }

  public getPagesbyParent(pid): Observable<pages[]> {
    return this.http.get<pages[]>(
      this.rootURL + "/pages/getpagesbyparent/" + pid
    );
  }

  getPagesbyRole(rid)
  {
    return this.http.get(this.rootURL + '/rolespages/getpagesbyrole/' + rid);
  }

  getAllPages()
  {
    return this.http.get(this.rootURL + '/pages');
  }

  postPagesDetail()
  {
    return this.http.post(this.rootURL+'/pages',this.pageData);
  }

  putPagesDetail(pageData)
  {
    return this.http.put(this.rootURL+'/pages/'+ pageData.id, pageData);
  }

  deletePagesDetail(pageData)
  {
    return this.http.delete(this.rootURL+'/pages/'+ pageData.id);
  }
  
  postPageRecordbyRole(rlpages : rolespages)
  {
    return this.http.post(this.rootURL + '/rolespages', rlpages);
  }

  deletePageRecordbyRole(id: number)
  {
    return this.http.delete(this.rootURL + '/rolespages/' + id);
  }
}
