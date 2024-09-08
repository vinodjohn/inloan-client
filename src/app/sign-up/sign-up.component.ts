import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../shared/service/auth.service";
import {Router} from "@angular/router";
import {SignUp} from "../shared/model/SignUp";
import {StorageService} from "../shared/service/storage.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements AfterViewInit {
  signUpForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router,
              private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.signUpForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        idCode: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      {
        validators: this.passwordMatchValidator
      });
  }

  get passwordsMismatch(): boolean {
    return this.signUpForm.hasError('mismatch');
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.loading = true;

      this.authService.signUp(new SignUp(this.signUpForm.get('firstName')?.value, this.signUpForm.get('lastName')?.value,
        this.signUpForm.get('idCode')?.value, this.signUpForm.get('password')?.value)).subscribe({
        next: data => {
          console.log(data);
          this.loading = false;
          this.router.navigate(['/sign-in']);
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.loading = false;

          this.snackBar.open(this.errorMessage, 'Close', {
            duration: 2000,
            panelClass: ['snackbar-error']
          });
        }
      });
    } else {
      this.snackBar.open('Please fix the errors in the form', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-error']
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  private passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return {'mismatch': true};
    }
    return null;
  }

  ngAfterViewInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}
