import { Component, OnInit } from '@angular/core';
import { BranchI } from '../../../models/branch';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BranchService } from '../../../services/branches/branch.service'

@Component({
  selector: 'app-show-branch',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-branch.component.html',
  styleUrl: './show-branch.component.css'
})
export class ShowBranchComponent implements OnInit{
  public branches:BranchI[] = []
  constructor(
    private branchService: BranchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showBranches()
  }

  showBranches() {
    this.branchService.getAllBranch()
      .subscribe({
        next: (data) => {
          this.branches = data
          // console.log(this.clientes)
        }
      })
  }


  delete(id: number): void{
    this.router.navigateByUrl('/branches');
    this.branchService.deleteBranch(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
        this.showBranches();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/branches');

      }
    );
  }

}
