import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/session/session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CampoPopupComponent } from 'src/app/shared/components/campo-popup/campo-popup.component';
import { PasswordService } from 'src/app/shared/services/password.service';

@Component({
  selector: 'ihair-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public loginForm: FormGroup;
  public loggingIn: boolean = false;

  constructor(
    private router: Router,
    private session: SessionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private passwordService: PasswordService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit() {
    this.loggingIn = true;
    this.session.login(this.loginForm.value).subscribe(
      (token) => {
        if (this.session.create(token)) {
          this.router.navigate(['/']);
          this.openSnackBar('Sesión iniciada', 'Cerrar');
        } else {
          this.openSnackBar('Ha ocurrido un error haciendo login', 'Cerrar');
        }
      },
      (error: HttpErrorResponse) => {
        this.loggingIn = false;
        if (error.status === 401) {
          this.openSnackBar(
            'Combinación email/contraseña incorrecta',
            'Cerrar'
          );
        } else {
          this.openSnackBar('Ha ocurrido un error haciendo login', 'Cerrar');
        }
      }
    );
  }

  public openModal(email: string): void {
    const dialogRef = this.dialog.open(CampoPopupComponent, {
      data: {
        title: '¿Olvidaste tu contraseña?',
        detailedMessage:
          'Si has olvidado tu contraseña, indica tu email y te enviaremos una nueva.',
        campoValue: email,
        action: 'Generar',
      },
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.loginForm.get('email').setValue(response);
        if (this.loginForm.get('email').valid) {
          this.passwordService
            .resetPassword(this.loginForm.get('email').value)
            .subscribe(
              (res) => {
                this.snackBar.open(
                  'Contraseña regenerada, revisa tu correo!',
                  'Cerrar',
                  {
                    duration: 0,
                  }
                );
              },
              (error: HttpErrorResponse) => {
                if (error.status === 422) {
                  this.openSnackBar('Ese email no está registrado!', 'Cerrar');
                } else {
                  this.openSnackBar('Error en el servidor', 'Cerrar');
                }
              }
            );
        }
      }
    });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
