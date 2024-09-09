import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GenResponseList} from "../model/GenResponseList";
import {environment} from "../../../environments/environment";
import {KvStoreExtended} from "../model/KvStoreExtended";

@Injectable({
  providedIn: 'root'
})
export class KeyValueStoreService {
  private KV_BASE_URL = 'kv-store';

  constructor(private httpClient: HttpClient) {
  }

  public getKVListForNewLoan(): Observable<any> {
    return this.httpClient.get(this.KV_BASE_URL.concat('/new-loan'));
  }

  public getAllKeyValue(sort: string, order: string, page: number) {
    return this.httpClient.get<GenResponseList>(this.KV_BASE_URL + '?page=' + page + '&items='
      + environment.itemsPerPage + '&sort=' + sort + '&order=' + order);
  }

  public createKeyValue(keyValue: KvStoreExtended): Observable<any> {
    return this.httpClient.post(this.KV_BASE_URL, keyValue);
  }

  public updateKeyValue(keyValue: KvStoreExtended) {
    return this.httpClient.put(this.KV_BASE_URL, keyValue);
  }

  public deleteKeyValue(id: string) {
    return this.httpClient.get(this.KV_BASE_URL.concat('/delete/').concat(id));
  }

  public restoreKeyValue(id: string) {
    return this.httpClient.get(this.KV_BASE_URL.concat('/restore/').concat(id));
  }
}


