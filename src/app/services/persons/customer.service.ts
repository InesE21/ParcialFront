import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerI } from '../../models/person';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/persons/`

  constructor(
    private http:HttpClient
  ) { }

  getAllCustomer():Observable<CustomerI[]>{
    return this.http
      .get<{ customers: CustomerI[] }>(this.base_path)
      .pipe(
        map(response => response.customers)
      )
  }

  getOneCustomer(id: number):Observable<CustomerI>{
    return this.http
      .get<{ customer: CustomerI }>(`${this.base_path}${id}`)
      .pipe(
        map(response => response.customer)
      )
  }

  createCustomer(data: any):Observable<CustomerI>{
    return this.http.post<{ customer: CustomerI }>(this.base_path, data)
    .pipe(
      map(response => response.customer)
    )
  }

  updateCustomer(id: number, data: any): Observable<CustomerI> {
    return this.http.put<{ customer: CustomerI }>(`${this.base_path}${id}`, data)
    .pipe(
      map(response => response.customer)
    )
  }

  deleteCustomer(id: number): Observable<CustomerI> {
    return this.http.delete<CustomerI>(`${this.base_path}${id}`);
  }
}