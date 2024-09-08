import {LoanOffer} from "./LoanOffer";

export class LoanResponse {
  loanDecisionStatus: string;
  loanOfferDtos: LoanOffer[];

  constructor(loanDecisionStatus: string, loanOfferDtos: LoanOffer[]) {
    this.loanDecisionStatus = loanDecisionStatus;
    this.loanOfferDtos = loanOfferDtos;
  }
}

