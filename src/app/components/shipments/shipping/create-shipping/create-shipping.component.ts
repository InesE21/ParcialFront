import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingService } from '../../../../services/shipments/shipping.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ShippingI } from '../../../../models/shipment'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { CorrespondenceService } from '../../../../services/shipments/correspondence.service';
import { BranchService } from '../../../../services/branches/branch.service';
import { EmployeeService } from '../../../../services/persons/employee.service';
import { CorrespondenceI } from '../../../../models/shipment';
import { BranchI } from '../../../../models/branch';
import { EmployeeI } from '../../../../models/person';


@Component({
  selector: 'app-create-shipping',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-shipping.component.html',
  styleUrl: './create-shipping.component.css'
})
export class CreateShippingComponent implements OnInit{
  public form: FormGroup;
  shippingService = inject(ShippingService);
  correspondences: CorrespondenceI[] = []; 
  branches: BranchI[] = []; 
  employees: EmployeeI[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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
    this.loadData();
  }

  onSubmit(): void {
    const formValue: ShippingI = this.form.value;
    console.log(formValue);
    this.shippingService.createShipping(formValue).subscribe(
      () => {
        
    console.log(formValue)
        this.router.navigateByUrl('shipments/shipping/show');

      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
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



