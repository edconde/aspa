import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Atleta } from '../models/Atleta';
import { SessionService } from 'src/app/core/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class AtletaService {
  readonly serviceUrl = environment.apiRootUrl + '/atletas';

  constructor(private http: HttpClient, private session: SessionService) {}

  public add(atleta: Atleta): Observable<any> {
    return this.http.post(this.serviceUrl, atleta, {
      headers: this.getHeaders(),
    });
  }

  public getAll(): Observable<Array<Atleta>> {
    return this.http.get<Array<Atleta>>(this.serviceUrl, {
      headers: this.getHeaders(),
    });
  }

  public getById(idatleta: number): Observable<Atleta> {
    const url = this.serviceUrl + `/${idatleta}`;
    return this.http.get<Atleta>(url, { headers: this.getHeaders() });
  }

  public edit(atleta: Atleta): Observable<any> {
    const url = this.serviceUrl + `/${atleta.idatleta}`;
    return this.http.put(url, atleta, { headers: this.getHeaders() });
  }

  public delete(idatleta: number): Observable<any> {
    const url = this.serviceUrl + `/${idatleta}`;
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
