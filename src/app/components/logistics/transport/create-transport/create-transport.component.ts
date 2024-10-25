import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { TransportService } from '../../../../services/logistics/transport.service';
import { TransportI } from '../../../../models/logistic';


@Component({
  selector: 'app-create-transport',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-transport.component.html',
  styleUrl: './create-transport.component.css'
})
export class CreateTransportComponent implements OnInit{
  public form: FormGroup;
  transportService = inject(TransportService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  { 
    this.form=this.formBuilder.group({
    transportation: ['', [Validators.required]],
    capacity: ['', [Validators.required]],

  });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const formValue: TransportI = this.form.value;
    console.log(formValue);
    this.transportService.createTransport(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Creado', life:5000});

    //  }, 0);
    console.log(formValue)
        this.router.navigateByUrl('transport/show');

      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/transport/show');
  }

  get transportation() { return this.form.get('transportation'); }

  get capacity() { return this.form.get('capacity'); }
  

}