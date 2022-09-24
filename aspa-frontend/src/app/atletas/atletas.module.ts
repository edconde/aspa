import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtletasComponent } from './atletas/atletas.component';
import { AtletasRoutingModule } from './atletas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AtletasListComponent } from './atletas/atletas-list/atletas-list.component';
import { AtletaFormComponent } from './atleta-form/atleta-form.component';

@NgModule({
  declarations: [AtletasComponent, AtletasListComponent, AtletaFormComponent],
  imports: [CommonModule, AtletasRoutingModule, SharedModule],
})
export class AtletasModule {}
