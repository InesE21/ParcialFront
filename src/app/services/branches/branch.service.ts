import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchI } from '../../models/branch';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/branches/`

  constructor(
    private http:HttpClient
  ) { }

  getAllBranch(): Observable<BranchI[]> {
    return this.http
      .get<{ branches: BranchI[] }>(this.base_path) // Asegúrate de que coincida con la estructura de la respuesta
      .pipe(
        map(response => response.branches) // Extrae el array de sucursales
      );
  }

  getOneBranch(id: number): Observable<BranchI> {
    return this.http
      .get<{ branch: BranchI }>(`${this.base_path}${id}`)
      .pipe(
        map(response => response.branch) // Extrae el objeto 'branch'
      );
  }



  createBranch(data: any): Observable<BranchI> {
    return this.http.post<{ branch: BranchI }>(this.base_path, data)
      .pipe(
        map(response => response.branch) 
      );
  }
  

  updateBranch(id: number, data: any): Observable<BranchI> {
    return this.http.put<{ branch: BranchI }>(`${this.base_path}${id}`, data)
      .pipe(
        map(response => response.branch) 
      );
  }
  

  deleteBranch(id: number): Observable<BranchI> {
    return this.http.delete<BranchI>(`${this.base_path}${id}`);
  }
}