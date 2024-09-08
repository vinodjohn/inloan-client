import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {SignInComponent} from './sign-in/sign-in.component';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterModule, Routes} from "@angular/router";
import {httpInterceptorProviders} from "./shared/interceptor/app.interceptor";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewLoanComponent} from './new-loan/new-loan.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
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
import {NgOptimizedImage} from "@angular/common";
import {SignUpComponent} from './sign-up/sign-up.component';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {LoanContractComponent} from './loan-contract/loan-contract.component';
import {MatDivider} from "@angular/material/divider";
import { LoanApplicationInfoComponent } from './loan-application-info/loan-application-info.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'new-loan',
    component: NewLoanComponent
  },
  {
    path: 'loan-contract/:id',
    component: LoanContractComponent
  },
  {
    path: 'loan-application',
    component: LoanApplicationComponent
  },
  {
    path: 'loan-application-info/:id',
    component: LoanApplicationInfoComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    NewLoanComponent,
    SignUpComponent,
    LoanContractComponent,
    LoanApplicationInfoComponent,
    LoanApplicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatIconModule,
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
    MatPaginatorModule,
    MatPaginator,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatSortModule,
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
    MatCardSubtitle,
    MatDialogTitle,
    MatDialogContent,
    NgOptimizedImage,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDivider
  ],
  providers: [
    provideAnimationsAsync(),
    httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
