import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { userroles } from './userroles.model';

@Injectable({
  providedIn: 'root'
})
export class UserrolesService {

  rootURL = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getUsersbyRole(roleid: number)
  {
    return  this.http.get(this.rootURL + '/userroles/GetuserByroles/'+ roleid);
  }

  putUserRole(id: number, userSData: userroles)
  {
    return this.http.put(this.rootURL + '/userroles/' + id, userSData);
  }

  postUserRole(userList : userroles)
  {
    return this.http.post(this.rootURL + '/userroles', userList);
  }

  deleteUserRole(id : number)
  {
    return this.http.delete(this.rootURL + '/userroles/'+id);
  }
}
