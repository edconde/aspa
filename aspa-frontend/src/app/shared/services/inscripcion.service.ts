import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../models/Inscripcion';
import { SessionService } from 'src/app/core/session/session.service';
import { Atleta } from 'src/app/shared/models/Atleta';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  readonly serviceUrl = environment.apiRootUrl + '/pruebas';

  getEndpoint(idprueba: number) {
    return `${this.serviceUrl}/${idprueba}/inscripciones`;
  }

  constructor(private http: HttpClient, private session: SessionService) {}

  public get(idprueba: number, idinscripcion: number): Observable<Inscripcion> {
    const url = this.getEndpoint(idprueba) + `/${idinscripcion}`;
    return this.http.get<Inscripcion>(url, { headers: this.getHeaders() });
  }

  public add(idprueba: number, atleta: Atleta): Observable<any> {
    const body = {
      atleta,
    };
    return this.http.post(this.getEndpoint(idprueba), body, {
      headers: this.getHeaders(),
    });
  }

  public getAllByPrueba(idprueba: number): Observable<Array<Inscripcion>> {
    return this.http.get<Array<Inscripcion>>(this.getEndpoint(idprueba), {
      headers: this.getHeaders(),
    });
  }

  public getAllPresentedByPrueba(
    idprueba: number
  ): Observable<Array<Inscripcion>> {
    const url = this.getEndpoint(idprueba) + '/confirmadas';
    return this.http.get<Array<Inscripcion>>(url, {
      headers: this.getHeaders(),
    });
  }

  public edit(idprueba: number, inscripcion: Inscripcion): Observable<any> {
    const url = this.getEndpoint(idprueba) + `/${inscripcion.idinscripcion}`;
    return this.http.put(url, inscripcion, { headers: this.getHeaders() });
  }

  public delete(idprueba: number, idinscripcion: number): Observable<any> {
    const url = this.getEndpoint(idprueba) + `/${idinscripcion}`;
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
