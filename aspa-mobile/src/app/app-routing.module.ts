import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'prueba-modal',
    loadChildren:
      './tab1/pruebas-competicion/prueba-modal/prueba-modal.module#PruebaModalPageModule',
  },
  {
    path: 'marcas-modal',
    loadChildren:
      './tab1/pruebas-competicion/clasificacion-prueba/marcas-modal/marcas-modal.module#MarcasModalPageModule',
  },
  {
    path: 'marcas-modal-hoy',
    loadChildren:
      './tab2/pruebas-competicion-hoy/clasificacion-prueba-hoy/marcas-modal-hoy/marcas-modal-hoy.module#MarcasModalHoyPageModule',
  },
  {
    path: 'prueba-hoy-modal',
    loadChildren:
      './tab2/pruebas-competicion-hoy/prueba-hoy-modal/prueba-hoy-modal.module#PruebaHoyModalPageModule',
  },
  {
    path: 'prueba-directo-intento',
    loadChildren:
      './tab1/pruebas-competicion/prueba-directo/prueba-directo-intento/prueba-directo-intento.module#PruebaDirectoIntentoPageModule',
  },
  {
    path: 'prueba-directo-intento-hoy',
    loadChildren:
      './tab2/pruebas-competicion-hoy/prueba-directo-hoy/prueba-directo-intento-hoy/prueba-directo-intento-hoy.module#PruebaDirectoIntentoHoyPageModule',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
