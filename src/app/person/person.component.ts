import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {map, merge, Observable, startWith} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {Person} from "../shared/model/Person";
import {PersonService} from "../shared/service/person.service";
import {UpdatePersonComponent} from "./update-person/update-person.component";
import {DeletePersonComponent} from "./delete-person/delete-person.component";
import {RestorePersonComponent} from "./restore-person/restore-person.component";


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'personalIdCode', 'role', 'creditModifier', 'createdDate',
    'isActive', 'actions'];
  data: Person[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  displayPageSize = environment.itemsPerPage;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personService: PersonService, public dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.personService.getAllPersons(this.sort.active, this.sort.direction, this.paginator.pageIndex);
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

  updatePerson(person: Person): void {
    const dialogRef = this.dialog.open(UpdatePersonComponent, {
      width: '400px',
      data: person
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  deletePerson(person: Person): void {
    const dialogRef = this.dialog.open(DeletePersonComponent, {
      width: '400px',
      data: person.id
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  restorePerson(person: Person): void {
    const dialogRef = this.dialog.open(RestorePersonComponent, {
      width: '400px',
      data: person.id
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}

