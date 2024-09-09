import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LoanContractService} from "../shared/service/loan-contract.service";
import {LoanContract} from "../shared/model/LoanContract";
import {environment} from "../../environments/environment.development";
import {map, merge, Observable, startWith} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {StorageService} from "../shared/service/storage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
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
              private storageService: StorageService) {
    this.isAdmin = this.storageService.isAdmin();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.loanContractService.getAllLoanContractByPerson(this.sort.active, this.sort.direction,
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
      ).subscribe((data: any) => this.data = data);
  }

  onRowClicked(loanContract: LoanContract) {
    this.router.navigate(['/loan-contract/'.concat(loanContract.id)]);
  }
}

