export class LoanRequest {
  loanAmount: number;
  loanPeriod: number;

  constructor(loanAmount: number, loanPeriod: number) {
    this.loanAmount = loanAmount;
    this.loanPeriod = loanPeriod;
  }
}
