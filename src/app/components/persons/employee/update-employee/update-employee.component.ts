import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../../services/persons/employee.service';
import { EmployeeI } from '../../../../models/person'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit{
  public id: number =0;
  public form: FormGroup;
  
  employeeService = inject(EmployeeService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    this.form = this.formBuilder.group({
      fullname: ['', [Validators.required]],      
      position: ['', [Validators.required]],      
      branch: ['', [Validators.required]],        
      assignedRoute: ['']                         
    });
    
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getEmployee(this.id);

  }

  getEmployee(id: number){
    this.employeeService.getOneEmployee(id)
    .subscribe({
      next: (data) => {
        this.form.setValue(data)
        // console.log(data.cliente)
      }
    })
  }


  onSubmit(): void {
    const formValue: EmployeeI = this.form.value;
    const id: number =  this.form.value.id
    this.employeeService.updateEmployee(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Actualizado', life:5000});

    //  }, 0);
        this.router.navigateByUrl('/persons/employee/show');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/persons/employee/show');
  }

get fullname() { return this.form.get('fullname'); }

get position() { return this.form.get('position'); }

get branch() { return this.form.get('branch'); }

get assignedRoute() { return this.form.get('assignedRoute'); }

}

