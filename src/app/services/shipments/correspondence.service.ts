import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorrespondenceI } from '../../models/shipment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/shipments/correspondence/`

  constructor(
    private http:HttpClient
  ) { }

  getAllCorrespondence():Observable<CorrespondenceI[]>{
    return this.http.get<CorrespondenceI[]>(this.base_path)
  }

  getOneCorrespondence(id: number):Observable<CorrespondenceI>{
    return this.http
      .get<{ correspondence: CorrespondenceI }>(`${this.base_path}${id}`)
      .pipe(
        map(response => response.correspondence)
      )
  }

  createCorrespondence(data: any):Observable<CorrespondenceI>{
    return this.http.post<{ correspondence: CorrespondenceI }>(this.base_path, data)
    .pipe(
      map(response => response.correspondence)
    )
  }

  updateCorrespondence(id: number, data: any): Observable<CorrespondenceI> {
    return this.http.put<{ correspondence: CorrespondenceI }>(`${this.base_path}${id}`, data)
    .pipe(
      map(response => response.correspondence)
    )
  }

  deleteCorrespondence(id: number): Observable<CorrespondenceI> {
    return this.http.delete<CorrespondenceI>(`${this.base_path}${id}`);
  }
}