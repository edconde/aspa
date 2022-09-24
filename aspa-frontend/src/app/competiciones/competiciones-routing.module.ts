import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompeticionesComponent } from './competiciones/competiciones.component';
import { PruebasListComponent } from './competiciones/pruebas-list/pruebas-list.component';
import { HojaDeCampoSvComponent } from './competiciones/pruebas-list/hoja-de-campo-sv/hoja-de-campo-sv.component';
import { HojaDeCampoNoSvComponent } from './competiciones/pruebas-list/hoja-de-campo-no-sv/hoja-de-campo-no-sv.component';

const routes: Routes = [
  {
    path: '',
    component: CompeticionesComponent,
    data: {
      breadcrumb: '',
    },
  },
  {
    path: ':idcompeticion/pruebas',
    component: PruebasListComponent,
    data: {
      breadcrumb: 'Pruebas',
    },
  },
  {
    path: ':idcompeticion/pruebas/:idprueba/hoja-campo',
    component: HojaDeCampoNoSvComponent,
    data: {
      breadcrumb: 'Hoja de campo',
    },
  },
  {
    path: ':idcompeticion/pruebas/:idprueba/hoja-campo-sv',
    component: HojaDeCampoSvComponent,
    data: {
      breadcrumb: 'Hoja de campo',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompeticionesRoutingModule { }
