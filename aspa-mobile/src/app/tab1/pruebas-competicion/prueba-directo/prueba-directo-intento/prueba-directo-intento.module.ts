import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PruebaDirectoIntentoPage } from './prueba-directo-intento.page';

const routes: Routes = [
  {
    path: '',
    component: PruebaDirectoIntentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PruebaDirectoIntentoPage]
})
export class PruebaDirectoIntentoPageModule {}
