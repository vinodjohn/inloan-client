import {Audit} from "./Audit";
import {LoanOfferExtended} from "./LoanOfferExtended";

export class LoanContract extends Audit {
  id: string;
  loanOffer: LoanOfferExtended;
  interestRate: number;
  period: number;
  monthlyAmount: number;
  isActive: boolean;

  constructor(createdDate: Date, id: string, loanOffer: LoanOfferExtended, interestRate: number, period: number, monthlyAmount: number, isActive: boolean) {
    super(createdDate);
    this.id = id;
    this.loanOffer = loanOffer;
    this.interestRate = interestRate;
    this.period = period;
    this.monthlyAmount = monthlyAmount;
    this.isActive = isActive;
  }
}
