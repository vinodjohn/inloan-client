import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreditModifierService} from "../../shared/service/credit-modifier.service";
import {CreditModifier} from "../../shared/model/CreditModifier";

@Component({
  selector: 'app-update-credit-modifier',
  templateUrl: './update-credit-modifier.component.html',
  styleUrl: './update-credit-modifier.component.css'
})
export class UpdateCreditModifierComponent implements OnInit {
  cmNameGroup!: FormGroup;
  cmValueGroup!: FormGroup;
  isStepEditable: boolean = true;
  errorMessage: string = "";
  hasError = false;
  showSpinner = true;

  constructor(public _formBuilder: FormBuilder, public dialogRef: MatDialogRef<UpdateCreditModifierComponent>, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: CreditModifier,
              private creditModifierService: CreditModifierService) {
  }

  ngOnInit(): void {
    this.cmNameGroup = this._formBuilder.group({
      nameCtrl: [this.data.name, Validators.required],
    });
    this.cmValueGroup = this._formBuilder.group({
      valueCtrl: [this.data.value, [Validators.required, Validators.min(1)]],
    });
  }

  updateCreditModifier() {
    const name = this.cmNameGroup.get('nameCtrl')?.value ?? '';
    const value = this.cmValueGroup.get('valueCtrl')?.value ?? 0;
    const creditModifier = new CreditModifier(this.data.id, name, value, this.data.isActive);

    this.creditModifierService.updateCreditModifier(creditModifier).subscribe(() => {
        this.isStepEditable = false;
        this.showSpinner = false;
        this.onNoClick();
        this.snackBar.open('Credit modifier has been updated successfully!', 'Close', {
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
    this.hasError = false;
    this.showSpinner = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
