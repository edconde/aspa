import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1.router.module';
import { PruebasCompeticionComponent } from './pruebas-competicion/pruebas-competicion.component';
import { PruebaModalPageModule } from './pruebas-competicion/prueba-modal/prueba-modal.module';
import { SharedModule } from '../shared/shared.module';
import { ClasificacionPruebaComponent } from './pruebas-competicion/clasificacion-prueba/clasificacion-prueba.component';
import { MarcasModalPageModule } from './pruebas-competicion/clasificacion-prueba/marcas-modal/marcas-modal.module';
import { PruebaDirectoComponent } from './pruebas-competicion/prueba-directo/prueba-directo.component';
import { PruebaDirectoIntentoPageModule } from './pruebas-competicion/prueba-directo/prueba-directo-intento/prueba-directo-intento.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    FormsModule,
    Tab1PageRoutingModule,
    PruebaModalPageModule,
    MarcasModalPageModule,
    PruebaDirectoIntentoPageModule,
  ],
  declarations: [
    Tab1Page,
    PruebasCompeticionComponent,
    ClasificacionPruebaComponent,
    PruebaDirectoComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab1PageModule {}
