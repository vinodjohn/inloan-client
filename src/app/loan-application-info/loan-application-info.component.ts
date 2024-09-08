import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoanApplication} from "../shared/model/LoanApplication";
import {LoanOfferExtended} from "../shared/model/LoanOfferExtended";
import {LoanOfferService} from "../shared/service/loan-offer.service";
import {map, merge, Observable, startWith} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {environment} from "../../environments/environment.development";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LoanApplicationService} from "../shared/service/loan-application.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-loan-application-info',
  templateUrl: './loan-application-info.component.html',
  styleUrl: './loan-application-info.component.css'
})
export class LoanApplicationInfoComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'creditScore', 'loanAmount', 'minPeriod', 'maxPeriod', 'createdDate',
    'loanOfferType', 'loanOfferStatus'];
  loanApplication?: any;
  data: LoanOfferExtended[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  displayPageSize = environment.itemsPerPage;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private loanOfferService: LoanOfferService,
              private loanApplicationService: LoanApplicationService, private snackBar: MatSnackBar) {
  }

  ngAfterViewInit() {
    const id = this.route.snapshot.params['id'];

    this.loanApplicationService.getLoanApplicationById(id).subscribe({
      next: data => {
        this.loanApplication = data;

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.loanOfferService.getAllLoanOffersByApplication(this.sort.active, this.sort.direction,
                this.paginator.pageIndex, this.loanApplication?.id);
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
      }, error: error => {
        this.snackBar.open('Technical error!, Please try again later.', 'Close', {
          duration: 2000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
