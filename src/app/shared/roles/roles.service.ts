import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Roles } from './roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  readonly rootURL = environment.apiUrl;

  public rolesData:Roles = {'id':0,"role":""};
  roleslist:Roles[];
  rolesId: any;
  getRoles: Roles;

  constructor(private http:HttpClient) { }

  // refreshRoles(){
    
  //   this.http.get(this.rootURL+'/roles')
  //   .toPromise()
  //   .then(res => this.roleslist = res as Roles[]);
  // }

  postRolesDetail()
  {
    return this.http.post(this.rootURL+'/roles',this.rolesData);
  }

  putRolesDetail(rolesData)
  {
    return this.http.put(this.rootURL+'/roles/'+ rolesData.id, rolesData);
  }

  deleteRolesDetail(rolesData)
  {
    return this.http.delete(this.rootURL+'/roles/'+ rolesData.id);
  }

  public getAllRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(
      this.rootURL + "/roles"
    );
  }
  
  // public getRolesbyID(id): any {
  //   return this.http
  //   .get(this.rootURL + "/roles/" + id)
  //   .toPromise()
  //   .then(res => {
  //   this.rolesData = res as Roles;
  //   console.log(this.rolesData.id);
  //   });
  // }

}