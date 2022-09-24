import { Component, Inject } from '@angular/core';
import { TipoPruebaService } from '../../../../shared/services/tipo-prueba.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoPrueba } from '../../../../shared/models/TipoPrueba';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DISCIPLINAS } from '../../../../shared/models/Disciplina';
import { CATEGORIAS } from '../../../../shared/models/Categoria';
import { SEXOS } from '../../../../shared/models/Sexo';

@Component({
  selector: 'app-tipo-prueba-popup',
  templateUrl: './tipo-prueba-popup.component.html',
  styleUrls: ['./tipo-prueba-popup.component.scss'],
})
export class TipoPruebaPopupComponent {
  message: string;
  disciplinas: string[];
  categorias: string[];
  sexos: string[];
  tipoPruebaForm: FormGroup;

  constructor(
    private tipoPruebaService: TipoPruebaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TipoPruebaPopupComponent>,
    private snackBar: MatSnackBar
  ) {
    this.message = data.title;
    this.tipoPruebaForm = new FormGroup({
      disciplina: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
    });
    this.disciplinas = Object.keys(DISCIPLINAS);
    this.categorias = Object.keys(CATEGORIAS);
    this.sexos = Object.keys(SEXOS);
  }

  onSubmit() {
    this.createTipoPrueba(this.tipoPruebaForm.value);
  }

  createTipoPrueba(tipoPrueba: TipoPrueba) {
    this.tipoPruebaService.add(tipoPrueba).subscribe(
      response => {
        this.dialogRef.close(true);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.openSnackBar('Ya existe ese tipo de prueba', 'cerrar');
        } else {
          this.openSnackBar('Error en el servidor', 'cerrar');
        }
      }
    );
  }

  goBack() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getDisciplinaLabel(disciplina) {
    return DISCIPLINAS[disciplina];
  }

  getCategoriaLabel(categoria) {
    return CATEGORIAS[categoria];
  }

  getSexoLabel(sexo) {
    return SEXOS[sexo];
  }
}
