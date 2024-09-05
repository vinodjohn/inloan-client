import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SignIn} from "../model/SignIn";
import {SignUp} from "../model/SignUp";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_BASE_URL = 'auth';

  constructor(private http: HttpClient) {
  }

  public signIn(signIn: SignIn): Observable<any> {
    return this.http.post(this.AUTH_BASE_URL.concat('/sign-in'), signIn);
  }

  public signUp(signUp: SignUp): Observable<any> {
    return this.http.post(this.AUTH_BASE_URL.concat('/sign-up'), signUp);
  }

  public signOut(): Observable<any> {
    return this.http.post(this.AUTH_BASE_URL.concat('/sign-out'), null);
  }

  public refreshToken() {
    return this.http.post(this.AUTH_BASE_URL.concat('/refresh-token'), null);
  }
}
