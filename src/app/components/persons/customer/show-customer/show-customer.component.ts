import { Component, OnInit } from '@angular/core';
import { CustomerI } from '../../../../models/person'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CustomerService } from '../../../../services/persons/customer.service';

@Component({
  selector: 'app-show-customer',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-customer.component.html',
  styleUrl: './show-customer.component.css'
})
export class ShowCustomerComponent implements OnInit{
  public persons:CustomerI[] = []
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showCustomer()
  }

  showCustomer() {
    this.customerService.getAllCustomer()
      .subscribe({
        next: (data) => {
          this.persons = data
          // console.log(this.clientes)
        }
      })
  }


  delete(id: number): void{
    this.router.navigateByUrl('/customer');
    this.customerService.deleteCustomer(id).subscribe(
      () => {
        //this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
        this.showCustomer();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/customer');

      }
    );
  }

}
