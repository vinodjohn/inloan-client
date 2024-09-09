import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PersonService} from "../shared/service/person.service";
import {ChangePassword} from "../shared/model/ChangePassword";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  hideOldPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;
  loading = false;
  isStepEditable: boolean = true;
  errorMessage: string = "";
  hasError = false;
  showSpinner = true;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder,
              private personService: PersonService, private router: Router) {

    this.changePasswordForm = this.fb.group({
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  get passwordsMismatch(): boolean {
    return this.changePasswordForm.hasError('passwordMismatch');
  }

  changePassword() {
    const oPass = this.changePasswordForm.get('oldPassword')?.value ?? '';
    const nPass = this.changePasswordForm.get('newPassword')?.value ?? '';

    const changePasswordObj = new ChangePassword(oPass, nPass);

    this.personService.changePassword(changePasswordObj).subscribe(() => {
        this.isStepEditable = false;
        this.showSpinner = false;

        this.snackBar.open('Password has been updated successfully!', 'Close', {
          duration: 6000,
          panelClass: 'success-message'
        });

        this.router.navigate(['/sign-in']);
      },
      error => {
        this.showSpinner = false;
        this.isStepEditable = true;
        this.hasError = true;
        this.errorMessage = error.error.message;

        this.snackBar.open(this.errorMessage.concat(" ").concat(error.error.details.map((x: any) => x).join(",")), 'Close', {
          duration: 2000,
          panelClass: ['snackbar-error']
        });
      });
  }

  toggleOldPasswordVisibility(): void {
    this.hideOldPassword = !this.hideOldPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.hideNewPassword = !this.hideNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  public passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
     formGroup.setErrors({ passwordMismatch: true });
    }

    return null;
  }
}
