import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtletasComponent } from './atletas/atletas.component';
import { AtletaFormComponent } from './atleta-form/atleta-form.component';

const routes: Routes = [
  {
    path: '',
    component: AtletasComponent,
    data: {
      breadcrumb: '',
    },
  },
  {
    path: 'editar/:idatleta',
    component: AtletaFormComponent,
    data: {
      breadcrumb: 'Editar',
    },
  },
  {
    path: 'crear',
    component: AtletaFormComponent,
    data: {
      breadcrumb: 'Crear',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtletasRoutingModule {}
