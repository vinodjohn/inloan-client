export class LoanOffer {
  loanOfferId: string;
  type: string;
  loanAmount: number;
  minPeriod: number;
  maxPeriod: number;

  constructor(loanOfferId: string, type: string, loanAmount: number, minPeriod: number, maxPeriod: number) {
    this.loanOfferId = loanOfferId;
    this.type = type;
    this.loanAmount = loanAmount;
    this.minPeriod = minPeriod;
    this.maxPeriod = maxPeriod;
  }
}
