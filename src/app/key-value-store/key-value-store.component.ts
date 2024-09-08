import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {map, merge, Observable, startWith} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {KvStoreExtended} from "../shared/model/KvStoreExtended";
import {DeleteKeyValueStoreComponent} from "./delete-key-value-store/delete-key-value-store.component";
import {RestoreKeyValueStoreComponent} from "./restore-key-value-store/restore-key-value-store.component";
import {UpdateKeyValueStoreComponent} from "./update-key-value-store/update-key-value-store.component";
import {AddKeyValueStoreComponent} from "./add-key-value-store/add-key-value-store.component";
import {KeyValueStoreService} from "../shared/service/key-value-store.service";

@Component({
  selector: 'app-key-value-store',
  templateUrl: './key-value-store.component.html',
  styleUrl: './key-value-store.component.css'
})
export class KeyValueStoreComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'key', 'value', 'createdDate', 'isActive', 'actions'];
  data: KvStoreExtended[] = [];
  isKeyValueStoreAdded: boolean = false;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  displayPageSize = environment.itemsPerPage;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private keyValueStoreService: KeyValueStoreService, public dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.keyValueStoreService.getAllKeyValue(this.sort.active, this.sort.direction, this.paginator.pageIndex);
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

  addKeyValueStore(): void {
    const dialogRef = this.dialog.open(AddKeyValueStoreComponent, {
      width: '400px',
      data: this.isKeyValueStoreAdded
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  updateKeyValueStore(keyValueStore:  KvStoreExtended): void {
    const dialogRef = this.dialog.open(UpdateKeyValueStoreComponent, {
      width: '400px',
      data: keyValueStore
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  deleteKeyValueStore(keyValueStore:  KvStoreExtended): void {
    const dialogRef = this.dialog.open(DeleteKeyValueStoreComponent, {
      width: '400px',
      data: keyValueStore.id
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  restoreKeyValueStore(keyValueStore: KvStoreExtended): void {
    const dialogRef = this.dialog.open(RestoreKeyValueStoreComponent, {
      width: '400px',
      data: keyValueStore.id
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}

