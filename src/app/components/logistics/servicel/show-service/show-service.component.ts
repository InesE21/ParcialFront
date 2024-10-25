import { Component, OnInit } from '@angular/core';
import { ServicelI } from '../../../../models/logistic';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ServicelService } from '../../../../services/logistics/servicel.service';

@Component({
  selector: 'app-show-service',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-service.component.html',
  styleUrl: './show-service.component.css'
})
export class ShowServiceComponent implements OnInit {
  public servicesl:ServicelI[] = []
  constructor(
    private servicelService: ServicelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showServicesl()
  }

  showServicesl() {
    this.servicelService.getAllServicel()
      .subscribe({
        next: (data) => {
          console.log(data); // Depuración: ¿Están llegando los datos?
          this.servicesl = data;
        },
        error: (err) => {
          console.error('Error fetching services:', err);
        }
      });
  }
  


  delete(id: number): void{
    this.router.navigateByUrl('/servicesl');
    this.servicelService.deleteServicel(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
        this.showServicesl();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/servicesl');

      }
    );
  }

}
