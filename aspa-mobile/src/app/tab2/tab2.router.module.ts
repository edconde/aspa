import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { PruebasCompeticionHoyComponent } from './pruebas-competicion-hoy/pruebas-competicion-hoy.component';
import { ClasificacionPruebaHoyComponent } from './pruebas-competicion-hoy/clasificacion-prueba-hoy/clasificacion-prueba-hoy.component';
import { PruebaDirectoHoyComponent } from './pruebas-competicion-hoy/prueba-directo-hoy/prueba-directo-hoy.component';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
    pathMatch: 'full',
  },
  {
    path: ':idcompeticion',
    component: PruebasCompeticionHoyComponent,
    pathMatch: 'full',
  },
  {
    path: ':idcompeticion/clasificaciones',
    component: ClasificacionPruebaHoyComponent,
    pathMatch: 'full',
  },
  {
    path: ':idcompeticion/en-curso',
    component: PruebaDirectoHoyComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2PageRoutingModule {}
