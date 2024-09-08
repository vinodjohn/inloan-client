import {Component, inject, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreditModifierService} from "../../shared/service/credit-modifier.service";
import {CreditModifier} from "../../shared/model/CreditModifier";

@Component({
  selector: 'app-add-credit-modifier',
  templateUrl: './add-credit-modifier.component.html',
  styleUrl: './add-credit-modifier.component.css'
})
export class AddCreditModifierComponent {
  isStepEditable: boolean = true;
  errorMessage: string = "";

  hasError = false;
  showSpinner = true;

  private _formBuilder = inject(FormBuilder);

  cmNameGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
  });
  cmValueGroup = this._formBuilder.group({
    valueCtrl: [0, Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<AddCreditModifierComponent>, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public isCreditModifierAdded: boolean,
              private creditModifierService: CreditModifierService) {
  }

  addCreditModifier() {
    const name = this.cmNameGroup.get('nameCtrl')?.value ?? '';
    const value = this.cmValueGroup.get('valueCtrl')?.value ?? 0;
    const creditModifier = new CreditModifier('', name, value, true);

    this.creditModifierService.createCreditModifier(creditModifier).subscribe(() => {
        this.isCreditModifierAdded = true;
        this.isStepEditable = false;
        this.showSpinner = false;
        this.onNoClick();

        this.snackBar.open('Credit modifier has been added successfully!', 'Close', {
          duration: 6000,
          panelClass: 'success-message'
        });

        window.location.reload();
      },
      error => {
        this.showSpinner = false;
        this.isStepEditable = false;
        this.hasError = true;
        this.errorMessage = error.error.message + error.error.details.toString();
      });
  }

  resetResult() {
    this.isCreditModifierAdded = false;
    this.hasError = false;
    this.showSpinner = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
