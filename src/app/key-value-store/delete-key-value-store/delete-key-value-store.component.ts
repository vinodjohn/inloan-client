import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {KeyValueStoreService} from "../../shared/service/key-value-store.service";

@Component({
  selector: 'app-delete-key-value-store',
  templateUrl: './delete-key-value-store.component.html',
  styleUrl: './delete-key-value-store.component.css'
})
export class DeleteKeyValueStoreComponent {
  constructor(public dialogRef: MatDialogRef<DeleteKeyValueStoreComponent>, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public id: string, private keyValueStoreService: KeyValueStoreService) {
  }

  deleteKV() {
    this.keyValueStoreService.deleteKeyValue(this.id)
      .subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Key Value has been deleted successfully!', 'Close', {
          duration: 6000,
          panelClass: 'success-message'
        });
        window.location.reload();
      }, () => {
        this.dialogRef.close();
        this.snackBar.open('Cannot delete Key Value! Please try again later!', 'Close', {
          duration: 6000,
          panelClass: 'snack-error-message'
        });
      });
  }
}

