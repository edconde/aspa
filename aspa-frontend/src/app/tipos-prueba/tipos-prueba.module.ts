import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposPruebaComponent } from './tipos-prueba/tipos-prueba.component';
import { DisciplinasRoutingModule } from './tipos-prueba-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TiposPruebaListComponent } from './tipos-prueba/tipos-prueba-list/tipos-prueba-list.component';
import { TipoPruebaPopupComponent } from './tipos-prueba/tipos-prueba-list/tipo-prueba-popup/tipo-prueba-popup.component';

@NgModule({
  declarations: [TiposPruebaComponent, TiposPruebaListComponent, TipoPruebaPopupComponent],
  imports: [
    CommonModule,
    DisciplinasRoutingModule,
    SharedModule
  ],
  entryComponents: [TipoPruebaPopupComponent]
})
export class TiposPruebaModule { }
