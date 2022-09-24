import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Club } from '../models/Club';
import { SessionService } from 'src/app/core/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  readonly serviceUrl = environment.apiRootUrl + '/clubes';

  constructor(private http: HttpClient, private session: SessionService) {}

  public add(club: Club): Observable<any> {
    return this.http.post(this.serviceUrl, club, {
      headers: this.getHeaders(),
    });
  }

  public getAll(): Observable<Array<Club>> {
    return this.http.get<Array<Club>>(this.serviceUrl, {
      headers: this.getHeaders(),
    });
  }

  public edit(club: Club): Observable<any> {
    const url = this.serviceUrl + `/${club.idclub}`;
    return this.http.put(url, club, { headers: this.getHeaders() });
  }

  public delete(idclub: number): Observable<any> {
    const url = this.serviceUrl + `/${idclub}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.session.getToken();
    if (token) {
      headers = headers.set('authorization', 'Bearer ' + token);
    }
    return headers;
  }
}
