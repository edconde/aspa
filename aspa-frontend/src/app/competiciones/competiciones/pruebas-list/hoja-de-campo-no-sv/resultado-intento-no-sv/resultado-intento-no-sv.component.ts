import { Component, OnInit, Inject } from '@angular/core';
import { RESULTADO } from 'src/app/shared/models/enums/Resultado';
import {
  MatSnackBar,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material';
import { MarcaNs } from 'src/app/shared/models/Marca';

@Component({
  selector: 'aspa-resultado-intento-no-sv',
  templateUrl: './resultado-intento-no-sv.component.html',
  styleUrls: ['./resultado-intento-no-sv.component.scss'],
})
export class ResultadoIntentoNoSvComponent {
  public marca: MarcaNs;

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { marca: MarcaNs },
    private snackBar: MatSnackBar
  ) {
    this.marca = data.marca;
    if (this.marca.resultado === null) {
      this.marca.resultado = 'VALIDO';
    }
  }

  updateIntento() {
    if (RESULTADO[this.marca.resultado]) {
      if (this.marca.resultado === 'VALIDO') {
        if (this.marca.marca) {
          // AQUÍ VALIDAR LA MARCA !!
          this.bottomSheetRef.dismiss(this.marca);
        } else {
          this.openSnackBar('La marca no es válida!', 'Cerrar');
        }
      } else {
        this.marca.marca = null;
        this.bottomSheetRef.dismiss(this.marca);
      }
    } else {
      this.openSnackBar('Selecciona VÁLIDO, NULO o PASA !', 'Cerrar');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
