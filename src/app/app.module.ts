import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {SignInComponent} from './sign-in/sign-in.component';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterModule, Routes} from "@angular/router";
import {AppInterceptor, httpInterceptorProviders} from "./shared/interceptor/app.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardComponent} from './dashboard/dashboard.component';
import { NewLoanComponent } from './new-loan/new-loan.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperModule,
  MatStepperNext,
  MatStepperPrevious
} from "@angular/material/stepper";
import {MatSlider, MatSliderModule} from "@angular/material/slider";
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

const appRoutes: Routes = [
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'new-loan',
    component: NewLoanComponent
  },
  {
    path: 'loan-details/:id',
    component: LoanDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    NewLoanComponent,
    LoanDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatButton,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    RouterModule.forChild(appRoutes),
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatProgressSpinner,
    HttpClientModule,
    MatLabel,
    MatError,
    MatToolbarRow,
    MatSidenavContent,
    BrowserModule,
    BrowserAnimationsModule,
    MatTable,
    MatColumnDef,
    MatSort,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatSortHeader,
    MatStepper,
    MatStep,
    MatStepperPrevious,
    MatStepLabel,
    MatStepperNext,
    MatSlider,
    MatStepperModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardHeader,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatDialogTitle,
    MatDialogContent


  ],
  providers: [
    provideAnimationsAsync(),
    httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
