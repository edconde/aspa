import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material';
import { Prueba } from '../../../../shared/models/Prueba';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { TipoPruebaService } from 'src/app/shared/services/tipo-prueba.service';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { TipoPrueba } from 'src/app/shared/models/TipoPrueba';
import { CATEGORIAS } from 'src/app/shared/models/Categoria';
import { DISCIPLINAS } from 'src/app/shared/models/Disciplina';
import { SEXOS } from 'src/app/shared/models/Sexo';
import { ConfirmacionPopupComponent } from 'src/app/shared/components/confirmacion-popup/confirmacion-popup.component';
import { Observable, forkJoin } from 'rxjs';
import { aspaTheme } from '../../../../shared/utils/material-timepicker-theme';

@Component({
  selector: 'app-prueba-popup',
  templateUrl: './prueba-popup.component.html',
  styleUrls: ['./prueba-popup.component.scss'],
})
export class PruebaPopupComponent implements OnInit {
  public action: string;
  public pruebaForm: FormGroup;
  private prueba: Prueba;
  public usuarios: Usuario[];
  public tiposPrueba: TipoPrueba[];
  private fechaPrueba: Date;
  private horaPruebaDefault: string;
  private apCamaraDefault: string;
  private ciCamaraDefault: string;
  public aspaTheme = aspaTheme;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PruebaPopupComponent>,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private tipoPruebaService: TipoPruebaService,
    private dialog: MatDialog
  ) {
    this.action = data.action;
    this.pruebaForm = this.createFormGroup();
    this.prueba = data.prueba;
    this.fechaPrueba = new Date(data.fecha);
    this.fechaPrueba.setHours(9);
    this.horaPruebaDefault = this.prueba
      ? this.toTime(new Date(this.prueba.hora_prueba))
      : this.toTime(this.fechaPrueba);
    this.apCamaraDefault = this.prueba
      ? this.toTime(new Date(this.prueba.apertura_camara))
      : this.toTime(this.fechaPrueba);
    this.ciCamaraDefault = this.prueba
      ? this.toTime(new Date(this.prueba.cierre_camara))
      : this.toTime(this.fechaPrueba);
  }

  ngOnInit() {
    this.getUsuariosAndTiposPrueba().subscribe(
      responseList => {
        this.usuarios = responseList[0];
        this.tiposPrueba = responseList[1];
        this.pruebaForm.get('fecha').setValue(this.fechaPrueba);
        this.pruebaForm.get('hora_prueba').setValue(this.horaPruebaDefault);
        this.pruebaForm.get('apertura_camara').setValue(this.apCamaraDefault);
        this.pruebaForm.get('cierre_camara').setValue(this.ciCamaraDefault);
        if (this.prueba !== undefined) {
          this.fillForm();
        } else {
          this.pruebaForm.get('num_intentos').setValue(3);
          this.pruebaForm.get('num_intentos_mejora').setValue(3);
          this.pruebaForm.get('num_atletas_mejora').setValue(8);
        }
      },
      (error: any) => {
        this.openSnackBar('Error en el servidor', 'cerrar');
        this.close();
      }
    );
    this.pruebaForm.controls['tipo_prueba'].valueChanges.subscribe(
      selectedType => {
        if (
          ['SALTO_PERTIGA', 'SALTO_ALTURA'].indexOf(selectedType.disciplina) >
          -1
        ) {
          this.pruebaForm.get('num_intentos').disable();
          this.pruebaForm.get('num_intentos_mejora').disable();
          this.pruebaForm.get('num_atletas_mejora').disable();
        } else {
          this.pruebaForm.get('num_intentos').enable();
          this.pruebaForm.get('num_intentos_mejora').enable();
          this.pruebaForm.get('num_atletas_mejora').enable();
        }
      }
    );
    this.pruebaForm.controls['num_intentos_mejora'].valueChanges.subscribe(
      value => {
        if (value === 0) {
          this.pruebaForm.get('num_atletas_mejora').setValue(0);
        }
      }
    );
  }

  createFormGroup() {
    return new FormGroup({
      fecha: new FormControl(this.fechaPrueba, Validators.required),
      hora_prueba: new FormControl('', Validators.required),
      apertura_camara: new FormControl('', Validators.required),
      cierre_camara: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required),
      tipo_prueba: new FormControl('', Validators.required),
      num_intentos: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      num_intentos_mejora: new FormControl('', Validators.min(0)),
      num_atletas_mejora: new FormControl('', Validators.min(0)),
    });
  }

  private fillForm() {
    const selectedUsuario = this.usuarios.find(
      u => u.idusuario === this.prueba.usuario.idusuario
    );
    this.pruebaForm.get('usuario').setValue(selectedUsuario);
    const selectedTipoPrueba = this.tiposPrueba.find(
      t => t.idtipoprueba === this.prueba.tipo_prueba.idtipoprueba
    );
    this.pruebaForm.get('tipo_prueba').setValue(selectedTipoPrueba);
    this.pruebaForm.get('num_intentos').setValue(this.prueba.num_intentos);
    this.pruebaForm
      .get('num_intentos_mejora')
      .setValue(this.prueba.num_intentos_mejora);
    this.pruebaForm
      .get('num_atletas_mejora')
      .setValue(this.prueba.num_atletas_mejora);
  }

  private getUsuariosAndTiposPrueba(): Observable<any[]> {
    const usuarios = this.usuarioService.getAll();
    const tiposPrueba = this.tipoPruebaService.getAll();
    return forkJoin([usuarios, tiposPrueba]);
  }

  public onSubmit() {
    const prueba: Prueba = this.createPruebaObject(this.pruebaForm.value);
    const dialogref = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Asignar prueba a la competición?',
        detailedMessage:
          'Recuerda que debes guardar la competición para que estos cambios se hagan efectivos.',
      },
    });
    dialogref.afterClosed().subscribe(result => {
      if (result && result === true) {
        this.close(prueba);
      }
    });
  }

  public goBack() {
    this.close();
  }

  private close(returnValue?) {
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

  getDescription(t: TipoPrueba) {
    return `${CATEGORIAS[t.categoria]} ${SEXOS[t.sexo]} - ${
      DISCIPLINAS[t.disciplina]
    }`;
  }

  createPruebaObject(value: any): Prueba {
    const pruebaObject: Prueba = {
      idprueba: this.prueba ? this.prueba.idprueba : null,
      fecha: value.fecha,
      hora_prueba: this.toDate(value.fecha, value.hora_prueba),
      apertura_camara: this.toDate(value.fecha, value.apertura_camara),
      cierre_camara: this.toDate(value.fecha, value.cierre_camara),
      tipo_prueba: value.tipo_prueba,
      usuario: value.usuario,
      num_intentos: value.num_intentos || 0,
      num_intentos_mejora: value.num_intentos_mejora || 0,
      num_atletas_mejora: value.num_atletas_mejora || 0,
      finalizada: false,
    };
    return pruebaObject;
  }

  toDate(date: Date, time: string) {
    const dateWithTime = new Date(date);
    const timeValues = time.split(':');
    const hours = parseInt(timeValues[0], 10);
    const minutes = parseInt(timeValues[1], 10);
    dateWithTime.setHours(hours, minutes, 0, 0);
    return dateWithTime;
  }

  toTime(date: Date) {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
