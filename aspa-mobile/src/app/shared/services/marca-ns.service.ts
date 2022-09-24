import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarcaNs } from '../models/Marca';
import { map } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class MarcaNsService {
  readonly serviceUrl = environment.apiRootUrl + '/pruebas';

  private getEndpoint(idprueba: number) {
    return `${this.serviceUrl}/${idprueba}/marcas/ns`;
  }

  constructor(private http: HttpClient, private session: SessionService) {}

  public getAllByPrueba(idprueba: number): Observable<Array<MarcaNs>> {
    return this.http
      .get<Array<any>>(this.getEndpoint(idprueba), {
        headers: this.getHeaders(),
      })
      .pipe(
        map(marcas => {
          return marcas.map(marca => {
            return {
              atleta: marca.id.atleta,
              intento: marca.id.intento,
              resultado: marca.resultado,
              marca: marca.marca,
            };
          });
        })
      );
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
