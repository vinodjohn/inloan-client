import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GenResponseList} from "../model/GenResponseList";
import {environment} from "../../../environments/environment";
import {Person} from "../model/Person";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private PERSON_URL = 'person';

  constructor(private httpClient: HttpClient) {
  }

  public getPersonById(id: string) {
    return this.httpClient.get(this.PERSON_URL.concat('/').concat(id));
  }

  public getAllPersons(sort: string, order: string, page: number) {
    return this.httpClient.get<GenResponseList>(this.PERSON_URL + '?page=' + page + '&items='
      + environment.itemsPerPage + '&sort=' + sort + '&order=' + order);
  }

  public createPerson(person: Person): Observable<any> {
    return this.httpClient.post(this.PERSON_URL, person);
  }

  public updatePerson(person: Person) {
    return this.httpClient.put(this.PERSON_URL, person);
  }

  public deletePerson(id: string) {
    return this.httpClient.get(this.PERSON_URL.concat('/delete/').concat(id));
  }

  public restorePerson(id: string) {
    return this.httpClient.get(this.PERSON_URL.concat('/restore/').concat(id));
  }
}
