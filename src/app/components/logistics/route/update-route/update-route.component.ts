import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RouteService } from '../../../../services/logistics/route.service';
import { RouteI } from '../../../../models/logistic';

@Component({
  selector: 'app-update-route',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-route.component.html',
  styleUrl: './update-route.component.css'
})
export class UpdateRouteComponent implements OnInit{
  public id: number =0;
  public form: FormGroup;
  
  routeService = inject(RouteService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    this.form=this.formBuilder.group({
     id: [''],
     origin: ['', [Validators.required]],
     destination: ['', [Validators.required]],
 
   });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getRoute(this.id);

  }

  getRoute(id: number){
    this.routeService.getOneRoute(id)
    .subscribe({
      next: (data) => {
        this.form.setValue(data)
        // console.log(data.cliente)
      }
    })
  }


  onSubmit(): void {
    const formValue: RouteI = this.form.value;
    const id: number =  this.form.value.id
    this.routeService.updateRoute(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Actualizado', life:5000});

    //  }, 0);
        this.router.navigateByUrl('route/show');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/route/show');
  }

  get origin() { return this.form.get('origin'); }

  get destination() { return this.form.get('destination'); }

}