import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/service/auth.service";
import {StorageService} from "../shared/service/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignIn} from "../shared/model/SignIn";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements AfterViewInit {
  signInForm: FormGroup;
  hidePassword = true;
  loading = false;
  isSignedIn = false;
  isSignInFailed = false;
  errorMessage = '';
  roles: string = '';

  constructor(private authService: AuthService, private router: Router, private storageService: StorageService,
              private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.signInForm = this.fb.group({
      idCode: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.loading = true;

      this.authService.signIn(new SignIn(this.signInForm.get('idCode')?.value, this.signInForm.get('password')?.value)).subscribe({
        next: data => {
          console.log(data);
          this.storageService.savePerson(data);
          this.loading = false;
          this.isSignInFailed = false;
          this.isSignedIn = true;
          this.roles = this.storageService.getPerson().roles;
          this.router.navigate(['']);
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignInFailed = true;
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

  ngAfterViewInit(): void {
    console.log(this.storageService.isLoggedIn())
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }
}

