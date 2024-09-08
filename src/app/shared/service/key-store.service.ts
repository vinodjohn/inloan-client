import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KeyStoreService {
  private KV_BASE_URL = 'kv-store';

  constructor(private http: HttpClient) {
  }

  public getKVListForNewLoan(): Observable<any> {
    return this.http.get(this.KV_BASE_URL.concat('/new-loan'));
  }
}
