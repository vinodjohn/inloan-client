import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Person} from "../../shared/model/Person";
import {PersonService} from "../../shared/service/person.service";
import {RoleService} from "../../shared/service/role.service";
import {CreditModifierService} from "../../shared/service/credit-modifier.service";
import {Role} from "../../shared/model/Role";
import {CreditModifier} from "../../shared/model/CreditModifier";

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrl: './update-person.component.css'
})
export class UpdatePersonComponent implements OnInit {
  fNameGroup!: FormGroup;
  lNameGroup!: FormGroup;
  idGroup!: FormGroup;
  roleGroup!: FormGroup;
  cmGroup!: FormGroup;
  isStepEditable: boolean = true;
  errorMessage: string = "";
  hasError = false;
  showSpinner = true;
  roles: Role[] = [];
  creditModifiers: CreditModifier[] = [];

  constructor(public _formBuilder: FormBuilder, public dialogRef: MatDialogRef<UpdatePersonComponent>,
              private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: Person,
              private personService: PersonService, private roleService: RoleService,
              private creditModifierService: CreditModifierService) {
  }

  ngOnInit(): void {
    this.fNameGroup = this._formBuilder.group({
      fNameCtrl: [this.data.firstName, Validators.required],
    });
    this.lNameGroup = this._formBuilder.group({
      lNameCtrl: [this.data.lastName, Validators.required],
    });
    this.idGroup = this._formBuilder.group({
      idCtrl: [this.data.personalIdCode, Validators.required],
    });
    this.roleGroup = this._formBuilder.group({
      roleCtrl: [this.data.role, Validators.required],
    });
    this.cmGroup = this._formBuilder.group({
      cmCtrl: [this.data.creditModifier, Validators.required],
    });

    this.roleService.getAllRoles('', '', 0).subscribe({
      next: data => {
        this.roles = data.objList;
      }
    });

    this.creditModifierService.getAllCreditModifier('', '', 0).subscribe({
      next: data => {
        this.creditModifiers = data.objList;
      }
    });
  }

  updatePerson() {
    const firstName = this.fNameGroup.get('fNameCtrl')?.value ?? '';
    const lastName = this.lNameGroup.get('lNameCtrl')?.value ?? '';
    const idCode = this.idGroup.get('idCtrl')?.value ?? '';
    const role = this.roleGroup.get('roleCtrl')?.value ?? '';
    const cm = this.cmGroup.get('cmCtrl')?.value ?? '';

    const person = new Person(this.data.id, firstName, lastName, idCode, this.data.password, role, cm,
      this.data.isActive);

    this.personService.updatePerson(person).subscribe(() => {
        this.isStepEditable = false;
        this.showSpinner = false;
        this.onNoClick();
        this.snackBar.open('Person has been updated successfully!', 'Close', {
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
