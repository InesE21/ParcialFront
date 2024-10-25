import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TransportService } from '../../../../services/logistics/transport.service';
import { TransportI } from '../../../../models/logistic';

@Component({
  selector: 'app-show-transport',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-transport.component.html',
  styleUrl: './show-transport.component.css'
})
export class ShowTransportComponent implements OnInit{
  public transports:TransportI[] = []
  constructor(
    private transportService: TransportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showTransports()
  }

  showTransports() {
    this.transportService.getAllTransport()
      .subscribe({
        next: (data) => {
          this.transports = data.transport
          console.log(this.transports)
        }
      })
  }


  delete(id: number): void{
    this.router.navigateByUrl('/transports');
    this.transportService.deleteTransport(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
        this.showTransports();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/transports');

      }
    );
  }

}
