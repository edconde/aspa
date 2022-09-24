import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubesComponent } from './clubes/clubes.component';
import { DisciplinasRoutingModule } from './clubes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClubesListComponent } from './clubes/clubes-list/clubes-list.component';
import { ClubPopupComponent } from './clubes/clubes-list/club-popup/club-popup.component';

@NgModule({
  declarations: [ClubesComponent, ClubesListComponent, ClubPopupComponent],
  imports: [CommonModule, DisciplinasRoutingModule, SharedModule],
  entryComponents: [ClubPopupComponent],
})
export class ClubesModule {}
