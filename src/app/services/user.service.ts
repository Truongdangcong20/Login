import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:8000';
  private headers = new HttpHeaders();

  constructor(private http: HttpClient,
    authenService: AuthenService) {
    var token = authenService.getLoggedInUser().token;
    console.log(token);
    this.headers = this.headers.set('Content-Type', 'application/json');
    //this.headers = this.headers.set("Authorization", "Bearer " + token);
  }

  GetAll() {
    const url = `${this.API_URL}/get-all`;
    return this.http.get(url, { headers: this.headers });
  }

  // addUser(user: any): Observable<any> {
  //   console.log(user);
  //   const url = `${this.API_URL}/register`;
  //   var body = JSON.stringify(user);
  //   return this.http.post<any>(url, body, { headers: this.headers });
  // }

  addUser(user: any): Observable<any> {
    const url = `${this.API_URL}/register`;
    return this.http.post<any>(url, user, { headers: this.headers });
  }

  getEdit(id: any): Observable<any> {
    const url = `${this.API_URL}/get-by-id/${id}`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.API_URL}/change-password`;
    return this.http.put<any>(url, user, { headers: this.headers }).pipe();
  }

  deleteUser(id: any): Observable<any> {
    const url = `${this.API_URL}/delete-account/${id}`;
    return this.http.delete<any>(url, { headers: this.headers });
  }
}
