import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { SessionService } from 'src/app/core/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  readonly serviceUrl = environment.apiRootUrl + '/usuarios';

  constructor(private http: HttpClient, private session: SessionService) {}

  public add(usuario: Usuario): Observable<any> {
    return this.http.post(this.serviceUrl, usuario, {
      headers: this.getHeaders(),
    });
  }

  public getAll(): Observable<Array<Usuario>> {
    return this.http.get<Array<Usuario>>(this.serviceUrl, {
      headers: this.getHeaders(),
    });
  }

  public getById(idusuario): Observable<Usuario> {
    const url = this.serviceUrl + `/${idusuario}`;
    return this.http.get<Usuario>(url, { headers: this.getHeaders() });
  }

  public edit(usuario: Usuario): Observable<any> {
    const url = this.serviceUrl + `/${usuario.idusuario}`;
    return this.http.put(url, usuario, { headers: this.getHeaders() });
  }

  public delete(idusuario): Observable<any> {
    const url = this.serviceUrl + `/${idusuario}`;
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
