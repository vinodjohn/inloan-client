import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LoanContract} from "../../shared/model/LoanContract";
import {environment} from "../../../environments/environment.development";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LoanContractService} from "../../shared/service/loan-contract.service";
import {Router} from "@angular/router";
import {StorageService} from "../../shared/service/storage.service";
import {map, merge, Observable, startWith} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'monthlyAmount', 'period', 'createdDate', 'isActive', 'actions'];
  data: LoanContract[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  displayPageSize = environment.itemsPerPage;
  isAdmin = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private loanContractService: LoanContractService, private router: Router,
              private storageService: StorageService, private snackBar: MatSnackBar) {
    this.isAdmin = this.storageService.isAdmin();
  }

  ngOnInit() {
    if (!this.isAdmin) {
      this.snackBar.open('Access denied', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });

      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.isAdmin ? this.loanContractService.getAllLoanContracts(this.sort.active, this.sort.direction,
            this.paginator.pageIndex) : [];
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;
          return data.objList;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return new Observable();
        })
      ).subscribe((data: any) => this.data = data);
  }

  onRowClicked(loanContract: LoanContract) {
    this.router.navigate(['/loan-contract/'.concat(loanContract.id)]);
  }

  deleteContract(loanContract: LoanContract) {
    this.loanContractService.deleteLoanContract(loanContract.id)
      .subscribe(() => {
        this.snackBar.open('Contract has been deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: 'success-message'
        });
        window.location.reload();
      }, () => {
        this.snackBar.open('Cannot delete Contract! Please try again later!', 'Close', {
          duration: 4000,
          panelClass: 'snack-error-message'
        });
      });
  }

  restoreContract(loanContract: LoanContract) {
    this.loanContractService.restoreLoanContract(loanContract.id)
      .subscribe(() => {
        this.snackBar.open('Contract has been restored successfully!', 'Close', {
          duration: 6000,
          panelClass: 'success-message'
        });
        window.location.reload();
      }, () => {
        this.snackBar.open('Cannot restore Contract! Please try again later!', 'Close', {
          duration: 6000,
          panelClass: 'snack-error-message'
        });
      });
  }
}

