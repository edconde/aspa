import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Altura, AlturaGetItem } from '../models/Altura';
import { SessionService } from 'src/app/core/session/session.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlturaService {
  readonly serviceUrl = environment.apiRootUrl + '/pruebas';

  getEndpoint(idprueba: number) {
    return `${this.serviceUrl}/${idprueba}/alturas`;
  }

  constructor(private http: HttpClient, private session: SessionService) {}

  add(idprueba: number, altura: number): Observable<any> {
    return this.http.post(this.getEndpoint(idprueba), altura, {
      headers: this.getHeaders(),
    });
  }

  addMultiple(
    idprueba: number,
    alturas: Array<number>
  ): Observable<Array<Altura>> {
    const url = this.getEndpoint(idprueba) + '/multiple';
    return this.http
      .post<Array<AlturaGetItem>>(url, alturas, { headers: this.getHeaders() })
      .pipe(
        map(alturas => {
          return alturas.map(altura => {
            return { idaltura: altura.id.idaltura, altura: altura.altura };
          });
        })
      );
  }

  getAllByPrueba(idprueba: number): Observable<Array<Altura>> {
    return this.http
      .get<Array<AlturaGetItem>>(this.getEndpoint(idprueba), {
        headers: this.getHeaders(),
      })
      .pipe(
        map(alturas => {
          return alturas.map(altura => {
            return { idaltura: altura.id.idaltura, altura: altura.altura };
          });
        })
      );
  }

  edit(idprueba: number, idaltura: number, altura: number): Observable<any> {
    const params = new HttpParams()
      .set('idaltura', idaltura.toString())
      .set('altura', altura.toString());
    return this.http.request('put', this.getEndpoint(idprueba), {
      headers: this.getHeaders(),
      params,
    });
  }

  delete(idprueba: number, idaltura: number): Observable<any> {
    const params = new HttpParams().set('idaltura', idaltura.toString());
    return this.http.delete(this.getEndpoint(idprueba), {
      headers: this.getHeaders(),
      params,
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
