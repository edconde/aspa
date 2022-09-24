import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../../shared/services/usuario.service';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'aspa-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Array<Usuario>;
  error = false;
  errorMessage = 'No se han podido cargar los usuarios';
  loadingMessage = 'Cargando usuarios';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getAll().subscribe(
      usuarios => {
        this.usuarios = usuarios;
      },
      (error: HttpErrorResponse) => {
        this.error = true;
      }
    );
  }

  onUsuarioDeleted() {
    this.ngOnInit();
  }

  onRetry() {
    this.error = false;
    this.ngOnInit();
  }
}
