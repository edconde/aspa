import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material';
import { Competicion } from '../../../../shared/models/Competicion';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompeticionService } from 'src/app/shared/services/competicion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmacionPopupComponent } from 'src/app/shared/components/confirmacion-popup/confirmacion-popup.component';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-competicion-popup',
  templateUrl: './competicion-popup.component.html',
  styleUrls: ['./competicion-popup.component.scss'],
})
export class CompeticionPopupComponent implements OnInit {
  action: string;
  competicionForm: FormGroup;
  competicion: Competicion;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CompeticionPopupComponent>,
    private snackBar: MatSnackBar,
    private competicionService: CompeticionService,
    private dialog: MatDialog
  ) {
    this.action = data.action;
    this.competicionForm = this.createFormGroup();
    this.competicion = data.competicion;
  }

  ngOnInit() {
    if (this.competicion !== undefined) {
      this.fillForm();
    }
  }

  private createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', Validators.required),
      fecha: new FormControl(new Date(), Validators.required),
      lugar: new FormControl('', Validators.required),
    });
  }

  private fillForm() {
    this.competicionForm.get('nombre').setValue(this.competicion.nombre);
    this.competicionForm.get('fecha').setValue(this.competicion.fecha);
    this.competicionForm.get('lugar').setValue(this.competicion.lugar);
  }

  public onSubmit() {
    if (this.competicion) {
      const competicionToEdit: Competicion = Object.assign(
        { idcompeticion: this.competicion.idcompeticion },
        this.competicionForm.value
      );
      competicionToEdit.fecha = moment(new Date(competicionToEdit.fecha))
        .tz('Europe/Madrid')
        .format('YYYY-MM-DD');
      this.confirmEdition(competicionToEdit);
    } else {
      const competicionToCreate: Competicion = Object.assign(
        { idcompeticion: null },
        this.competicionForm.value
      );
      competicionToCreate.fecha = moment(new Date(competicionToCreate.fecha))
        .tz('Europe/Madrid')
        .format('YYYY-MM-DD');
      this.confirmCreation(competicionToCreate);
    }
  }

  private confirmCreation(competicion: Competicion) {
    const dialogref = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Crear competición?',
        detailedMessage:
          'Posteriormente podrás asignar pruebas a esta competición.',
      },
    });
    dialogref.afterClosed().subscribe(result => {
      if (result && result === true) {
        this.createCompeticion(competicion);
      }
    });
  }

  private confirmEdition(competicion: Competicion) {
    const dialogref = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Guardar cambios?',
      },
    });
    dialogref.afterClosed().subscribe(result => {
      if (result && result === true) {
        this.editCompeticion(competicion);
      }
    });
  }

  private createCompeticion(competicion: Competicion) {
    this.competicionService.add(competicion).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.openSnackBar('Ya existe la competición', 'cerrar');
        } else {
          this.openSnackBar('Error en el servidor', 'cerrar');
        }
      }
    );
  }

  private editCompeticion(competicion: Competicion) {
    this.competicionService.edit(competicion).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar('Error en el servidor', 'cerrar');
      }
    );
  }

  public close(returnValue?) {
    if (returnValue) {
      this.dialogRef.close(returnValue);
    } else {
      this.dialogRef.close();
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
