import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PersonService} from "../../shared/service/person.service";


@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrl: './delete-person.component.css'
})
export class DeletePersonComponent {
  constructor(public dialogRef: MatDialogRef<DeletePersonComponent>, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public id: string, private personService: PersonService) {
  }

  deletePerson() {
    this.personService.deletePerson(this.id)
      .subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Person has been deleted successfully!', 'Close', {
          duration: 6000,
          panelClass: 'success-message'
        });
        window.location.reload();
      }, () => {
        this.dialogRef.close();
        this.snackBar.open('Cannot delete Person! Please try again later!', 'Close', {
          duration: 6000,
          panelClass: 'snack-error-message'
        });
      });
  }
}


