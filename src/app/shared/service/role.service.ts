import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GenResponseList} from "../model/GenResponseList";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Role} from "../model/Role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private ROLE_URL = 'role';

  constructor(private httpClient: HttpClient) {
  }

  public getRoleById(id: string) {
    return this.httpClient.get(this.ROLE_URL.concat('/').concat(id));
  }

  public getAllRoles(sort: string, order: string, page: number) {
    return this.httpClient.get<GenResponseList>(this.ROLE_URL + '?page=' + page + '&items='
      + environment.itemsPerPage + '&sort=' + sort + '&order=' + order);
  }

  public createRole(role: Role): Observable<any> {
    return this.httpClient.post(this.ROLE_URL, role);
  }

  public updateRole(role: Role) {
    return this.httpClient.put(this.ROLE_URL, role);
  }

  public deleteRole(id: string) {
    return this.httpClient.get(this.ROLE_URL.concat('/delete/').concat(id));
  }

  public restoreRole(id: string) {
    return this.httpClient.get(this.ROLE_URL.concat('/restore/').concat(id));
  }
}
