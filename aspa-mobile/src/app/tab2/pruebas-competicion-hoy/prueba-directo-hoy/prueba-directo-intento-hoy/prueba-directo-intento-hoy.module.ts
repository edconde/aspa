import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PruebaDirectoIntentoHoyPage } from './prueba-directo-intento-hoy.page';

const routes: Routes = [
  {
    path: '',
    component: PruebaDirectoIntentoHoyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PruebaDirectoIntentoHoyPage]
})
export class PruebaDirectoIntentoHoyPageModule {}
