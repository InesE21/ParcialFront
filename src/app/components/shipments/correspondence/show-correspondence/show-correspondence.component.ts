import { Component, OnInit } from '@angular/core';
import { CorrespondenceI } from '../../../../models/shipment';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CorrespondenceService } from '../../../../services/shipments/correspondence.service';

@Component({
  selector: 'app-show-correspondence',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-correspondence.component.html',
  styleUrl: './show-correspondence.component.css'
})
export class ShowCorrespondenceComponent {
  public correspondences:CorrespondenceI[] = []
  constructor(
    private correspondenceService: CorrespondenceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showCorrespondences()
  }

  showCorrespondences() {
    this.correspondenceService.getAllCorrespondence()
      .subscribe({
        next: (data) => {
          console.log(data); // Depuración: ¿Están llegando los datos?
          this.correspondences = data;
        },
        error: (err) => {
          console.error('Error fetching correspondences:', err);
        }
      });
  }
  


  delete(id: number): void{
    this.router.navigateByUrl('/correspondences');
    this.correspondenceService.deleteCorrespondence(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
        this.showCorrespondences();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/correspondences');

      }
    );
  }
}
