import { Component, OnInit } from '@angular/core';
import { ShippingI } from '../../../../models/shipment'; 
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ShippingService } from '../../../../services/shipments/shipping.service';

@Component({
  selector: 'app-show-shipping',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-shipping.component.html',
  styleUrl: './show-shipping.component.css'
})
export class ShowShippingComponent implements OnInit{
  public shipments:ShippingI[] = []
  constructor(
    private shippingService: ShippingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showShipping()
  }

  showShipping() {
    this.shippingService.getAllShipping()
      .subscribe({
        next: (data) => {
          this.shipments = data
          // console.log(this.clientes)
        }
      })
  }


  delete(id: number): void{
    this.router.navigateByUrl('/shipping');
    this.shippingService.deleteShipping(id).subscribe(
      () => {
        //this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
        this.showShipping();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/shipping');

      }
    );
  }

}
