import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {KeyStoreService} from "../shared/service/key-store.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoanService} from "../shared/service/loan.service";
import {LoanRequest} from "../shared/model/LoanRequest";
import {LoanResponse} from "../shared/model/LoanResponse";
import {LoanOffer} from "../shared/model/LoanOffer";
import {animate, style, transition, trigger} from "@angular/animations";
import {LoanContractRequest} from "../shared/model/LoanContractRequest";
import {LoanContractService} from "../shared/service/loan-contract.service";

interface TempLoanOffer {
  loanOffer: LoanOffer,
  period: number;
  monthlyAmount: number;
}

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.css'],
  animations: [
    trigger('zoomOutPop', [
      transition(':enter', [
        style({opacity: 0, transform: 'scale(1.2)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'scale(1)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({opacity: 0, transform: 'scale(0.5)'}))
      ])
    ])
  ]
})
export class NewLoanComponent implements OnInit {
  maxAmount = 0;
  minAmount = 0;
  stepAmount = 0;
  maxPeriod = 0;
  minPeriod = 0;
  stepPeriod = 1;
  interestRate = 0;
  showForm = false;
  isLoading = false;
  isContractLoading = false;
  isConfirmClicked = false;
  isChooseClicked = false;
  showContractMessage = false;
  loanRequest?: LoanRequest;
  loanResponse?: LoanResponse;
  loanContract?: LoanContractRequest;
  tempLoanOffers: TempLoanOffer[] = [];
  selectedLoanOffer: TempLoanOffer | null = null;

  private _formBuilder = inject(FormBuilder);
  loanAmountGroup = this._formBuilder.group({
    amountCtrl: [this.minAmount, Validators.required],
  });
  loanPeriodGroup = this._formBuilder.group({
    periodCtrl: [this.minPeriod, Validators.required],
  });

  constructor(private kvStoreService: KeyStoreService, private loanService: LoanService,
              private loanContractService: LoanContractService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.kvStoreService.getKVListForNewLoan().subscribe({
      next: data => {
        console.log(data);

        if (data.length >= 4) {
          this.showForm = true;

          let item = data.find((store: { key: string; }) => store.key === "MINIMUM_LOAN_AMOUNT");
          this.minAmount = item ? item.value : undefined;
          this.loanAmountGroup.get('amountCtrl')?.setValue(this.minAmount);

          item = data.find((store: { key: string; }) => store.key === "MAXIMUM_LOAN_AMOUNT");
          this.maxAmount = item ? item.value : undefined;

          item = data.find((store: { key: string; }) => store.key === "MINIMUM_LOAN_PERIOD_MONTHS");
          this.minPeriod = item ? item.value : undefined;
          this.loanPeriodGroup.get('periodCtrl')?.setValue(this.minPeriod);

          item = data.find((store: { key: string; }) => store.key === "MAXIMUM_LOAN_PERIOD_MONTHS");
          this.maxPeriod = item ? item.value : undefined;

          item = data.find((store: { key: string; }) => store.key === "BASE_INTEREST_RATE");
          this.interestRate = item ? item.value : undefined;

          this.stepAmount = this.minAmount / 10;

        } else {
          this.viewErrorSnackBar();
        }
      }
    })
  }

  confirm() {
    this.isConfirmClicked = true;
    this.isLoading = true;

    const amount = this.loanAmountGroup.get('amountCtrl')?.value ?? 0;
    const period = this.loanPeriodGroup.get('periodCtrl')?.value ?? 0;

    this.loanRequest = new LoanRequest(amount, period);

    this.loanService.getLoanDecision(this.loanRequest).subscribe({
      next: data => {
        this.loanResponse = data;
        console.log(this.loanResponse?.loanOfferDtos);
        this.tempLoanOffers = this.loanResponse?.loanOfferDtos === undefined ? []
          : this.getTempLoanOffers(this.loanResponse.loanOfferDtos);
        console.log(this.tempLoanOffers);
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        this.viewErrorSnackBar();
      }
    });
  }

  calculatePayment(amount: number, period: number): number {
    return Math.round((amount + amount * (this.interestRate / 100)) / period);
  }

  onPeriodChange(tempLoanOffer: TempLoanOffer, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    tempLoanOffer.period = Number(value) || this.minPeriod;
    tempLoanOffer.monthlyAmount = this.calculatePayment(tempLoanOffer.loanOffer.loanAmount, tempLoanOffer.period);
  }

  chooseLoanOffer(tempLoanOffer: TempLoanOffer) {
    this.isContractLoading = true;
    this.isChooseClicked = true;
    this.selectedLoanOffer = tempLoanOffer;

    setTimeout(() => {
      this.tempLoanOffers = this.tempLoanOffers.filter(o => o.loanOffer.loanOfferId === tempLoanOffer.loanOffer.loanOfferId);
    }, 1000);

    this.loanContract = new LoanContractRequest(this.selectedLoanOffer.loanOffer.loanOfferId,
      this.selectedLoanOffer.period, this.interestRate, this.selectedLoanOffer.monthlyAmount)
    this.loanContractService.createLoanContract(this.loanContract).subscribe({
        next: data => {
          this.isContractLoading = false;
          this.showContractMessage = true;
        },
        error: error => {
          this.isContractLoading = false;
          this.viewErrorSnackBar();
        }
      }
    )
  }

  getHighestLoanOffer(): TempLoanOffer {
    return <TempLoanOffer>this.tempLoanOffers?.reduce((prev, current) => (prev.loanOffer.loanAmount > current.loanOffer.loanAmount ? prev : current));
  }

  getTempLoanOffers(loanOffers: LoanOffer[]): TempLoanOffer[] {
    let tempLoanOffers: TempLoanOffer[] = [];

    loanOffers.sort((a, b) => a.loanAmount - b.loanAmount);

    loanOffers.forEach((loanOffer) => {
      tempLoanOffers.push({
        loanOffer: loanOffer,
        period: loanOffer.minPeriod,
        monthlyAmount: this.calculatePayment(loanOffer.loanAmount, loanOffer.minPeriod)
      });
    })

    return tempLoanOffers;
  }

  viewErrorSnackBar(): void {
    this.snackBar.open('Technical error! Please try again later.', 'Close', {
      duration: 2000,
      panelClass: ['snackbar-error']
    });
  }
}

