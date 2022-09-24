import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Competicion } from '../models/Competicion';

@Injectable({
  providedIn: 'root',
})
export class CompeticionService {
  readonly serviceUrl = environment.apiRootUrl + '/competiciones';

  constructor(private http: HttpClient) {}

  public get(ano: string, mes: number): Observable<Array<Competicion>> {
    const params: HttpParams = new HttpParams()
      .set('ano', ano)
      .set('mes', mes.toString());
    return this.http.get<Array<Competicion>>(this.serviceUrl + '/filtradas', {
      params,
    });
  }

  public getToday(): Observable<Array<Competicion>> {
    return this.http.get<Array<Competicion>>(this.serviceUrl + '/hoy');
  }
}
