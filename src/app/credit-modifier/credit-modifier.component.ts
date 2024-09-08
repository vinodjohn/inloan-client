import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {RestoreCreditModifierComponent} from "./restore-credit-modifier/restore-credit-modifier.component";
import {DeleteCreditModifierComponent} from "./delete-credit-modifier/delete-credit-modifier.component";
import {UpdateCreditModifierComponent} from "./update-credit-modifier/update-credit-modifier.component";
import {AddCreditModifierComponent} from "./add-credit-modifier/add-credit-modifier.component";
import {CreditModifier} from "../shared/model/CreditModifier";
import {environment} from "../../environments/environment";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {map, merge, Observable, startWith} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {CreditModifierService} from "../shared/service/credit-modifier.service";

@Component({
  selector: 'app-credit-modifier',
  templateUrl: './credit-modifier.component.html',
  styleUrl: './credit-modifier.component.css'
})
export class CreditModifierComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'value', 'createdDate', 'isActive', 'actions'];
  data: CreditModifier[] = [];
  isCreditModifierAdded: boolean = false;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  displayPageSize = environment.itemsPerPage;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private creditModifierService: CreditModifierService, public dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.creditModifierService.getAllCreditModifier(this.sort.active, this.sort.direction, this.paginator.pageIndex);
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

  addCreditModifier(): void {
    const dialogRef = this.dialog.open(AddCreditModifierComponent, {
      width: '400px',
      data: this.isCreditModifierAdded
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  updateCreditModifier(creditModifier: CreditModifier): void {
    const dialogRef = this.dialog.open(UpdateCreditModifierComponent, {
      width: '400px',
      data: creditModifier
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  deleteCreditModifier(creditModifier: CreditModifier): void {
    const dialogRef = this.dialog.open(DeleteCreditModifierComponent, {
      width: '400px',
      data: creditModifier.id
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  restoreCreditModifier(creditModifier: CreditModifier): void {
    const dialogRef = this.dialog.open(RestoreCreditModifierComponent, {
      width: '400px',
      data: creditModifier.id
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
