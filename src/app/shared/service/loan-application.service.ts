import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GenResponseList} from "../model/GenResponseList";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LoanApplicationService {
  private LOAN_APPLICATION_URL = 'loan-application';

  constructor(private httpClient: HttpClient) {
  }

  public getLoanApplicationById(id: string) {
    return this.httpClient.get(this.LOAN_APPLICATION_URL.concat('/').concat(id));
  }

  public getAllLoanApplicationByPerson(sort: string, order: string, page: number) {
    return this.httpClient.get<GenResponseList>(this.LOAN_APPLICATION_URL.concat('/personal') + '?page=' + page + '&items='
      + environment.itemsPerPage + '&sort=' + sort + '&order=' + order);
  }

  // public updateLoanApplication(LoanApplication: LoanApplication) {
  //   return this.httpClient.put(this.LOAN_APPLICATION_URL, vehicleLoanApplication);
  // }

  public deleteLoanApplication(id: string) {
    return this.httpClient.get(this.LOAN_APPLICATION_URL.concat('/delete/').concat(id));
  }

  public restoreLoanApplication(id: string) {
    return this.httpClient.get(this.LOAN_APPLICATION_URL.concat('/restore/').concat(id));
  }
}
