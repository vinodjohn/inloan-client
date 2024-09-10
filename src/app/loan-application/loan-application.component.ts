import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {LoanContract} from "../shared/model/LoanContract";
import {environment} from "../../environments/environment.development";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {map, merge, Observable, startWith} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {LoanApplicationService} from "../shared/service/loan-application.service";
import {LoanApplication} from "../shared/model/LoanApplication";
import {StorageService} from "../shared/service/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrl: './loan-application.component.css'
})
export class LoanApplicationComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'requestedAmount', 'actions'];
  data: LoanContract[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  displayPageSize = environment.itemsPerPage;
  isAdmin = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private loanApplicationService: LoanApplicationService, private router: Router,
              private storageService: StorageService, private snackBar: MatSnackBar) {
    this.isAdmin = this.storageService.isAdmin();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.loanApplicationService.getAllLoanApplicationByPerson(this.sort.active, this.sort.direction,
            this.paginator.pageIndex);
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
      ).subscribe((data: any) => {
      this.data = data;
    });
  }

  onRowClicked(loanApplication: LoanApplication) {
    this.router.navigate(['/loan-application-info/'.concat(loanApplication.id)]);
  }

  deleteApplication(loanApplication: LoanApplication) {
    this.loanApplicationService.deleteLoanApplication(loanApplication.id)
      .subscribe(() => {
        this.snackBar.open('Loan application has been deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: 'success-message'
        });
        window.location.reload();
      }, () => {
        this.snackBar.open('Cannot delete Loan application! Please try again later!', 'Close', {
          duration: 4000,
          panelClass: 'snack-error-message'
        });
      });
  }

  restoreApplication(loanApplication: LoanApplication) {
    this.loanApplicationService.restoreLoanApplication(loanApplication.id)
      .subscribe(() => {
        this.snackBar.open('Loan application has been restored successfully!', 'Close', {
          duration: 6000,
          panelClass: 'success-message'
        });
        window.location.reload();
      }, () => {
        this.snackBar.open('Cannot restore loan application! Please try again later!', 'Close', {
          duration: 6000,
          panelClass: 'snack-error-message'
        });
      });
  }
}

