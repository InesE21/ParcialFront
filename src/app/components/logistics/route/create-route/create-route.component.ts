import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { RouteService } from '../../../../services/logistics/route.service';
import { RouteI } from '../../../../models/logistic';

@Component({
  selector: 'app-create-route',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-route.component.html',
  styleUrl: './create-route.component.css'
})
export class CreateRouteComponent implements OnInit{
  public form: FormGroup;
  routeService = inject(RouteService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  { 
    this.form=this.formBuilder.group({
    origin: ['', [Validators.required]],
    destination: ['', [Validators.required]],

  });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const formValue: RouteI = this.form.value;
    console.log(formValue);
    this.routeService.createRoute(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Creado', life:5000});

    //  }, 0);
    console.log(formValue)
        this.router.navigateByUrl('routes/show');

      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/routes/show');
  }

  get origin() { return this.form.get('origin'); }

  get destination() { return this.form.get('destination'); }
  

}
