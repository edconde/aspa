import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TipoPrueba } from '../models/TipoPrueba';
import { SessionService } from 'src/app/core/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class TipoPruebaService {
  readonly serviceUrl = environment.apiRootUrl + '/tipos-prueba';

  constructor(private http: HttpClient, private session: SessionService) {}

  add(tipoPrueba: TipoPrueba): Observable<any> {
    return this.http.post(this.serviceUrl, tipoPrueba, {
      headers: this.getHeaders(),
    });
  }

  getAll(): Observable<Array<TipoPrueba>> {
    return this.http.get<Array<TipoPrueba>>(this.serviceUrl, {
      headers: this.getHeaders(),
    });
  }

  delete(idtipoPrueba): Observable<any> {
    const url = this.serviceUrl + `/${idtipoPrueba}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.session.getToken();
    if (token) {
      headers = headers.set('authorization', 'Bearer ' + token);
    }
    return headers;
  }
}
