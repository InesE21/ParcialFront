import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicelService } from '../../../../services/logistics/servicel.service';
import { Router } from '@angular/router';
import { ServicelI } from '../../../../models/logistic';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css'
})
export class CreateServiceComponent implements OnInit{
  public form: FormGroup;
  servicelService = inject(ServicelService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  { 
    this.form = this.formBuilder.group({
      transportation: ['', [Validators.required]],           
      cost: ['', [Validators.required]],      
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const formValue: ServicelI = this.form.value;
    console.log(formValue);
    this.servicelService.createServicel(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Creado', life:5000});

    //  }, 0);
    console.log(formValue)
        this.router.navigateByUrl('logistics/servicel/show');

      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/logistics/servicel/show');
  }

  get destination() { return this.form.get('destination'); }

  get cost() { return this.form.get('cost'); }

}
