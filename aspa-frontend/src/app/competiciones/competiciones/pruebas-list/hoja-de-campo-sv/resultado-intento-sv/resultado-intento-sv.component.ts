import { Component, OnInit, Inject } from '@angular/core';
import { RESULTADO } from 'src/app/shared/models/enums/Resultado';
import {
  MatSnackBar,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material';
import { MarcaSv } from 'src/app/shared/models/Marca';

@Component({
  selector: 'aspa-resultado-intento-sv',
  templateUrl: './resultado-intento-sv.component.html',
  styleUrls: ['./resultado-intento-sv.component.scss'],
})
export class ResultadoIntentoSvComponent {
  public marca: MarcaSv;

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { marca: MarcaSv },
    private snackBar: MatSnackBar
  ) {
    this.marca = data.marca;
    if (this.marca.resultado === null) {
      this.marca.resultado = 'VALIDO';
    }
  }

  updateIntento() {
    if (RESULTADO[this.marca.resultado]) {
      this.bottomSheetRef.dismiss(this.marca);
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
