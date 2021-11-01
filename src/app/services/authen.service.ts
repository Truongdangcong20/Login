import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { UserLogin } from '../model/user.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthenService {
  private API_URL = 'http://localhost:8000';
  private userLogin = new BehaviorSubject<any>([]);
  public user$ = this.userLogin.asObservable();
  constructor(private readonly http: HttpClient) {}

  public get userValue(): any {
    return this.userLogin.value;
  }

  login(login: any): Observable<UserLogin | null> {
    const url = `${this.API_URL}/login`;
    return this.http.post<UserLogin>(url, login, httpOptions).pipe(
      map((user) => {
        if (user !== null) {
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(user));
          this.userLogin.next(user);
          console.log(user.username);
          return user;
        } else {
          return null;
        }
      })
    );
  }

  isUserAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }

  getLoggedInUser() {
    let user: any;
    if (this.isUserAuthenticated()) {
      let userLocal = localStorage.getItem('user');
      if (userLocal !== null) {
        user = JSON.parse(userLocal);
      }
    } else {
      user = null;
    }
    return user;
  }

  logout() {
    localStorage.removeItem('user');
    this.userLogin.next('');
  }
}
