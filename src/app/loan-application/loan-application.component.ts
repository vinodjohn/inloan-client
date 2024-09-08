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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private loanApplicationService: LoanApplicationService, private router: Router) {
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
        console.log(this.data);
      });
  }

  onRowClicked(loanApplication: LoanApplication) {
    this.router.navigate(['/loan-application-info/'.concat(loanApplication.id)]);
  }
}
