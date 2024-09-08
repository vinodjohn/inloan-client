import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {KeyValueStoreService} from "../../shared/service/key-value-store.service";

@Component({
  selector: 'app-restore-key-value-store',
  templateUrl: './restore-key-value-store.component.html',
  styleUrl: './restore-key-value-store.component.css'
})
export class RestoreKeyValueStoreComponent {
  constructor(public dialogRef: MatDialogRef<RestoreKeyValueStoreComponent>, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public id: string, private keyValueStoreService: KeyValueStoreService) {
  }

  restoreKV() {
    this.keyValueStoreService.restoreKeyValue(this.id)
      .subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Key value has been restored successfully!', 'Close', {
          duration: 6000,
          panelClass: 'success-message'
        });
        window.location.reload();
      }, () => {
        this.dialogRef.close();
        this.snackBar.open('Cannot restore Key Value! Please try again later!', 'Close', {
          duration: 6000,
          panelClass: 'snack-error-message'
        });
      });
  }
}
