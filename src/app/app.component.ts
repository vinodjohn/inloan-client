import {Component, OnDestroy, OnInit} from '@angular/core';
import {StorageService} from "./shared/service/storage.service";
import {AuthService} from "./shared/service/auth.service";
import {EventBusService} from "./shared/service/event-bus.service";
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'loan-portal';

  role = '';
  isLoggedIn = false;
  personName = '';
  eBSubs?: Subscription;
  routerSubscription?: Subscription;

  constructor(private storageService: StorageService, private authService: AuthService,
              private router: Router, private eventBusService: EventBusService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.onComponentLoad();

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.onComponentLoad();
      }
    });

    this.eBSubs = this.eventBusService.on('sign-out', () => {
      this.signOut();
    });
  }

  onComponentLoad() {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const person = this.storageService.getPerson();
      this.role = person.role;
      this.personName = person.fullName;
    } else if (this.router.url !== '/sign-up') {
      this.router.navigate(['/sign-in']);
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  signOut(): void {
    this.authService.signOut().subscribe({
      next: () => {
        this.storageService.clean();

        this.snackBar.open('Signed out successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

        this.router.navigate(['/sign-in']);
      },
      error: () => {
        this.snackBar.open('Technical error. Sign out failed!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
