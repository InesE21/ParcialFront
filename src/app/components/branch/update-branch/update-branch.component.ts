import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../../services/branches/branch.service'
import { BranchI } from '../../../models/branch';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-branch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-branch.component.html',
  styleUrl: './update-branch.component.css'
})
export class UpdateBranchComponent implements OnInit{
  public id: number =0;
  public form: FormGroup;
  
  branchService = inject(BranchService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    this.form=this.formBuilder.group({
     id: [''],
     nameB: ['', [Validators.required]],
     location: ['', [Validators.required]],
 
   });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getBranch(this.id);

  }

  getBranch(id: number){
    this.branchService.getOneBranch(id)
    .subscribe({
      next: (data) => {
        this.form.setValue(data)
        // console.log(data.cliente)
      }
    })
  }


  onSubmit(): void {
    const formValue: BranchI = this.form.value;
    const id: number =  this.form.value.id
    this.branchService.updateBranch(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Actualizado', life:5000});

    //  }, 0);
        this.router.navigateByUrl('branch/show');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/branch/show');
  }

  get nameB() { return this.form.get('nameB'); }

  get location() { return this.form.get('location'); }

}
