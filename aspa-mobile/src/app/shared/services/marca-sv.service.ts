import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarcaSv } from '../models/Marca';
import { map } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class MarcaSvService {
  readonly serviceUrl = environment.apiRootUrl + '/pruebas';

  private getEndpoint(idprueba: number) {
    return `${this.serviceUrl}/${idprueba}/marcas/sv`;
  }

  constructor(private http: HttpClient, private session: SessionService) {}

  public getAllByPrueba(idprueba: number): Observable<Array<MarcaSv>> {
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
              idaltura: marca.id.idaltura,
              altura: null,
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
