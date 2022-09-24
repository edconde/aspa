import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CompeticionesRoutingModule } from './competiciones-routing.module';
import { CompeticionesComponent } from './competiciones/competiciones.component';
import { CompeticionesListComponent } from './competiciones/competiciones-list/competiciones-list.component';
import { PruebasListComponent } from './competiciones/pruebas-list/pruebas-list.component';
import { PruebaPopupComponent } from './competiciones/pruebas-list/prueba-popup/prueba-popup.component';
import { CompeticionPopupComponent } from './competiciones/competiciones-list/competicion-popup/competicion-popup.component';
import { HojaDeCampoNoSvComponent } from './competiciones/pruebas-list/hoja-de-campo-no-sv/hoja-de-campo-no-sv.component';
import { HojaDeCampoSvComponent } from './competiciones/pruebas-list/hoja-de-campo-sv/hoja-de-campo-sv.component';
import { ResultadoIntentoNoSvComponent } from './competiciones/pruebas-list/hoja-de-campo-no-sv/resultado-intento-no-sv/resultado-intento-no-sv.component';
import { ResultadoIntentoSvComponent } from './competiciones/pruebas-list/hoja-de-campo-sv/resultado-intento-sv/resultado-intento-sv.component';
import { AlturasAddComponent } from './competiciones/pruebas-list/hoja-de-campo-sv/alturas-add/alturas-add.component';
import { AlturaEditComponent } from './competiciones/pruebas-list/hoja-de-campo-sv/altura-edit/altura-edit.component';
import { PruebaAyudaComponent } from './competiciones/pruebas-list/prueba-ayuda/prueba-ayuda.component';
import { InscripcionesListComponent } from './competiciones/pruebas-list/inscripciones-list/inscripciones-list.component';
import { InscripcionesAtletasComponent } from './competiciones/pruebas-list/inscripciones-atletas/inscripciones-atletas.component';

@NgModule({
  declarations: [
    CompeticionesComponent,
    CompeticionesListComponent,
    PruebasListComponent,
    PruebaPopupComponent,
    CompeticionPopupComponent,
    HojaDeCampoNoSvComponent,
    HojaDeCampoSvComponent,
    ResultadoIntentoNoSvComponent,
    ResultadoIntentoSvComponent,
    AlturasAddComponent,
    AlturaEditComponent,
    PruebaAyudaComponent,
    InscripcionesListComponent,
    InscripcionesAtletasComponent,
  ],
  imports: [CommonModule, CompeticionesRoutingModule, SharedModule],
  entryComponents: [
    PruebaPopupComponent,
    CompeticionPopupComponent,
    ResultadoIntentoNoSvComponent,
    ResultadoIntentoSvComponent,
    AlturasAddComponent,
    AlturaEditComponent,
    PruebaAyudaComponent,
    InscripcionesListComponent,
    InscripcionesAtletasComponent,
  ],
})
export class CompeticionesModule {}
