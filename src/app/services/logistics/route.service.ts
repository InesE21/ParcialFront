import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouteI } from '../../models/logistic';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/logistics/route/`

  constructor(
    private http:HttpClient
  ) { }

  getAllRoute():Observable<RouteI[]>{
    return this.http
      .get<RouteI[]>(this.base_path)
  }

  getOneRoute(id: number):Observable<RouteI>{
    return this.http
      .get<RouteI>(`${this.base_path}${id}`)
  }



  createRoute(data: any):Observable<RouteI>{
    return this.http.post<RouteI>(this.base_path, data)
  }

  updateRoute(id: number, data: any): Observable<RouteI> {
    return this.http.put<RouteI>(`${this.base_path}${id}`, data);
  }

  deleteRoute(id: number): Observable<RouteI> {
    return this.http.delete<RouteI>(`${this.base_path}${id}`);
  }
}