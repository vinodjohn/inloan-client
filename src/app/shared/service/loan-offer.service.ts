import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GenResponseList} from "../model/GenResponseList";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LoanOfferService {
  private LOAN_OFFER_URL = 'loan-offer';

  constructor(private httpClient: HttpClient) {
  }

  public getAllLoanOffersByApplication(sort: string, order: string, page: number, loanApplicationId: any) {
    return this.httpClient.get<GenResponseList>(this.LOAN_OFFER_URL.concat('/loan-application/').concat(loanApplicationId)
      + '?page=' + page + '&items=' + environment.itemsPerPage + '&sort=' + sort + '&order=' + order);
  }

  // public updateLoanOffer(LoanOffer: LoanOffer) {
  //   return this.httpClient.put(this.LOAN_OFFER_URL, vehicleLoanOffer);
  // }

  public deleteLoanOffer(id: string) {
    return this.httpClient.get(this.LOAN_OFFER_URL.concat('/delete/').concat(id));
  }

  public restoreLoanOffer(id: string) {
    return this.httpClient.get(this.LOAN_OFFER_URL.concat('/restore/').concat(id));
  }
}

