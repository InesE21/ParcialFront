import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingService } from '../../../../services/shipments/shipping.service';
import { ShippingI } from '../../../../models/shipment'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CorrespondenceService } from '../../../../services/shipments/correspondence.service';
import { BranchService } from '../../../../services/branches/branch.service';
import { EmployeeService } from '../../../../services/persons/employee.service';
import { CorrespondenceI } from '../../../../models/shipment';
import { BranchI } from '../../../../models/branch';
import { EmployeeI } from '../../../../models/person';


@Component({
  selector: 'app-update-shipping',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-shipping.component.html',
  styleUrl: './update-shipping.component.css'
})
export class UpdateShippingComponent implements OnInit{
  public id: number =0;
  public form: FormGroup;
  correspondences: CorrespondenceI[] = []; 
  branches: BranchI[] = []; 
  employees: EmployeeI[] = []; 
  shippingService = inject(ShippingService);

  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private correspondenceService: CorrespondenceService, 
    private branchService: BranchService, 
    private employeeService: EmployeeService
  ) 
  {
    this.form = this.formBuilder.group({
      status: ['', [Validators.required]],  
      correspondence: [null, [Validators.required]],  
      branch: [null, [Validators.required]], 
      employee: [null, [Validators.required]] 
    }); 
    
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getShipping(this.id);
    this.loadData();

  }

  getShipping(id: number){
    this.shippingService.getOneShipping(id)
    .subscribe({
      next: (data) => {
        this.form.setValue(data)
        // console.log(data.cliente)
      }
    })
  }


  onSubmit(): void {
    const formValue: ShippingI = this.form.value;
    const id: number =  this.form.value.id
    this.shippingService.updateShipping(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Actualizado', life:5000});

    //  }, 0);
        this.router.navigateByUrl('/shipments/shipping/show');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/shipments/shipping/show');
  }

  get status() { return this.form.get('status'); }
  get dateTime() { return this.form.get('dateTime'); }
  get correspondence() { return this.form.get('correspondence'); }
  get branch() { return this.form.get('branch'); }
  get employee() { return this.form.get('employee'); }

  loadData() {
    this.correspondenceService.getAllCorrespondence().subscribe(data => {
      this.correspondences = data;
    });

    this.branchService.getAllBranch().subscribe(data => {
      this.branches = data;
    });

    this.employeeService.getAllEmployee().subscribe(data => {
      this.employees = data;
    });
  }

}

