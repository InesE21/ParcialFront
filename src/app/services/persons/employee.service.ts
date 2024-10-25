import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeI } from '../../models/person';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/persons/employee`

  constructor(
    private http:HttpClient
  ) { }

  getAllEmployee():Observable<EmployeeI[]>{
    return this.http
      .get<{ employees: EmployeeI[] }>(this.base_path)
      .pipe(
        map(response => response.employees)
      )
  }

  getOneEmployee(id: number):Observable<EmployeeI>{
    return this.http
      .get<{ employee: EmployeeI }>(`${this.base_path}${id}`)
      .pipe(
        map(response => response.employee)
      )
  }

  createEmployee(data: any):Observable<EmployeeI>{
    return this.http.post<{ employee: EmployeeI }>(this.base_path, data)
    .pipe(
      map(response => response.employee)
    )
  }

  updateEmployee(id: number, data: any): Observable<EmployeeI> {
    return this.http.put<{ employee: EmployeeI }>(`${this.base_path}${id}`, data)
    .pipe(
      map(response => response.employee)
    )
  }

  deleteEmployee(id: number): Observable<EmployeeI> {
    return this.http.delete<EmployeeI>(`${this.base_path}${id}`);
  }
}