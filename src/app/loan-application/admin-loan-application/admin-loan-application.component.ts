import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LoanContract} from "../../shared/model/LoanContract";
import {environment} from "../../../environments/environment.development";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LoanApplicationService} from "../../shared/service/loan-application.service";
import {Router} from "@angular/router";
import {StorageService} from "../../shared/service/storage.service";
import {map, merge, Observable, startWith} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {LoanApplication} from "../../shared/model/LoanApplication";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-loan-application',
  templateUrl: './admin-loan-application.component.html',
  styleUrl: './admin-loan-application.component.css'
})
export class AdminLoanApplicationComponent implements OnInit, AfterViewInit {
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

  ngOnInit() {
    if (!this.isAdmin) {
      this.snackBar.open('Access denied', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });

      this.router.navigate(['/loan-application']);
    }
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.isAdmin ? this.loanApplicationService.getAllLoanApplications(this.sort.active, this.sort.direction,
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
      ).subscribe((data: any) => {
      this.data = data;
      console.log(this.data);
    });
  }

  onRowClicked(loanApplication: LoanApplication) {
    this.router.navigate(['/loan-application-info/'.concat(loanApplication.id)]);
  }
}
