import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreditModifierService} from "../../shared/service/credit-modifier.service";

@Component({
  selector: 'app-delete-credit-modifier',
  templateUrl: './delete-credit-modifier.component.html',
  styleUrl: './delete-credit-modifier.component.css'
})
export class DeleteCreditModifierComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteCreditModifierComponent>, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public id: string, private creditModifierService: CreditModifierService) {
  }

  ngOnInit(): void {
  }

  deleteCar() {
    this.creditModifierService.deleteCreditModifier(this.id)
      .subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Credit Modifier has been deleted successfully!', 'Close', {
          duration: 6000,
          panelClass: 'success-message'
        });
        window.location.reload();
      }, () => {
        this.dialogRef.close();
        this.snackBar.open('Cannot delete Credit Modifier! Please try again later!', 'Close', {
          duration: 6000,
          panelClass: 'snack-error-message'
        });
      });
  }
}

