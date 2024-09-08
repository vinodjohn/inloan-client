import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GenResponseList} from "../model/GenResponseList";
import {environment} from "../../../environments/environment";
import {CreditModifier} from "../model/CreditModifier";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreditModifierService {

  private CREDIT_MODIFIER_URL = 'credit-modifier';

  constructor(private httpClient: HttpClient) {
  }

  public getCreditModifierById(id: string) {
    return this.httpClient.get(this.CREDIT_MODIFIER_URL.concat('/').concat(id));
  }

  public getAllCreditModifier(sort: string, order: string, page: number) {
    return this.httpClient.get<GenResponseList>(this.CREDIT_MODIFIER_URL + '?page=' + page + '&items='
      + environment.itemsPerPage + '&sort=' + sort + '&order=' + order);
  }

  public createCreditModifier(creditModifier: CreditModifier): Observable<any> {
    return this.httpClient.post(this.CREDIT_MODIFIER_URL, creditModifier);
  }

  public updateCreditModifier(creditModifier: CreditModifier) {
    return this.httpClient.put(this.CREDIT_MODIFIER_URL, creditModifier);
  }

  public deleteCreditModifier(id: string) {
    return this.httpClient.get(this.CREDIT_MODIFIER_URL.concat('/delete/').concat(id));
  }

  public restoreCreditModifier(id: string) {
    return this.httpClient.get(this.CREDIT_MODIFIER_URL.concat('/restore/').concat(id));
  }
}
