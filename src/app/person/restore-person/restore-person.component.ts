import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PersonService} from "../../shared/service/person.service";


@Component({
  selector: 'app-restore-person',
  templateUrl: './restore-person.component.html',
  styleUrl: './restore-person.component.css'
})
export class RestorePersonComponent{
  constructor(public dialogRef: MatDialogRef<RestorePersonComponent>, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public id: string, private personService: PersonService) {
  }

  restorePerson() {
    this.personService.restorePerson(this.id)
      .subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Person has been restored successfully!', 'Close', {
          duration: 6000,
          panelClass: 'success-message'
        });
        window.location.reload();
      }, () => {
        this.dialogRef.close();
        this.snackBar.open('Cannot restore Person! Please try again later!', 'Close', {
          duration: 6000,
          panelClass: 'snack-error-message'
        });
      });
  }
}

