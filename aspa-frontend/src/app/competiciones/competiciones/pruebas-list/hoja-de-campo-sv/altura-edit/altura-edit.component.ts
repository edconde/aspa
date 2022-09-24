import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { Altura } from 'src/app/shared/models/Altura';
import { AlturaDialogResponse } from 'src/app/shared/models/helpers/AlturaDialogResponse';
import { ACTIONS } from 'src/app/shared/models/enums/Actions';

@Component({
  selector: 'app-altura-edit',
  templateUrl: './altura-edit.component.html',
  styleUrls: ['./altura-edit.component.scss'],
})
export class AlturaEditComponent {
  public altura: Altura;
  public alturas: number[];
  public dialogEditResponse: AlturaDialogResponse = { action: ACTIONS.EDIT };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { altura: Altura; alturas?: number[] },
    private dialogRef: MatDialogRef<AlturaEditComponent>,
    private snackBar: MatSnackBar
  ) {
    this.altura = data.altura;
    this.alturas = data.alturas || [];
  }

  editAltura() {
    if (this.isValid(this.altura.altura)) {
      this.dialogEditResponse.altura = this.altura;
      this.close();
    } else {
      this.openSnackBar('No has añadido ninguna altura nueva!', 'Cerrar');
    }
  }

  deleteAltura() {
    this.dialogEditResponse.action = ACTIONS.DELETE;
    this.close();
  }

  isValid(altura: number) {
    return typeof altura === 'number' && !this.alturas.includes(altura);
  }

  close() {
    this.dialogRef.close(this.dialogEditResponse);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
