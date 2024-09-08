import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreditModifierService} from "../../shared/service/credit-modifier.service";

@Component({
  selector: 'app-restore-credit-modifier',
  templateUrl: './restore-credit-modifier.component.html',
  styleUrl: './restore-credit-modifier.component.css'
})
export class RestoreCreditModifierComponent {
  constructor(public dialogRef: MatDialogRef<RestoreCreditModifierComponent>, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public id: string, private creditModifierService: CreditModifierService) {
  }

  restoreCreditModifier() {
    this.creditModifierService.restoreCreditModifier(this.id)
      .subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Credit Modifier has been restored successfully!', 'Close', {
          duration: 6000,
          panelClass: 'success-message'
        });
        window.location.reload();
      }, () => {
        this.dialogRef.close();
        this.snackBar.open('Cannot restore Credit Modifier! Please try again later!', 'Close', {
          duration: 6000,
          panelClass: 'snack-error-message'
        });
      });
  }
}

