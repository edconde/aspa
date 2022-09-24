import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../models/Inscripcion';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  readonly serviceUrl = environment.apiRootUrl + '/pruebas';

  private getEndpoint(idprueba: number) {
    return `${this.serviceUrl}/${idprueba}/inscripciones`;
  }

  constructor(private http: HttpClient, private session: SessionService) {}

  public get(idprueba: number, idinscripcion: number): Observable<Inscripcion> {
    const url = this.getEndpoint(idprueba) + `/${idinscripcion}`;
    return this.http.get<Inscripcion>(url, { headers: this.getHeaders() });
  }

  public add(
    idprueba: number,
    inscripcion: { atleta: { idatleta: number; licencia: string } }
  ): Observable<any> {
    return this.http.post(this.getEndpoint(idprueba), inscripcion, {
      headers: this.getHeaders(),
    });
  }

  public getAllByPrueba(idprueba: number): Observable<Array<Inscripcion>> {
    return this.http.get<Array<Inscripcion>>(this.getEndpoint(idprueba), {
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
