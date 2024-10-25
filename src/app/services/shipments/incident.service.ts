import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IncidentI } from '../../models/shipment';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/shipments/incident`

  constructor(
    private http:HttpClient
  ) { }

  getAllIncident():Observable<IncidentI[]>{
    return this.http.get<IncidentI[]>(this.base_path)
  }

  getOneIncident(id: number):Observable<IncidentI>{
    return this.http
      .get<IncidentI>(`${this.base_path}${id}`)
  }

  createIncident(data: any):Observable<IncidentI>{
    return this.http.post<IncidentI>(this.base_path, data)
  }

  updateIncident(id: number, data: any): Observable<IncidentI> {
    return this.http.put<IncidentI>(`${this.base_path}${id}`, data);
  }

  deleteIncident(id: number): Observable<IncidentI> {
    return this.http.delete<IncidentI>(`${this.base_path}${id}`);
  }
}