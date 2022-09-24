import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Competicion } from '../models/Competicion';
import { SessionService } from 'src/app/core/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class CompeticionService {
  readonly serviceUrl = environment.apiRootUrl + '/competiciones';

  constructor(private http: HttpClient, private session: SessionService) {}

  public add(competicion: Competicion): Observable<any> {
    return this.http.post(this.serviceUrl, competicion, {
      headers: this.getHeaders(),
    });
  }

  public getAll(): Observable<Array<Competicion>> {
    return this.http.get<Array<Competicion>>(this.serviceUrl, {
      headers: this.getHeaders(),
    });
  }

  // Obtener las competiciones con sus pruebas sólo de una categoría
  public getByCategoria(categoria: string): Observable<Array<Competicion>> {
    const params: HttpParams = new HttpParams().set('categoria', categoria);
    return this.http.get<Array<Competicion>>(this.serviceUrl, {
      headers: this.getHeaders(),
      params,
    });
  }

  public getById(idcompeticion: number): Observable<Competicion> {
    const url = this.serviceUrl + `/${idcompeticion}`;
    return this.http.get<Competicion>(url, { headers: this.getHeaders() });
  }

  public edit(competicion: Competicion): Observable<any> {
    const url = this.serviceUrl + `/${competicion.idcompeticion}`;
    return this.http.put(url, competicion, { headers: this.getHeaders() });
  }

  public delete(idcompeticion: number): Observable<any> {
    const url = this.serviceUrl + `/${idcompeticion}`;
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
