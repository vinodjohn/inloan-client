import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoanContractRequest} from "../model/LoanContractRequest";
import {environment} from "../../../environments/environment";
import {GenResponseList} from "../model/GenResponseList";

@Injectable({
  providedIn: 'root'
})
export class LoanContractService {
  private LOAN_CONTRACT_URL = 'loan-contract';

  constructor(private httpClient: HttpClient) {
  }

  public createLoanContract(loanContractRequest: LoanContractRequest): Observable<any> {
    return this.httpClient.post(this.LOAN_CONTRACT_URL, loanContractRequest);
  }

  public getContractById(id: string) {
    return this.httpClient.get(this.LOAN_CONTRACT_URL.concat('/').concat(id));
  }

  public getAllLoanContractByPerson(sort: string, order: string, page: number) {
    return this.httpClient.get<GenResponseList>(this.LOAN_CONTRACT_URL.concat('/personal') + '?page=' + page + '&items='
      + environment.itemsPerPage + '&sort=' + sort + '&order=' + order);
  }

  public getAllLoanContracts(sort: string, order: string, page: number) {
    return this.httpClient.get<GenResponseList>(this.LOAN_CONTRACT_URL + '?page=' + page + '&items='
      + environment.itemsPerPage + '&sort=' + sort + '&order=' + order);
  }

  // public updateLoanContract(LoanContract: LoanContract) {
  //   return this.httpClient.put(this.LOAN_CONTRACT_URL, vehicleLoanContract);
  // }

  public deleteLoanContract(id: string) {
    return this.httpClient.get(this.LOAN_CONTRACT_URL.concat('/delete/').concat(id));
  }

  public restoreLoanContract(id: string) {
    return this.httpClient.get(this.LOAN_CONTRACT_URL.concat('/restore/').concat(id));
  }
}
