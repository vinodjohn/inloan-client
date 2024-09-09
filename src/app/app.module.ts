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
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {NgOptimizedImage} from "@angular/common";
import {SignUpComponent} from './sign-up/sign-up.component';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {LoanContractComponent} from './loan-contract/loan-contract.component';
import {MatDivider} from "@angular/material/divider";
import {LoanApplicationInfoComponent} from './loan-application-info/loan-application-info.component';
import {LoanApplicationComponent} from './loan-application/loan-application.component';
import {CreditModifierComponent} from './credit-modifier/credit-modifier.component';
import {AddCreditModifierComponent} from './credit-modifier/add-credit-modifier/add-credit-modifier.component';
import {UpdateCreditModifierComponent} from './credit-modifier/update-credit-modifier/update-credit-modifier.component';
import {DeleteCreditModifierComponent} from './credit-modifier/delete-credit-modifier/delete-credit-modifier.component';
import {
  RestoreCreditModifierComponent
} from './credit-modifier/restore-credit-modifier/restore-credit-modifier.component';
import {KeyValueStoreComponent} from './key-value-store/key-value-store.component';
import {AddKeyValueStoreComponent} from './key-value-store/add-key-value-store/add-key-value-store.component';
import {UpdateKeyValueStoreComponent} from './key-value-store/update-key-value-store/update-key-value-store.component';
import {DeleteKeyValueStoreComponent} from './key-value-store/delete-key-value-store/delete-key-value-store.component';
import {
  RestoreKeyValueStoreComponent
} from './key-value-store/restore-key-value-store/restore-key-value-store.component';
import {PersonComponent} from './person/person.component';
import {UpdatePersonComponent} from './person/update-person/update-person.component';
import {DeletePersonComponent} from './person/delete-person/delete-person.component';
import {RestorePersonComponent} from './person/restore-person/restore-person.component';
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {ProfileComponent} from './profile/profile.component';

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
  },
  {
    path: 'credit-modifier',
    component: CreditModifierComponent
  },
  {
    path: 'kv-store',
    component: KeyValueStoreComponent
  },
  {
    path: 'person',
    component: PersonComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
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
    LoanApplicationComponent,
    CreditModifierComponent,
    AddCreditModifierComponent,
    UpdateCreditModifierComponent,
    DeleteCreditModifierComponent,
    RestoreCreditModifierComponent,
    KeyValueStoreComponent,
    AddKeyValueStoreComponent,
    UpdateKeyValueStoreComponent,
    DeleteKeyValueStoreComponent,
    RestoreKeyValueStoreComponent,
    PersonComponent,
    UpdatePersonComponent,
    DeletePersonComponent,
    RestorePersonComponent,
    ProfileComponent
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
    MatDivider,
    MatDialogActions,
    MatDialogClose,
    MatOption,
    MatSelect
  ],
  providers: [
    provideAnimationsAsync(),
    httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
