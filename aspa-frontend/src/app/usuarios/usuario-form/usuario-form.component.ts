import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../shared/services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../shared/models/usuario.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'aspa-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
})
export class UsuarioFormComponent implements OnInit {
  title: string = 'Editar usuario';
  idusuario: string;
  usuario: Usuario;
  usuarioForm: FormGroup;
  roles = [
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Juez', value: 'JUEZ' },
  ];
  categorias = [
    { label: 'Aspirante', value: 'ASP' },
    { label: 'Juez autonómico', value: 'JAUT' },
    { label: 'Nivel I', value: 'NI' },
    { label: 'Nivel II', value: 'NII' },
    { label: 'Nivel III', value: 'NIII' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {
    this.usuarioForm = this.createFormGroup();
  }

  ngOnInit() {
    if (this.route.snapshot.url.toString().startsWith('editar')) {
      this.idusuario = this.route.snapshot.params['idusuario'];
      this.getUsuario();
    } else {
      this.title = 'Alta de usuario';
    }
  }

  private createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      licencia: new FormControl(''),
    });
  }

  private getUsuario() {
    this.usuarioService.getById(this.idusuario).subscribe(
      usuario => {
        this.usuario = usuario;
        this.fillForm();
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/usuarios']);
      }
    );
  }

  private fillForm() {
    this.usuarioForm.get('email').setValue(this.usuario.email);
    this.usuarioForm.get('nombre').setValue(this.usuario.nombre);
    this.usuarioForm.get('apellidos').setValue(this.usuario.apellidos);
    this.usuarioForm.get('dni').setValue(this.usuario.dni);
    this.usuarioForm.get('telefono').setValue(this.usuario.telefono);
    this.usuarioForm
      .get('rol')
      .setValue(this.roles.find(rol => rol.value == this.usuario.rol).value);
    this.usuarioForm
      .get('categoria')
      .setValue(
        this.categorias.find(cat => cat.value == this.usuario.categoria).value
      );
    this.usuarioForm.get('licencia').setValue(this.usuario.licencia);
  }

  public onSubmit() {
    if (this.usuario) {
      const usuarioToEdit: Usuario = Object.assign(
        { idusuario: this.usuario.idusuario },
        this.usuarioForm.value
      );
      this.editUsuario(usuarioToEdit);
    } else {
      const usuarioToCreate: Usuario = Object.assign(
        { idusuario: null },
        this.usuarioForm.value
      );
      this.addUsuario(usuarioToCreate);
    }
  }

  private addUsuario(usuario: Usuario) {
    this.usuarioService.add(usuario).subscribe(
      (data: any) => {
        this.openSnackBar('Usuario creado', 'cerrar');
        this.goBack();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.openSnackBar('Email/dni ya registrado', 'cerrar');
        } else {
          this.openSnackBar('Error en el servidor', 'cerrar');
        }
      }
    );
  }

  private editUsuario(usuario: Usuario) {
    this.usuarioService.edit(usuario).subscribe(
      (data: any) => {
        this.openSnackBar('Usuario editado', 'cerrar');
        this.goBack();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.openSnackBar('No existe el usuario a editar', 'cerrar');
        } else {
          this.openSnackBar('Error en el servidor', 'cerrar');
        }
      }
    );
  }

  public goBack() {
    this.router.navigate(['/usuarios']);
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
