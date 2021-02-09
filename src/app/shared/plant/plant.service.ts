<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plant } from './plant.model';
=======
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plant } from './plant.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
>>>>>>> 8cd8a123f16be37b3fccd08ab7c9ba95dbc635c6

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  public plantlist: Plant[];
  public splantlist: Plant[];
<<<<<<< HEAD
  readonly rootUrl = environment.apiUrl;
  constructor(public http: HttpClient) {}

=======
  public plantcode: string;
  readonly rootUrl = environment.apiUrl;
  constructor(public http: HttpClient) {}

  public getPlantDataold(): any {
    return this.http
      .get(this.rootUrl + '/plants')
      .toPromise()
      .then(res => {
        this.plantlist = res as Plant[];
        console.log(this.plantlist);
      });
  }

  public getPlantData(id): any {
    return this.http
      .get(this.rootUrl + '/galvaplants/Galvaplant/' + id)
      .toPromise()
      .then(res => {
        this.plantlist = res as Plant[];
      });
  }

>>>>>>> 8cd8a123f16be37b3fccd08ab7c9ba95dbc635c6
  public sgetPlantData(id): Observable<Plant[]> {
    return this.http.get<Plant[]>(
      this.rootUrl + '/galvaplants/Galvaplant/' + id
    );
  }
}
