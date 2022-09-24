import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICredentials } from './models/credentials';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ROLES } from './models/enums/roles';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  readonly serviceUrl = environment.apiRootUrl + '/token';

  private username: string;
  private rol: ROLES;
  private userid: number;

  private usernameSubject = new BehaviorSubject<string>(null);
  private rolSubject = new BehaviorSubject<string>(null);
  private useridSubject = new BehaviorSubject<number>(null);

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
    if (this.isAuthenticated()) {
      this.create(this.getToken());
    }
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  public login(credentials: ICredentials): Observable<string> {
    const url = this.serviceUrl + '/usuarios';
    const body = new HttpParams()
      .set('email', credentials.email)
      .set('password', credentials.password);
    return this.http
      .post<any>(url, body.toString(), {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      })
      .pipe(map(response => response.token));
  }

  public create(token: string): boolean {
    try {
      const tokenPayload = decode(token);
      this.updateUsername(tokenPayload.nombre);
      this.updateRol(tokenPayload.rol);
      this.updateUserid(tokenPayload.idusuario || null);
      localStorage.setItem('token', token);
    } catch (e) {
      return false;
    }
    return true;
  }

  public close() {
    localStorage.removeItem('token');
    this.updateUsername(null);
    this.updateUserid(null);
    this.updateRol(null);
  }

  public getUsername(): string {
    return this.username;
  }

  public getUsernameAsObservable(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  public updateUsername(username: string): void {
    this.username = username;
    this.usernameSubject.next(this.username);
  }

  public getUserid(): number {
    return this.userid;
  }

  public getUseridAsObservable(): Observable<number> {
    return this.useridSubject.asObservable();
  }

  public updateUserid(userid: number): void {
    this.userid = userid;
    this.useridSubject.next(this.userid);
  }

  public getRol(): ROLES {
    return this.rol;
  }

  public getRolAsObservable(): Observable<string> {
    return this.rolSubject.asObservable();
  }

  public updateRol(rol: ROLES): void {
    this.rol = rol;
    this.rolSubject.next(this.rol);
  }

  public getToken() {
    return localStorage.getItem('token');
  }
}
