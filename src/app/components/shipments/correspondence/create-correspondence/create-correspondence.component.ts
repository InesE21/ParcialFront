import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CorrespondenceI } from '../../../../models/shipment'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { CorrespondenceService } from '../../../../services/shipments/correspondence.service';
import { ServicelService } from '../../../../services/logistics/servicel.service';
import { CustomerService } from '../../../../services/persons/customer.service';
import { ServicelI } from '../../../../models/logistic';
import { CustomerI } from '../../../../models/person';


@Component({
  selector: 'app-create-correspondence',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-correspondence.component.html',
  styleUrl: './create-correspondence.component.css'
})
export class CreateCorrespondenceComponent implements OnInit{
  public form: FormGroup;
  correspondenceService = inject(CorrespondenceService);
  services: ServicelI[] = []; 
  customers: CustomerI[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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
    this.loadData();
  }

  onSubmit(): void {
    const formValue: CorrespondenceI = this.form.value;
    console.log(formValue);
    this.correspondenceService.createCorrespondence(formValue).subscribe(
      () => {
        
    console.log(formValue)
        this.router.navigateByUrl('shipments/correspondence/show');

      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
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




