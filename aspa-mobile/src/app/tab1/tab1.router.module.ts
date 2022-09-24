import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { PruebasCompeticionComponent } from './pruebas-competicion/pruebas-competicion.component';
import { ClasificacionPruebaComponent } from './pruebas-competicion/clasificacion-prueba/clasificacion-prueba.component';
import { PruebaDirectoComponent } from './pruebas-competicion/prueba-directo/prueba-directo.component';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    pathMatch: 'full',
  },
  {
    path: ':idcompeticion',
    component: PruebasCompeticionComponent,
    pathMatch: 'full',
  },
  {
    path: ':idcompeticion/clasificaciones',
    component: ClasificacionPruebaComponent,
    pathMatch: 'full',
  },
  {
    path: ':idcompeticion/en-curso',
    component: PruebaDirectoComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
