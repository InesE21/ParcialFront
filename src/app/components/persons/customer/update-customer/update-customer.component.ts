import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../../services/persons/customer.service';
import { CustomerI } from '../../../../models/person'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css'
})
export class UpdateCustomerComponent implements OnInit{
  public id: number =0;
  public form: FormGroup;
  
  customerService = inject(CustomerService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getCustomer(this.id);

  }

  getCustomer(id: number){
    this.customerService.getOneCustomer(id)
    .subscribe({
      next: (data) => {
        this.form.setValue(data)
        // console.log(data.cliente)
      }
    })
  }


  onSubmit(): void {
    const formValue: CustomerI = this.form.value;
    const id: number =  this.form.value.id
    this.customerService.updateCustomer(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Actualizado', life:5000});

    //  }, 0);
        this.router.navigateByUrl('/persons/customer/show');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
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
