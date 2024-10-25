import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchService } from '../../../services/branches/branch.service'
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BranchI } from '../../../models/branch';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-create-branch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-branch.component.html',
  styleUrl: './create-branch.component.css'
})
export class CreateBranchComponent implements OnInit{
  public form: FormGroup;
  branchService = inject(BranchService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  { 
    this.form=this.formBuilder.group({
    nameB: ['', [Validators.required]],
    location: ['', [Validators.required]],

  });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const formValue: BranchI = this.form.value;
    console.log(formValue);
    this.branchService.createBranch(formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');

    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Creado', life:5000});

    //  }, 0);
    console.log(formValue)
        this.router.navigateByUrl('branch/show');

      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/branch/show');
  }

  get nameB() { return this.form.get('nameB'); }

  get location() { return this.form.get('location'); }
  

}
