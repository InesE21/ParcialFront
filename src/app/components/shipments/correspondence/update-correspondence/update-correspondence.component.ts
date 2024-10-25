import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CorrespondenceService } from '../../../../services/shipments/correspondence.service';
import { CorrespondenceI } from '../../../../models/shipment'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicelService } from '../../../../services/logistics/servicel.service';
import { CustomerService } from '../../../../services/persons/customer.service';
import { ServicelI } from '../../../../models/logistic';
import { CustomerI } from '../../../../models/person';

@Component({
  selector: 'app-update-correspondence',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-correspondence.component.html',
  styleUrl: './update-correspondence.component.css'
})
export class UpdateCorrespondenceComponent implements OnInit{
  public id: number =0;
  public form: FormGroup;
  services: ServicelI[] = []; 
  customers: CustomerI[] = []; 
  correspondenceService = inject(CorrespondenceService);


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private servicelService: ServicelService, 
    private customerService: CustomerService
  ) 
  {
    this.form = this.formBuilder.group({
      status: ['', [Validators.required]],  
      correspondence: this.formBuilder.group({
        code: ['', [Validators.required]],  
        correspondenceType: ['', [Validators.required]],  
        weight: [null, [Validators.required]],  
        dimensions: ['', [Validators.required]],  
        shipmentDate: [null, [Validators.required]],  
        deliveryDate: [null, [Validators.required]],  
        sender: [null, [Validators.required]],  
        receiver: [null, [Validators.required]],  
        service: [null, [Validators.required]]  
      }),
    });
    
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getCorrespondence(this.id);
    this.loadData();

  }

  getCorrespondence(id: number){
    this.correspondenceService.getOneCorrespondence(id)
    .subscribe({
      next: (data) => {
        this.form.setValue(data)
        // console.log(data.cliente)
      }
    })
  }


  onSubmit(): void {
    const formValue: CorrespondenceI = this.form.value;
    const id: number =  this.form.value.id
    this.correspondenceService.updateCorrespondence(id, formValue).subscribe(
      () => {
        
        this.router.navigateByUrl('shipments/correspondence/show');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('shipments/correspondence/show');
  }

  get correspondenceCode() { return this.form.get('correspondence.code'); }
  get correspondenceType() { return this.form.get('correspondence.correspondenceType'); }
  get correspondenceWeight() { return this.form.get('correspondence.weight'); }
  get correspondenceDimensions() { return this.form.get('correspondence.dimensions'); }
  get correspondenceShipmentDate() { return this.form.get('correspondence.shipmentDate'); }
  get correspondenceDeliveryDate() { return this.form.get('correspondence.deliveryDate'); }
  get correspondenceSender() { return this.form.get('correspondence.sender'); }
  get correspondenceReceiver() { return this.form.get('correspondence.receiver'); }
  get correspondenceServices() { return this.form.get('correspondence.service'); }


  loadData() {
    this.servicelService.getAllServicel().subscribe(data => {
      this.services = data;
    });

    this.customerService.getAllCustomer().subscribe(data => {
      this.customers = data;
    });
  }

}

