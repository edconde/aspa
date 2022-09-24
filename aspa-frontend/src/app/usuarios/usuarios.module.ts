import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

@NgModule({
  declarations: [UsuariosComponent, UsuariosListComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
  ]
})
export class UsuariosModule { }
