import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {LoanRequest} from "../model/LoanRequest";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private LOAN_BASE_URL = 'loan';

  constructor(private http: HttpClient) {
  }

  public getLoanDecision(loanRequest: LoanRequest): Observable<any> {
    return this.http.post(this.LOAN_BASE_URL, loanRequest);
  }
}
