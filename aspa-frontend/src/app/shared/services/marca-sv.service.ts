import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarcaSv } from '../models/Marca';
import { SessionService } from 'src/app/core/session/session.service';
import { map } from 'rxjs/operators';
import { MarcaSvResquestItem } from '../models/api/MarcaSvResquestItem';

@Injectable({
  providedIn: 'root',
})
export class MarcaSvService {
  readonly serviceUrl = environment.apiRootUrl + '/pruebas';

  getEndpoint(idprueba: number) {
    return `${this.serviceUrl}/${idprueba}/marcas/sv`;
  }

  constructor(private http: HttpClient, private session: SessionService) {}

  getAllByPrueba(idprueba: number): Observable<Array<MarcaSv>> {
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

  edit(idprueba: number, marca: MarcaSv): Observable<any> {
    const body = new MarcaSvResquestItem(marca);
    return this.http.put(this.getEndpoint(idprueba), body, {
      headers: this.getHeaders(),
    });
  }

  delete(idprueba: number, marcas: Array<MarcaSv>): Observable<any> {
    const body: Array<MarcaSvResquestItem> = [];
    marcas.forEach(marca => {
      body.push(new MarcaSvResquestItem(marca));
    });
    return this.http.request('delete', this.getEndpoint(idprueba), {
      body: body,
      headers: this.getHeaders(),
    });
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
