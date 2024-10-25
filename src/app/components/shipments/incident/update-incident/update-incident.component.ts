import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IncidentService } from '../../../../services/shipments/incident.service';
import { IncidentI } from '../../../../models/shipment';

@Component({
  selector: 'app-update-incident',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-incident.component.html',
  styleUrl: './update-incident.component.css'
})
export class UpdateIncidentComponent implements OnInit{
  public id: number =0;
  public form: FormGroup;
  
  incidentService = inject(IncidentService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    this.form=this.formBuilder.group({
     id: [''],
     description: ['', [Validators.required]],
     incidentDate: ['', [Validators.required]],
     resolutionStatus: ['', [Validators.required]],
     correspondence: ['', [Validators.required]],
   });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getIncident(this.id);

  }

  getIncident(id: number){
    this.incidentService.getOneIncident(id)
    .subscribe({
      next: (data) => {
        this.form.setValue(data)
        // console.log(data.cliente)
      }
    })
  }


  onSubmit(): void {
    const formValue: IncidentI = this.form.value;
    const id: number =  this.form.value.id
    this.incidentService.updateIncident(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Actualizado', life:5000});

    //  }, 0);
        this.router.navigateByUrl('incident/show');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/incident/show');
  }

  get description() { return this.form.get('description'); }
  get incidentDate() { return this.form.get('incidentDate'); }
  get resolutionStatus() { return this.form.get('resolutionStatus'); }
  get correspondence() { return this.form.get('correspondence'); }

}
