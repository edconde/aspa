import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionService } from '../shared/services/session.service';
import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { PasswordService } from '../shared/services/password.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private session: SessionService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private passwordService: PasswordService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión',
      });
      await loading.present();
      this.session
        .login(this.loginForm.value)
        .pipe(
          finalize(() => {
            loading.dismiss();
          })
        )
        .subscribe(
          (token: string) => {
            this.session.create(token);
            this.presentLoginToast();
          },
          (error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.presentWarningToast(false);
            } else {
              this.presentWarningToast(false, true);
            }
          }
        );
    } else {
      this.presentWarningToast(true);
    }
  }

  public logout(): void {
    this.session.close();
    this.presentLoginToast(true);
  }

  public isLoggedIn(): boolean {
    return this.session.isAuthenticated();
  }

  public getUsername(): string {
    return this.session.getUsername();
  }

  public async presentLoginToast(logout?: boolean) {
    const saludo = logout ? 'Adiós' : `Hola, ${this.session.getUsername()}`;
    const icon = logout ? 'hand' : 'happy';
    const accion = logout ? 'cerrado' : 'iniciado';
    const toast = await this.toastController.create({
      header: `${saludo}!`,
      message: `Has ${accion} sesión`,
      duration: 2000,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon,
        },
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }

  public async presentWarningToast(
    validationErrors: boolean,
    serverError?: boolean
  ) {
    const header = validationErrors
      ? 'Datos incorrectos:'
      : 'Ha ocurrido un error';
    const icon = validationErrors ? 'information-circle' : 'warning';
    const message = validationErrors
      ? 'Ningún campo puede estar vacío y tu contraseña no puede tener menos de 8 caracteres'
      : serverError
      ? 'Error en el servidor'
      : 'Combinación email/contraseña incorrecta';
    const toast = await this.toastController.create({
      header,
      message,
      duration: 2000,
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon,
        },
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }

  public async resetPasswordAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: '¿Regenerar contraseña?',
      message: 'Te enviaremos la nueva contraseña a tu correo',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            this.resetPassword();
          },
        },
      ],
    });
    await alert.present();
  }

  private async resetPassword() {
    const loading = await this.loadingController.create({
      message: 'Generando contraseña',
    });
    await loading.present();
    this.passwordService
      .resetPassword(this.loginForm.get('email').value)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        res => {
          this.presentResetPasswordToast(
            'Contraseña regenerada',
            'Revisa tu correo!',
            0
          );
        },
        (error: HttpErrorResponse) => {
          if (error.status === 422) {
            this.presentResetPasswordToast(
              'Ha ocurrido un error',
              'Ese email no está registrado!',
              2000
            );
          } else {
            this.presentResetPasswordToast(
              'Ha ocurrido un error',
              'No se ha podido regenerar la contraseña',
              2000
            );
          }
        }
      );
  }

  private async presentResetPasswordToast(
    header: string,
    message: string,
    duration: number
  ) {
    const toast = await this.toastController.create({
      header,
      message,
      duration,
      position: 'bottom',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }
}
