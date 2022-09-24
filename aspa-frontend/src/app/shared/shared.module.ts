import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatFormFieldModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatOptionModule,
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatTabsModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatChipsModule,
} from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ConfirmacionPopupComponent } from './components/confirmacion-popup/confirmacion-popup.component';
import { CampoPopupComponent } from './components/campo-popup/campo-popup.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormatDate } from './pipes/DatePipe';
import { ToHourAndMinutes } from './pipes/HourMinutesPipe';
import { ActionsFooterComponent } from './components/actions-footer/actions-footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    NgxMaterialTimepickerModule,
    //Router
    RouterModule,
  ],
  declarations: [
    ConfirmacionPopupComponent,
    CampoPopupComponent,
    EmptyStateComponent,
    SpinnerComponent,
    ActionsFooterComponent,
    FormatDate,
    ToHourAndMinutes,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    NgxMaterialTimepickerModule,
    //Router
    RouterModule,
    EmptyStateComponent,
    SpinnerComponent,
    ActionsFooterComponent,
    //Pipes
    FormatDate,
    ToHourAndMinutes,
  ],
  entryComponents: [ConfirmacionPopupComponent, CampoPopupComponent],
})
export class SharedModule {}
