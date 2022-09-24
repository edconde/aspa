import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Altura, AlturaGetItem } from '../models/Altura';
import { map } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AlturaService {
  readonly serviceUrl = environment.apiRootUrl + '/pruebas';

  private getEndpoint(idprueba: number) {
    return `${this.serviceUrl}/${idprueba}/alturas`;
  }

  constructor(private http: HttpClient, private session: SessionService) {}

  public getAllByPrueba(idprueba: number): Observable<Array<Altura>> {
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

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.session.getToken();
    if (token) {
      headers = headers.set('authorization', 'Bearer ' + token);
    }
    return headers;
  }
}
