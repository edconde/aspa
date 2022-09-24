import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarcaNs } from '../models/Marca';
import { SessionService } from 'src/app/core/session/session.service';
import { map } from 'rxjs/operators';
import { MarcaNsResquestItem } from '../models/api/MarcaNsRequestItem';

@Injectable({
  providedIn: 'root',
})
export class MarcaNsService {
  readonly serviceUrl = environment.apiRootUrl + '/pruebas';

  getEndpoint(idprueba: number) {
    return `${this.serviceUrl}/${idprueba}/marcas/ns`;
  }

  constructor(private http: HttpClient, private session: SessionService) {}

  getAllByPrueba(idprueba: number): Observable<Array<MarcaNs>> {
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

  createSkipped(idprueba: number, marcas: Array<MarcaNs>): Observable<any> {
    const body: Array<MarcaNsResquestItem> = [];
    marcas.forEach(marca => {
      body.push(new MarcaNsResquestItem(marca));
    });
    return this.http.post(this.getEndpoint(idprueba), body, {
      headers: this.getHeaders(),
    });
  }

  edit(idprueba: number, marca: MarcaNs): Observable<any> {
    const body = new MarcaNsResquestItem(marca);
    return this.http.put(this.getEndpoint(idprueba), body, {
      headers: this.getHeaders(),
    });
  }

  delete(idprueba: number, marcas: Array<MarcaNs>): Observable<any> {
    const body: Array<MarcaNsResquestItem> = [];
    marcas.forEach(marca => {
      body.push(new MarcaNsResquestItem(marca));
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
