import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IncidentI } from '../../../../models/shipment';
import { IncidentService } from '../../../../services/shipments/incident.service';

@Component({
  selector: 'app-show-incident',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-incident.component.html',
  styleUrl: './show-incident.component.css'
})
export class ShowIncidentComponent implements OnInit{
  public incidents:IncidentI[] = []
  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showIncidents()
  }

  showIncidents() {
    this.incidentService.getAllIncident()
      .subscribe({
        next: (data) => {
          this.incidents = data
          console.log(this.incidents)
        }
      })
  }


  delete(id: number): void{
    this.router.navigateByUrl('/incidents');
    this.incidentService.deleteIncident(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
        this.showIncidents();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/incidents');

      }
    );
  }

}
