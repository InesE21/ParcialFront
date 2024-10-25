import { Component, OnInit } from '@angular/core';
import { EmployeeI } from '../../../../models/person'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EmployeeService } from '../../../../services/persons/employee.service';

@Component({
  selector: 'app-show-employee',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-employee.component.html',
  styleUrl: './show-employee.component.css'
})
export class ShowEmployeeComponent implements OnInit{
  public persons:EmployeeI[] = []
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showEmployee()
  }

  showEmployee() {
    this.employeeService.getAllEmployee()
      .subscribe({
        next: (data) => {
          this.persons = data
          // console.log(this.clientes)
        }
      })
  }


  delete(id: number): void{
    this.router.navigateByUrl('/employee');
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
        this.showEmployee();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/employee');

      }
    );
  }

}
