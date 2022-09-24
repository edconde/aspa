import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubesComponent } from './clubes/clubes.component';

const routes: Routes = [
  {
    path: '',
    component: ClubesComponent,
    data: {
      breadcrumb: '',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisciplinasRoutingModule {}
