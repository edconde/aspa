import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PruebaService } from 'src/app/shared/services/prueba.service';
import { Prueba } from 'src/app/shared/models/Prueba';
import { Inscripcion } from 'src/app/shared/models/Inscripcion';
import { InscripcionService } from 'src/app/shared/services/inscripcion.service';
import { forkJoin } from 'rxjs';
import {
  MatTableDataSource,
  MatBottomSheet,
  MatSnackBar,
  MatDialog,
  MatPaginator,
} from '@angular/material';
import { MarcaSvService } from 'src/app/shared/services/marca-sv.service';
import { MarcaSv } from 'src/app/shared/models/Marca';
import { RESULTADO } from 'src/app/shared/models/enums/Resultado';
import { ResultadoIntentoSvComponent } from './resultado-intento-sv/resultado-intento-sv.component';
import { Column } from 'src/app/shared/models/helpers/Column';
import { HttpErrorResponse } from '@angular/common/http';
import { Clasificacion } from 'src/app/shared/models/Clasificacion';
import { SessionService } from 'src/app/core/session/session.service';
import { ClasificacionService } from 'src/app/shared/services/clasificacion.service';
import { ConfirmacionPopupComponent } from 'src/app/shared/components/confirmacion-popup/confirmacion-popup.component';
import { AlturaService } from 'src/app/shared/services/altura.service';
import { AlturasAddComponent } from './alturas-add/alturas-add.component';
import { Altura } from 'src/app/shared/models/Altura';
import { AlturaEditComponent } from './altura-edit/altura-edit.component';
import { AlturaDialogResponse } from 'src/app/shared/models/helpers/AlturaDialogResponse';
import { ACTIONS } from 'src/app/shared/models/enums/Actions';
import { PruebaAyudaComponent } from '../prueba-ayuda/prueba-ayuda.component';
import { Atleta } from 'src/app/shared/models/Atleta';
import { DISCIPLINAS } from 'src/app/shared/models/Disciplina';
import { TipoPrueba } from 'src/app/shared/models/TipoPrueba';
import { CATEGORIAS } from 'src/app/shared/models/Categoria';
import { SEXOS } from 'src/app/shared/models/Sexo';

export interface MejorMarca {
  idatleta: number;
  marca: number;
}

@Component({
  selector: 'aspa-hoja-de-campo-sv',
  templateUrl: './hoja-de-campo-sv.component.html',
  styleUrls: ['./hoja-de-campo-sv.component.scss'],
})
export class HojaDeCampoSvComponent implements OnInit {
  readonly INTENTOS = [1, 2, 3]; // Los intentos por cada altura
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Inscripcion>;
  private idcompeticion: number;
  private idprueba: number;
  private prueba: Prueba;
  public nombrePrueba: string;
  private inscripciones: Array<Inscripcion>;
  private alturas: Array<Altura>;
  private marcas: Array<MarcaSv>;
  private columns: Array<Column>;
  public displayedColumns: Array<string>;
  // Array con las marcas con resultado NULO que son la última de una secuencia descalificante (3 nulos seguidos)
  private disqualifyingMarks: Array<MarcaSv> = [];
  // Array con todas las marcas con resultado NULO que forman parte de una secuencia descalificante (3 nulos seguidos)
  private disqualifyingSequencesMarks: Array<MarcaSv> = [];

  constructor(
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private session: SessionService,
    private pruebaService: PruebaService,
    private inscripcionService: InscripcionService,
    private clasificacionService: ClasificacionService,
    private alturaService: AlturaService,
    private marcaService: MarcaSvService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idcompeticion = params['idcompeticion'];
      this.idprueba = params['idprueba'];
      this.getAllInfo();
    });
  }

  private getAllInfo() {
    const prueba = this.pruebaService.get(this.idcompeticion, this.idprueba);
    const inscripciones = this.inscripcionService.getAllPresentedByPrueba(
      this.idprueba
    );
    const alturas = this.alturaService.getAllByPrueba(this.idprueba);
    forkJoin([prueba, inscripciones, alturas]).subscribe(responseList => {
      this.prueba = responseList[0];
      this.nombrePrueba = this.buildNombrePrueba(responseList[0].tipo_prueba);
      this.inscripciones = responseList[1];
      responseList[2].sort((a, b) => a.altura - b.altura);
      this.alturas = responseList[2];
      this.getMarcas();
    });
  }

  private getMarcas() {
    this.marcaService
      .getAllByPrueba(this.prueba.idprueba)
      .subscribe((marcas: Array<MarcaSv>) => {
        marcas.forEach(m => {
          m.altura = this.alturas.find(a => a.idaltura === m.idaltura).altura;
        });
        this.marcas = marcas; // Estas son las marcas que existen en bd
        this.fillMarcas(); // Añadimos marcas que aun no existen en bd en los intentos que no tienen marca
        this.checkDisqualifications();
      });
  }

  private fillMarcas() {
    this.inscripciones.forEach(inscripcion => {
      const atleta = inscripcion.atleta.idatleta;
      this.alturas.forEach(altura => {
        for (let i = 1; i <= this.INTENTOS.length; i++) {
          if (!this.existMarca(atleta, altura.altura, i)) {
            this.marcas.push(this.createMarca(atleta, altura.altura, i));
          }
        }
      });
    });
    this.createColumns();
  }

  private checkDisqualifications() {
    this.inscripciones.forEach(inscripcion => {
      let consecutives = 0;
      // Array con las marcas con resultado NULO del atleta que forman parte de una secuencia descalificante (3 nulos seguidos)
      let athleteDisqualifyingSequenceMarks: Array<MarcaSv> = [];
      const athleteMarks = this.marcas.filter(
        m => m.atleta === inscripcion.atleta.idatleta
      );
      this.alturas.forEach(altura => {
        for (let i = 1; i <= 3 && consecutives < 3; i++) {
          const marca = athleteMarks.find(
            m => m.altura === altura.altura && m.intento === i
          );
          if (marca.resultado === 'NULO') {
            consecutives++;
            athleteDisqualifyingSequenceMarks.push(marca);
            if (consecutives === 3) {
              athleteDisqualifyingSequenceMarks.forEach(adsm =>
                this.disqualifyingSequencesMarks.push(adsm)
              );
              // this.disqualifyingSequencesMarks.push(...athleteDisqualifyingSequenceMarks);
              this.disqualifyingMarks.push(marca);
            }
          } else if (marca.resultado === 'VALIDO') {
            consecutives = 0;
            athleteDisqualifyingSequenceMarks = [];
          }
        }
      });
      if (consecutives === 3) {
        // eliminar aquí marcas posteriores a la última marca de la secuencia descalificante
        const disqualifyingMark = this.disqualifyingMarks.find(
          m => m.atleta === inscripcion.atleta.idatleta
        );
        const marksToDelete = athleteMarks.filter(
          m =>
            m.resultado !== null &&
            (m.altura > disqualifyingMark.altura ||
              (m.altura === disqualifyingMark.altura &&
                m.intento > disqualifyingMark.intento))
        );
        this.cleanMarks(marksToDelete);
      }
    });
  }

  private getHighestMark(idatleta: number): number {
    const athleteMarks: Array<MarcaSv> = this.marcas.filter(
      m => m.atleta === idatleta && m.resultado === 'VALIDO'
    );
    return athleteMarks.length > 0
      ? Math.max.apply(Math, athleteMarks.map(m => m.altura))
      : null;
  }

  private getPosition(idatleta: number) {
    const athleteBestMark: number = this.getHighestMark(idatleta);
    if (athleteBestMark) {
      const marksAbove = this.marcas.filter(
        m =>
          m.atleta !== idatleta &&
          m.resultado === 'VALIDO' &&
          m.altura > athleteBestMark
      );
      const athletesAbove = marksAbove.map(m => m.atleta);
      // sin repetidos:
      let positionsAbove = athletesAbove.filter(
        (a, i) => athletesAbove.indexOf(a) === i
      ).length;
      const draws = this.marcas.filter(
        m =>
          m.altura === athleteBestMark &&
          m.resultado === 'VALIDO' &&
          !athletesAbove.includes(m.atleta)
      );
      if (draws.length > 0) {
        const currentAthleteFailsInLastHeight = this.marcas.filter(
          m =>
            m.atleta === idatleta &&
            m.altura === athleteBestMark &&
            m.resultado === 'NULO'
        ).length;
        const currentAthleteFailsInPrevHeights = this.marcas.filter(
          m =>
            m.atleta === idatleta &&
            m.altura < athleteBestMark &&
            m.resultado === 'NULO'
        ).length;
        draws.forEach(d => {
          const dAthleteFailsInLastHeight = this.marcas.filter(
            m =>
              m.atleta === d.atleta &&
              m.altura === d.altura &&
              m.resultado === 'NULO'
          ).length;
          if (dAthleteFailsInLastHeight < currentAthleteFailsInLastHeight) {
            positionsAbove++;
          } else if (
            dAthleteFailsInLastHeight === currentAthleteFailsInLastHeight
          ) {
            const dAthleteFailsInPrevHeights = this.marcas.filter(
              m =>
                m.atleta === d.atleta &&
                m.altura < d.altura &&
                m.resultado === 'NULO'
            ).length;
            if (dAthleteFailsInPrevHeights < currentAthleteFailsInPrevHeights) {
              positionsAbove++;
            }
          }
        });
      }
      return positionsAbove + 1;
    } else {
      return '-';
    }
  }

  private createColumns() {
    this.columns = [
      {
        columnDef: 'atleta',
        header: 'Atleta',
        isAttempt: false,
        sticky: true,
        stickyEnd: false,
        class: '',
        marca: null,
        cell: (inscripcion: Inscripcion) =>
          `${inscripcion.atleta.nombre} ${inscripcion.atleta.apellidos}`,
        enabled: () => {
          return;
        },
      },
    ];
    this.alturas.forEach(altura => {
      this.columns.push({
        columnDef: `${altura.altura}`,
        header: `${altura.altura}m`,
        isAttempt: true,
        sticky: false,
        stickyEnd: false,
        marca: (inscripcion: Inscripcion, i: number) =>
          this.getMarca(inscripcion.atleta.idatleta, altura.altura, i),
        class: (inscripcion: Inscripcion, i: number) =>
          this.getCellClass(
            inscripcion.atleta.idatleta,
            altura.altura,
            i
          ).toLowerCase(),
        cell: (inscripcion: Inscripcion, i: number) =>
          this.getCellValue(inscripcion.atleta.idatleta, altura.altura, i),
        enabled: () => {
          return;
        },
      });
    });
    this.columns.push({
      columnDef: 'mejorMarca',
      header: 'Mejor marca',
      isAttempt: false,
      sticky: false,
      stickyEnd: true,
      class: '',
      marca: null,
      cell: (inscripcion: Inscripcion) =>
        this.getPositionCellValue(inscripcion.atleta.idatleta),
      enabled: () => {
        return;
      },
    });
    this.updateDatasource();
  }

  public isQualified(idatleta: number): boolean {
    const position = this.getPosition(idatleta);
    return position !== '-' && position <= this.prueba.num_atletas_mejora;
  }

  public isEnabled(marca: MarcaSv): boolean {
    let enabled = true;
    const atleta = marca.atleta;
    if (this.isDisqualified(atleta)) {
      const disqualifyingMark = this.disqualifyingMarks.find(
        m => m.atleta === atleta
      );
      if (
        disqualifyingMark &&
        (marca.altura > disqualifyingMark.altura ||
          (marca.altura === disqualifyingMark.altura &&
            marca.intento > disqualifyingMark.intento))
      ) {
        enabled = false;
      }
    }
    return enabled;
  }

  private existMarca(idatleta: number, altura: number, intento: number) {
    return (
      this.marcas.find(
        m =>
          m.atleta === idatleta && m.altura === altura && m.intento === intento
      ) !== undefined
    );
  }

  private getMarca(idatleta: number, altura: number, intento: number): MarcaSv {
    let marca: MarcaSv = this.marcas.find(
      m => m.atleta === idatleta && m.altura === altura && m.intento === intento
    );
    if (typeof marca === 'undefined') {
      marca = {
        atleta: idatleta,
        intento,
        resultado: null,
        idaltura: this.getIdAltura(altura),
        altura,
      };
    }
    return marca;
  }

  private createMarca(
    idatleta: number,
    altura: number,
    intento: number
  ): MarcaSv {
    return {
      atleta: idatleta,
      intento,
      resultado: null,
      idaltura: this.getIdAltura(altura),
      altura,
    };
  }

  private getIdAltura(altura: number): number {
    return this.alturas.find(a => a.altura === altura).idaltura || null;
  }

  private getCellClass(
    idatleta: number,
    altura: number,
    intento: number
  ): string {
    const marca = this.marcas.find(
      m => m.atleta === idatleta && m.altura == altura && m.intento === intento
    );
    return marca ? marca.resultado || '' : '';
  }

  private getCellValue(
    idatleta: number,
    altura: number,
    intento: number
  ): string {
    const marca = this.marcas.find(
      m => m.atleta === idatleta && m.altura === altura && m.intento === intento
    );
    if (marca) {
      return RESULTADO[marca.resultado];
    } else {
      return '';
    }
  }

  private getPositionCellValue(idatleta: number): { mark: any; pos: any } {
    return {
      mark: this.getHighestMark(idatleta),
      pos: this.getPosition(idatleta),
    };
  }

  private updateDatasource() {
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.dataSource = new MatTableDataSource(this.inscripciones);
    setTimeout(() => (this.dataSource.paginator = this.paginator));
  }

  private refreshTable() {
    this.getMarcas();
  }

  private isDisqualified(idatleta: number): boolean {
    return (
      this.disqualifyingMarks.find(m => m.atleta === idatleta) !== undefined
    );
  }

  private getAthleteName(idatleta: number): string {
    const atleta: Atleta = this.inscripciones.find(
      i => i.atleta.idatleta === idatleta
    ).atleta;
    return atleta ? `${atleta.nombre} ${atleta.apellidos}` : 'El atleta';
  }

  private hasEmptyMarksBefore(marca: MarcaSv): boolean {
    const emptyMarksBefore = this.marcas.find(
      m =>
        !this.isDisqualified(m.atleta) &&
        (m.altura < marca.altura ||
          (m.altura === marca.altura && m.intento < marca.intento)) &&
        m.resultado === null &&
        !this.marcas.find(
          marcaValidaOPasa =>
            marcaValidaOPasa.altura === m.altura &&
            marcaValidaOPasa.intento < m.intento &&
            (marcaValidaOPasa.resultado === 'PASA' ||
              marcaValidaOPasa.resultado === 'VALIDO')
        )
    );
    return emptyMarksBefore !== undefined;
  }

  private hasAlreadyPassed(marca: MarcaSv) {
    return (
      this.marcas.find(
        m =>
          m.atleta === marca.atleta &&
          m.altura === marca.altura &&
          m.intento < marca.intento &&
          m.resultado === 'VALIDO'
      ) !== undefined
    );
  }

  private hasAlreadySkipped(marca: MarcaSv) {
    return (
      this.marcas.find(
        m =>
          m.atleta === marca.atleta &&
          m.altura === marca.altura &&
          m.intento < marca.intento &&
          m.resultado === 'PASA'
      ) !== undefined
    );
  }

  public openBottomSheet(marca: MarcaSv): void {
    if (
      this.isDisqualified(marca.atleta) &&
      !this.disqualifyingSequencesMarks.includes(marca)
    ) {
      this.openSnackBar('El atleta está descalificado!', 'Cerrar');
      return;
    }
    if (this.hasEmptyMarksBefore(marca)) {
      this.openSnackBar('Hay intentos anteriores sin cubrir', 'Cerrar');
      return;
    }
    if (this.hasAlreadyPassed(marca)) {
      this.openSnackBar('El atleta ya ha superado esta altura', 'Cerrar');
      return;
    }
    if (this.hasAlreadySkipped(marca)) {
      this.openSnackBar('El atleta ha pasado en esta altura', 'Cerrar');
      return;
    }
    const marcaBackup: MarcaSv = Object.assign({}, marca);
    const bottomSheetRef = this.bottomSheet.open(ResultadoIntentoSvComponent, {
      data: {
        marca: marca,
      },
    });
    bottomSheetRef.afterDismissed().subscribe((newMarca: MarcaSv) => {
      if (newMarca) {
        if (newMarca.resultado === 'NULO') {
          let consecutives = 0;
          // Array con las marcas con resultado NULO del atleta que forman parte de una secuencia descalificante (3 nulos seguidos)
          let athleteDisqualifyingSequenceMarks: Array<MarcaSv> = [];
          const athleteMarks = this.marcas.filter(
            m => m.atleta === newMarca.atleta
          );
          this.alturas.forEach(altura => {
            for (let i = 1; i <= 3 && consecutives < 3; i++) {
              const marca = athleteMarks.find(
                m => m.altura === altura.altura && m.intento === i
              );
              if (marca.resultado === 'NULO') {
                consecutives++;
                athleteDisqualifyingSequenceMarks.push(marca);
                if (consecutives === 3) {
                  athleteDisqualifyingSequenceMarks.forEach(adsm =>
                    this.disqualifyingSequencesMarks.push(adsm)
                  );
                  // this.disqualifyingSequencesMarks.push(...athleteDisqualifyingSequenceMarks);
                  this.disqualifyingMarks.push(marca);
                }
              } else if (marca.resultado === 'VALIDO') {
                consecutives = 0;
                athleteDisqualifyingSequenceMarks = [];
              }
            }
          });
          if (consecutives === 3) {
            this.openSnackBar(
              `${this.getAthleteName(newMarca.atleta)} ha sido descalificado/a`,
              'Cerrar'
            );
            // eliminar aquí marcas posteriores a la última marca de la secuencia descalificante
            const disqualifyingMark = this.disqualifyingMarks.find(
              m => m.atleta === newMarca.atleta
            );
            const marksToDelete = athleteMarks.filter(
              m =>
                m.resultado !== null &&
                (m.altura > disqualifyingMark.altura ||
                  (m.altura === disqualifyingMark.altura &&
                    m.intento > disqualifyingMark.intento))
            );
            if (marcaBackup.resultado !== 'NULO' && marksToDelete.length > 0) {
              const dialogref = this.dialog.open(ConfirmacionPopupComponent, {
                data: {
                  title: '¿Eliminar marcas posteriores?',
                  detailedMessage:
                    'El atleta tiene marcas posteriores al "NULO" que lo descalifica, se eliminarán si confirma su descalificación.',
                },
              });
              dialogref.afterClosed().subscribe(result => {
                if (result && result === true) {
                  this.editMarca({ marca, marcaBackup, marksToDelete });
                } else {
                  Object.assign(marca, marcaBackup);
                }
              });
            } else {
              this.editMarca({ marca, marcaBackup });
            }
          } else {
            this.editMarca({ marca, marcaBackup });
          }
        } else {
          // Es VALIDO o PASA
          this.editMarca({ marca, marcaBackup, checkIfDisqualified: true });
        }
      } else {
        Object.assign(marca, marcaBackup);
      }
    });
  }

  private editMarca(params: {
    marca: MarcaSv;
    marcaBackup: MarcaSv;
    marksToDelete?: Array<MarcaSv>;
    checkIfDisqualified?: boolean;
  }) {
    this.marcaService.edit(this.idprueba, params.marca).subscribe(
      response => {
        // Object.assign(marca, newMarca);
        if (params.marksToDelete) {
          this.cleanMarks(params.marksToDelete);
        } else if (params.checkIfDisqualified) {
          if (this.disqualifyingSequencesMarks.indexOf(params.marca) > -1) {
            // Si pertenecía a una secuencia descalificante
            // El atleta deja de estar descalificado así que dejamos de anotar sus marcas descalificantes.
            this.disqualifyingSequencesMarks = this.disqualifyingSequencesMarks.filter(
              m => m.atleta !== params.marca.atleta
            );
            this.disqualifyingMarks = this.disqualifyingMarks.filter(
              m => m.atleta !== params.marca.atleta
            );
          }
        }
      },
      (error: HttpErrorResponse) => {
        Object.assign(params.marca, params.marcaBackup);
        if (error.status === 403) {
          this.openSnackBar(
            'No tienes permisos para editar las marcas',
            'cerrar'
          );
        } else {
          this.openSnackBar('Error en el servidor', 'cerrar');
        }
      }
    );
  }

  /**
   * Eliminar marcas de un atleta que pudiese haber posteriores a la marca con resultado 'NULO'
   * (3era consecutiva) que ha descalificado al atleta.
   */
  private cleanMarks(marksToDelete: Array<MarcaSv>) {
    if (marksToDelete.length > 0) {
      this.marcaService.delete(this.idprueba, marksToDelete).subscribe(
        response => {
          marksToDelete.forEach(marca => {
            marca.resultado = null;
          });
        },
        (error: HttpErrorResponse) => {
          this.openSnackBar(
            'Ha ocurrido un error eliminando marcas sobrantes.',
            'Cerrar'
          );
        }
      );
    }
  }

  public confirmFinalize() {
    const dialogref = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Finalizar prueba?',
        detailedMessage:
          'Se guardará la clasificación y se anotará la prueba como finalizada.',
      },
    });
    dialogref.afterClosed().subscribe(result => {
      if (result && result === true) {
        if (this.disqualifyingMarks.length < this.inscripciones.length) {
          this.askIfFinalizeWithAthletesStillCompeting();
        } else {
          this.finalize();
        }
      }
    });
  }

  private askIfFinalizeWithAthletesStillCompeting() {
    const dialogref = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Seguro que quieres finalizar la prueba?',
        detailedMessage:
          'Todavía hay atletas compitiendo! ' +
          'Si finalizas la prueba y después quieres editar la hoja, deberás pedirle a un administrador que la vuelva a habilitar.',
      },
    });
    dialogref.afterClosed().subscribe(result => {
      if (result && result === true) {
        if (this.disqualifyingMarks.length < this.inscripciones.length) {
          this.finalize();
        }
      }
    });
  }

  private finalize() {
    const clasificaciones = this.crearClasificacion();
    this.clasificacionService
      .editFullClassification(this.idprueba, clasificaciones)
      .subscribe(
        response => {
          this.openSnackBar('Clasificación actualizada', 'cerrar');
          this.prueba.finalizada = true;
          this.pruebaService.edit(this.idcompeticion, this.prueba).subscribe(
            (data: any) => {
              this.openSnackBar('Prueba finalizada', 'cerrar');
              this.goBack();
            },
            (error: HttpErrorResponse) => {
              if (error.status === 404) {
                this.openSnackBar('No existe la prueba a editar', 'cerrar');
              } else {
                this.openSnackBar('Error en el servidor', 'cerrar');
              }
            }
          );
        },
        (error: any) => {
          this.openSnackBar('Error actualizando la clasificación', 'cerrar');
        }
      );
  }

  public onHeightRightClick(e: MouseEvent, columnDef: string) {
    e.preventDefault();
    const alturaValue: number = parseFloat(columnDef) || null;
    const altura: Altura = this.alturas.find(a => a.altura === alturaValue);
    const alturaCopy: Altura = Object.assign({}, altura);
    const dialogRef = this.dialog.open(AlturaEditComponent, {
      data: {
        altura: alturaCopy,
        alturas: this.alturas.map(a => a.altura),
      },
    });
    dialogRef.afterClosed().subscribe((result: AlturaDialogResponse) => {
      if (result) {
        if (result.action === ACTIONS.EDIT) {
          this.editarAltura(altura, result.altura);
        } else if (result.action === ACTIONS.DELETE) {
          this.eliminarAltura(altura);
        }
      }
    });
  }

  private editarAltura(oldAltura: Altura, newAltura: Altura) {
    const dialogRef = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Modificar altura?',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result === true) {
        this.alturaService
          .edit(this.idprueba, newAltura.idaltura, newAltura.altura)
          .subscribe(
            response => {
              Object.assign(oldAltura, newAltura);
              this.getMarcas();
            },
            (error: HttpErrorResponse) => {
              this.openSnackBar(
                'Ha ocurrido un error editando la altura',
                'Cerrar'
              );
            }
          );
      }
    });
  }

  private eliminarAltura(altura: Altura) {
    const dialogRef = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Eliminar altura?',
        detailedMessage: 'Se eliminarán las marcas asociadas a la altura',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result === true) {
        this.alturaService.delete(this.idprueba, altura.idaltura).subscribe(
          response => {
            const alturaIndex = this.alturas.indexOf(altura);
            this.alturas.splice(alturaIndex, 1);
            this.marcas = this.marcas.filter(
              m => m.idaltura !== altura.idaltura
            );
            this.fillMarcas();
          },
          (error: HttpErrorResponse) => {
            this.openSnackBar(
              'Ha ocurrido un error eliminando la altura',
              'Cerrar'
            );
          }
        );
      }
    });
  }

  public onAttemptRightClick(e: MouseEvent, marca: MarcaSv) {
    e.preventDefault();
    const dialogRef = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Borrar marca?',
        detailedMessage: 'Se eliminará la marca asociada a este intento.',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result === true) {
        this.eliminarMarca(marca);
      }
    });
  }

  private eliminarMarca(marca: MarcaSv) {
    this.marcaService.delete(this.idprueba, [marca]).subscribe(
      response => {
        if (this.disqualifyingSequencesMarks.indexOf(marca) > -1) {
          // Si pertenecía a una secuencia descalificante
          this.disqualifyingSequencesMarks = this.disqualifyingSequencesMarks.filter(
            m => m.atleta !== marca.atleta
          );
          this.disqualifyingMarks = this.disqualifyingMarks.filter(
            m => m.atleta !== marca.atleta
          );
        }
        marca.resultado = null;
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar('No se ha podido eliminar la marca', 'Cerrar');
      }
    );
  }

  private crearClasificacion(): Array<Clasificacion> {
    const clasificaciones = new Array<Clasificacion>();
    this.inscripciones.forEach(i => {
      const posicion = this.getPosition(i.atleta.idatleta);
      clasificaciones.push({
        id: {
          idprueba: this.prueba.idprueba,
          atleta: i.atleta.idatleta,
        },
        posicion: posicion !== '-' ? posicion : null,
      });
    });
    return clasificaciones;
  }

  public addAlturas() {
    const bottomSheetRef = this.bottomSheet.open(AlturasAddComponent, {
      data: {
        alturas: this.alturas.map(a => a.altura),
      },
    });
    bottomSheetRef.afterDismissed().subscribe((newAlturas: Array<number>) => {
      if (newAlturas && newAlturas.length > 0) {
        this.alturaService.addMultiple(this.idprueba, newAlturas).subscribe(
          (listAlturas: Array<Altura>) => {
            listAlturas.forEach(a => this.alturas.push(a));
            this.alturas.sort((a, b) => a.altura - b.altura);
            this.fillMarcas();
          },
          (error: HttpErrorResponse) => {
            this.openSnackBar('No se han podido crear las alturas', 'Cerrar');
          }
        );
      }
    });
  }

  public openHelp() {
    this.bottomSheet.open(PruebaAyudaComponent, {
      data: {
        isSv: true,
      },
    });
  }

  private buildNombrePrueba(t: TipoPrueba): string {
    return `${DISCIPLINAS[t.disciplina]} - ${CATEGORIAS[t.categoria]}, ${
      SEXOS[t.sexo]
    }`;
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  get canEditSheet() {
    return (
      this.session.getUserid() === parseInt(this.prueba.usuario.idusuario, 10)
    );
  }

  public goBack() {
    this.router.navigate(['/competiciones', this.idcompeticion, 'pruebas']);
  }
}
