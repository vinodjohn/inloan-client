import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoanContractService} from "../shared/service/loan-contract.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StorageService} from "../shared/service/storage.service";

@Component({
  selector: 'app-loan-contract',
  templateUrl: './loan-contract.component.html',
  styleUrl: './loan-contract.component.css'
})
export class LoanContractComponent implements OnInit {
  loanContract!: any;
  isAdmin = false;

  constructor(private route: ActivatedRoute, private router: Router, private loanContractService: LoanContractService,
              private snackBar: MatSnackBar, private storageService: StorageService) {
    this.isAdmin = this.storageService.isAdmin();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.loanContractService.getContractById(id).subscribe({
      next: data => {
        this.loanContract = data;
      },
      error: () => {
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
