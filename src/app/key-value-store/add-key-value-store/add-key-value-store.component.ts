import {Component, Inject, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {KeyValueStoreService} from "../../shared/service/key-value-store.service";
import {KvStoreExtended} from "../../shared/model/KvStoreExtended";

@Component({
  selector: 'app-add-key-value-store',
  templateUrl: './add-key-value-store.component.html',
  styleUrl: './add-key-value-store.component.css'
})
export class AddKeyValueStoreComponent {
  isStepEditable: boolean = true;
  errorMessage: string = "";
  hasError = false;
  showSpinner = true;

  private _formBuilder = inject(FormBuilder);

  kvKeyGroup = this._formBuilder.group({
    keyCtrl: ['', Validators.required],
  });
  kvValueGroup = this._formBuilder.group({
    valueCtrl: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(public dialogRef: MatDialogRef<AddKeyValueStoreComponent>, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public isKeyValueAdded: boolean,
              private keyValueStoreService: KeyValueStoreService) {
  }

  addKV() {
    const name = this.kvKeyGroup.get('keyCtrl')?.value ?? '';
    const value = this.kvValueGroup.get('valueCtrl')?.value ?? 0;
    const kv = new KvStoreExtended('', name, value, true);

    this.keyValueStoreService.createKeyValue(kv).subscribe(() => {
        this.isKeyValueAdded = true;
        this.isStepEditable = false;
        this.showSpinner = false;
        this.onNoClick();

        this.snackBar.open('Key value has been added successfully!', 'Close', {
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
    this.isKeyValueAdded = false;
    this.hasError = false;
    this.showSpinner = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

