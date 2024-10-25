import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransportI } from '../../models/logistic';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/transport/`

  constructor(
    private http:HttpClient
  ) { }

  getAllTransport():Observable<{transport:TransportI[]}>{
    return this.http
      .get<{transport:TransportI[]}>(this.base_path)
  }

  getOneTransport(id: number):Observable<TransportI>{
    return this.http
    .get<{ transport: TransportI }>(`${this.base_path}${id}`)
    .pipe(
      map(response => response.transport) // Extrae el objeto 'branch'
    );
  }

  createTransport(data: any):Observable<TransportI>{
    return this.http.post<{ transport: TransportI }>(this.base_path, data)
      .pipe(
        map(response => response.transport) 
      );
  }

  updateTransport(id: number, data: any): Observable<TransportI> {
    return this.http.put<{ transport: TransportI }>(`${this.base_path}${id}`, data)
      .pipe(
        map(response => response.transport) 
      );
  }

  deleteTransport(id: number): Observable<TransportI> {
    return this.http.delete<TransportI>(`${this.base_path}${id}`);
  }
}