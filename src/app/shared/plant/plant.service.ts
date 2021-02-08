import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plant } from './plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  public plantlist: Plant[];
  public splantlist: Plant[];
  readonly rootUrl = environment.apiUrl;
  constructor(public http: HttpClient) {}

  public sgetPlantData(id): Observable<Plant[]> {
    return this.http.get<Plant[]>(
      this.rootUrl + '/galvaplants/Galvaplant/' + id
    );
  }
}
