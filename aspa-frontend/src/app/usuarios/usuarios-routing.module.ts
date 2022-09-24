import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

const routes: Routes = [
    {
        path: '',
        component: UsuariosComponent,
        data: {
            breadcrumb: '',
        },
    },
    {
        path: 'editar/:idusuario',
        component: UsuarioFormComponent,
        data: {
            breadcrumb: 'Editar',
        },
    },
    {
        path: 'crear',
        component: UsuarioFormComponent,
        data: {
            breadcrumb: 'Crear',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }
