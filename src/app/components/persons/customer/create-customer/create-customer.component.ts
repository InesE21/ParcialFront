import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../../services/persons/customer.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CustomerI } from '../../../../models/person'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent implements OnInit{
  public form: FormGroup;
  customerService = inject(CustomerService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  { 
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required]],           
      fullname: ['', [Validators.required]],      
      address: ['', [Validators.required]],      
      phoneNumber: ['', [Validators.required]],    
      mail: ['', [Validators.required, Validators.email]],  
      customer_type: ['', [Validators.required]],  
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const formValue: CustomerI = this.form.value;
    console.log(formValue);
    this.customerService.createCustomer(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Creado', life:5000});

    //  }, 0);
    console.log(formValue)
        this.router.navigateByUrl('persons/customer/show');

      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/persons/customer/show');
  }

  get dni() { return this.form.get('dni'); }

  get fullname() { return this.form.get('fullname'); }
  
  get address() { return this.form.get('address'); }
  
  get phoneNumber() { return this.form.get('phoneNumber'); }
  
  get mail() { return this.form.get('mail'); }
  
  get customer_type() { return this.form.get('customer_type'); }
  

}
