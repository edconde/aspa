import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clasificacion } from '../models/Clasificacion';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class ClasificacionService {
  readonly serviceUrl = environment.apiRootUrl + '/pruebas';

  private getEndpoint(idprueba: number) {
    return `${this.serviceUrl}/${idprueba}/clasificaciones`;
  }

  constructor(private http: HttpClient, private session: SessionService) {}

  public add(idprueba: number, clasificacion: Clasificacion): Observable<any> {
    return this.http.post(this.getEndpoint(idprueba), clasificacion, {
      headers: this.getHeaders(),
    });
  }

  public getAllByPrueba(idprueba: number): Observable<Array<Clasificacion>> {
    return this.http.get<Array<Clasificacion>>(this.getEndpoint(idprueba), {
      headers: this.getHeaders(),
    });
  }

  public editFullClassification(
    idprueba: number,
    clasificacion: Array<Clasificacion>
  ): Observable<any> {
    const body = clasificacion;
    return this.http.put(this.getEndpoint(idprueba), body, {
      headers: this.getHeaders(),
    });
  }

  public delete(idprueba: number, idclasificacion: number): Observable<any> {
    return this.http.delete(this.getEndpoint(idprueba), {
      headers: this.getHeaders(),
    });
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
