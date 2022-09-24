import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICredenciales } from '../models/Credenciales';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  readonly serviceUrl = environment.apiRootUrl + '/token';

  private username: string;
  private licencia: string;
  private fechaNacimiento: Date;
  private sexo: boolean; // 0 = M, 1 = F
  private idatleta: number;

  private usernameSubject = new BehaviorSubject<string>(null);
  private licenciaSubject = new BehaviorSubject<string>(null);
  private fechaNacimientoSubject = new BehaviorSubject<Date>(null);
  private sexoSubject = new BehaviorSubject<boolean>(null);
  private rolSubject = new BehaviorSubject<string>(null);
  private idatletaSubject = new BehaviorSubject<number>(null);

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
    if (this.isAuthenticated()) {
      this.create(this.getToken());
    }
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  public login(credentials: ICredenciales): Observable<string> {
    const url = this.serviceUrl + '/atletas';
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

  public create(token: string) {
    const tokenPayload = decode(token);
    this.updateUsername(tokenPayload.nombre);
    this.updateLicencia(tokenPayload.licencia);
    this.updateFechaNacimiento(tokenPayload.fechaNacimiento);
    this.updateSexo(tokenPayload.sexo);
    this.updateIdatleta(tokenPayload.idatleta || null);
    localStorage.setItem('token', token);
  }

  public close() {
    localStorage.removeItem('token');
    this.updateUsername(null);
    this.updateLicencia(null);
    this.updateFechaNacimiento(null);
    this.updateSexo(null);
    this.updateIdatleta(null);
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

  public getLicencia(): string {
    return this.licencia;
  }

  public getLicenciaAsObservable(): Observable<string> {
    return this.licenciaSubject.asObservable();
  }

  public updateLicencia(licencia: string): void {
    this.licencia = licencia;
    this.licenciaSubject.next(this.licencia);
  }

  public getFechaNacimiento(): Date {
    return this.fechaNacimiento;
  }

  public getFechaNacimientoAsObservable(): Observable<Date> {
    return this.fechaNacimientoSubject.asObservable();
  }

  public updateFechaNacimiento(fechaNacimiento: Date): void {
    this.fechaNacimiento = fechaNacimiento;
    this.fechaNacimientoSubject.next(this.fechaNacimiento);
  }

  public getSexo(): boolean {
    return this.sexo;
  }

  public getSexoAsObservable(): Observable<boolean> {
    return this.sexoSubject.asObservable();
  }

  public updateSexo(sexo: boolean): void {
    this.sexo = sexo;
    this.sexoSubject.next(this.sexo);
  }

  public getIdatleta(): number {
    return this.idatleta;
  }

  public getIdatletaAsObservable(): Observable<number> {
    return this.idatletaSubject.asObservable();
  }

  public updateIdatleta(idatleta: number): void {
    this.idatleta = idatleta;
    this.idatletaSubject.next(this.idatleta);
  }

  public getRolAsObservable(): Observable<string> {
    return this.rolSubject.asObservable();
  }

  public getToken() {
    return localStorage.getItem('token');
  }
}
