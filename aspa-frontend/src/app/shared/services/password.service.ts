import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  readonly serviceUrl = environment.apiRootUrl + '/password/reset';

  constructor(private http: HttpClient) {}

  public resetPassword(email: string): Observable<string> {
    const url = this.serviceUrl + '/usuarios';
    const body = new HttpParams().set('email', email);
    return this.http.post<any>(url, body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    });
  }
}
