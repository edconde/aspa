import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Prueba } from '../models/Prueba';
import { SessionService } from 'src/app/core/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class PruebaService {
  readonly serviceUrl = environment.apiRootUrl + '/competiciones';

  getEndpoint(idcompeticion: number) {
    return `${this.serviceUrl}/${idcompeticion}/pruebas`;
  }

  constructor(private http: HttpClient, private session: SessionService) {}

  get(idcompeticion: number, idprueba: number): Observable<Prueba> {
    const url = this.getEndpoint(idcompeticion) + `/${idprueba}`;
    return this.http.get<Prueba>(url, { headers: this.getHeaders() });
  }

  addToCompetition(idcompeticion: number, prueba: Prueba): Observable<any> {
    return this.http.post(this.getEndpoint(idcompeticion), prueba, {
      headers: this.getHeaders(),
    });
  }

  getAllByCompetition(idcompeticion: number): Observable<Array<Prueba>> {
    return this.http.get<Array<Prueba>>(this.getEndpoint(idcompeticion), {
      headers: this.getHeaders(),
    });
  }

  edit(idcompeticion: number, prueba: Prueba): Observable<any> {
    const url = this.getEndpoint(idcompeticion) + `/${prueba.idprueba}`;
    return this.http.put(url, prueba, { headers: this.getHeaders() });
  }

  delete(idcompeticion: number, idprueba: number): Observable<any> {
    const url = this.getEndpoint(idcompeticion) + `/${idprueba}`;
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
