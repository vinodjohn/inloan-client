import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {KvStoreExtended} from "../../shared/model/KvStoreExtended";
import {KeyValueStoreService} from "../../shared/service/key-value-store.service";

@Component({
  selector: 'app-update-key-value-store',
  templateUrl: './update-key-value-store.component.html',
  styleUrl: './update-key-value-store.component.css'
})
export class UpdateKeyValueStoreComponent implements OnInit {
  kvKeyGroup!: FormGroup;
  kvValueGroup!: FormGroup;
  isStepEditable: boolean = true;
  errorMessage: string = "";
  hasError = false;
  showSpinner = true;

  constructor(public _formBuilder: FormBuilder, public dialogRef: MatDialogRef<UpdateKeyValueStoreComponent>, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: KvStoreExtended,
              private keyValueStoreService: KeyValueStoreService) {
  }

  ngOnInit(): void {
    this.kvKeyGroup = this._formBuilder.group({
      keyCtrl: [this.data.key, Validators.required],
    });
    this.kvValueGroup = this._formBuilder.group({
      valueCtrl: [this.data.value, [Validators.required, Validators.min(0)]],
    });
  }

  updateKV() {
    const name = this.kvKeyGroup.get('keyCtrl')?.value ?? '';
    const value = this.kvValueGroup.get('valueCtrl')?.value ?? 0;
    const kv = new KvStoreExtended(this.data.id, name, value, this.data.isActive);

    this.keyValueStoreService.updateKeyValue(kv).subscribe(() => {
        this.isStepEditable = false;
        this.showSpinner = false;
        this.onNoClick();
        this.snackBar.open('Key value has been updated successfully!', 'Close', {
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

