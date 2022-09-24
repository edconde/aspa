import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminGuardService as AdminGuard } from '../core/auth/admin-guard.service';
import { JudgeGuardService as JudgeGuard } from '../core/auth/judge-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: {
      breadcrumb: '',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'competiciones',
      },
      {
        path: 'competiciones',
        loadChildren:
          '../competiciones/competiciones.module#CompeticionesModule',
        data: {
          breadcrumb: 'Competiciones',
        },
        canActivateChild: [JudgeGuard],
        canLoad: [JudgeGuard],
      },
      {
        path: 'usuarios',
        loadChildren: '../usuarios/usuarios.module#UsuariosModule',
        data: {
          breadcrumb: 'Usuarios',
        },
        canActivateChild: [AdminGuard],
        canLoad: [AdminGuard],
      },
      {
        path: 'atletas',
        loadChildren: '../atletas/atletas.module#AtletasModule',
        data: {
          breadcrumb: 'Atletas',
        },
        canActivateChild: [AdminGuard],
        canLoad: [AdminGuard],
      },
      {
        path: 'clubes',
        loadChildren: '../clubes/clubes.module#ClubesModule',
        data: {
          breadcrumb: 'Clubes',
        },
        canActivateChild: [AdminGuard],
        canLoad: [AdminGuard],
      },
      {
        path: 'tipos-prueba',
        loadChildren: '../tipos-prueba/tipos-prueba.module#TiposPruebaModule',
        data: {
          breadcrumb: 'Tipos de prueba',
        },
        canActivateChild: [AdminGuard],
        canLoad: [AdminGuard],
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
