import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CorrespondenceService } from '../../../services/shipments/correspondence.service';
import { CorrespondenceI } from '../../../models/shipment';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  searchTerm: string = '';
  correspondenceData: CorrespondenceI[] = [];
  filteredResults: CorrespondenceI[] = [];

  constructor(private correspondenceService: CorrespondenceService) {}

  ngOnInit(): void {
    this.loadAllCorrespondence();
  }

  loadAllCorrespondence(): void {
    this.correspondenceService.getAllCorrespondence().subscribe(
      (data: CorrespondenceI[]) => {
        this.correspondenceData = data;
        this.filteredResults = data; // Mostrar todos los resultados inicialmente
      },
      error => {
        console.error('Error al cargar correspondencias:', error);
      }
    );
  }

  searchCorrespondence(): void {
    if (this.searchTerm) {
      this.filteredResults = this.correspondenceData.filter(item =>
        item.code.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredResults = this.correspondenceData;
    }
  }
}
