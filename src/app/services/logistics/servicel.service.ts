import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicelI } from '../../models/logistic';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicelService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/logistics/service/`

  constructor(
    private http:HttpClient
  ) { }

  getAllServicel():Observable<ServicelI[]>{
    return this.http.get<ServicelI[] >(this.base_path)
  }

  getOneServicel(id: number):Observable<ServicelI>{
    return this.http
      .get<{ servicel: ServicelI }>(`${this.base_path}${id}`)
      .pipe(
        map(response => response.servicel)
      )
  }

  createServicel(data: any):Observable<ServicelI>{
    return this.http.post<{ servicel: ServicelI }>(this.base_path, data)
    .pipe(
      map(response => response.servicel)
    )
  }

  updateServicel(id: number, data: any): Observable<ServicelI> {
    return this.http.put<{ servicel: ServicelI }>(`${this.base_path}${id}`, data)
    .pipe(
      map(response => response.servicel)
    )
  }

  deleteServicel(id: number): Observable<ServicelI> {
    return this.http.delete<ServicelI>(`${this.base_path}${id}`);
  }
}