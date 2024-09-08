export class LoanContractRequest {
  loanOfferId: string;
  period: number;
  interestRate: number;
  monthlyAmount: number;

  constructor(loanOfferId: string, period: number, interestRate: number, monthlyAmount: number) {
    this.loanOfferId = loanOfferId;
    this.period = period;
    this.interestRate = interestRate;
    this.monthlyAmount = monthlyAmount;
  }
}
