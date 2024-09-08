import {Audit} from "./Audit";
import {LoanApplication} from "./LoanApplication";

export class LoanOfferExtended extends Audit {
  id: string;
  loanApplication: LoanApplication;
  creditScore: number;
  loanAmount: number;
  minPeriod: number;
  maxPeriod: number;
  loanOfferStatus: string;
  loanOfferType: string;
  isActive: boolean;

  constructor(createdDate: Date, id: string, loanApplication: LoanApplication, creditScore: number, loanAmount: number,
              minPeriod: number, maxPeriod: number, loanOfferStatus: string, loanOfferType: string, isActive: boolean) {
    super(createdDate);
    this.id = id;
    this.loanApplication = loanApplication;
    this.creditScore = creditScore;
    this.loanAmount = loanAmount;
    this.minPeriod = minPeriod;
    this.maxPeriod = maxPeriod;
    this.loanOfferStatus = loanOfferStatus;
    this.loanOfferType = loanOfferType;
    this.isActive = isActive;
  }
}
