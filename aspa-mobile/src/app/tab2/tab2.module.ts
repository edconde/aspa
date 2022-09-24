import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2.router.module';
import { PruebasCompeticionHoyComponent } from './pruebas-competicion-hoy/pruebas-competicion-hoy.component';
import { ClasificacionPruebaHoyComponent } from './pruebas-competicion-hoy/clasificacion-prueba-hoy/clasificacion-prueba-hoy.component';
import { SharedModule } from '../shared/shared.module';
import { PruebaHoyModalPageModule } from './pruebas-competicion-hoy/prueba-hoy-modal/prueba-hoy-modal.module';
import { MarcasModalHoyPageModule } from './pruebas-competicion-hoy/clasificacion-prueba-hoy/marcas-modal-hoy/marcas-modal-hoy.module';
import { PruebaDirectoIntentoHoyPageModule } from './pruebas-competicion-hoy/prueba-directo-hoy/prueba-directo-intento-hoy/prueba-directo-intento-hoy.module';
import { PruebaDirectoHoyComponent } from './pruebas-competicion-hoy/prueba-directo-hoy/prueba-directo-hoy.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    FormsModule,
    Tab2PageRoutingModule,
    PruebaHoyModalPageModule,
    MarcasModalHoyPageModule,
    PruebaDirectoIntentoHoyPageModule,
  ],
  declarations: [
    Tab2Page,
    PruebasCompeticionHoyComponent,
    ClasificacionPruebaHoyComponent,
    PruebaDirectoHoyComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab2PageModule {}
