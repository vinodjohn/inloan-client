import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoanContract} from "../shared/model/LoanContract";
import {LoanApplication} from "../shared/model/LoanApplication";
import {LoanService} from "../shared/service/loan.service";
import {LoanApplicationService} from "../shared/service/loan-application.service";
import {LoanContractService} from "../shared/service/loan-contract.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-loan-contract',
  templateUrl: './loan-contract.component.html',
  styleUrl: './loan-contract.component.css'
})
export class LoanContractComponent implements OnInit {
  loanContract!: any;

  constructor(private route: ActivatedRoute, private router: Router, private loanContractService: LoanContractService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.loanContractService.getContractById(id).subscribe({
      next: data => {
        this.loanContract = data;
      },
      error: error => {
        this.snackBar.open('Technical error! Please try again later.', 'Close', {
          duration: 2000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  navigateToLoanApplication() {
    this.router.navigate(['/loan-application-info/'.concat(this.loanContract.loanOffer.loanApplication.id)]);
  }
}
