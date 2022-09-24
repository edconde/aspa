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
import { MarcaNsService } from 'src/app/shared/services/marca-ns.service';
import { MarcaNs } from 'src/app/shared/models/Marca';
import { RESULTADO } from 'src/app/shared/models/enums/Resultado';
import { ResultadoIntentoNoSvComponent } from './resultado-intento-no-sv/resultado-intento-no-sv.component';
import { Column } from 'src/app/shared/models/helpers/Column';
import { HttpErrorResponse } from '@angular/common/http';
import { Clasificacion } from 'src/app/shared/models/Clasificacion';
import { SessionService } from 'src/app/core/session/session.service';
import { ClasificacionService } from 'src/app/shared/services/clasificacion.service';
import { ConfirmacionPopupComponent } from 'src/app/shared/components/confirmacion-popup/confirmacion-popup.component';
import { PruebaAyudaComponent } from '../prueba-ayuda/prueba-ayuda.component';
import { DISCIPLINAS } from 'src/app/shared/models/Disciplina';
import { TipoPrueba } from 'src/app/shared/models/TipoPrueba';
import { CATEGORIAS } from 'src/app/shared/models/Categoria';
import { SEXOS } from 'src/app/shared/models/Sexo';

export interface MejorMarca {
  atleta: number;
  marca: number;
}

@Component({
  selector: 'aspa-hoja-de-campo-no-sv',
  templateUrl: './hoja-de-campo-no-sv.component.html',
  styleUrls: ['./hoja-de-campo-no-sv.component.scss'],
})
export class HojaDeCampoNoSvComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Inscripcion>;
  private idcompeticion: number;
  private idprueba: number;
  private prueba: Prueba;
  public nombrePrueba: string;
  private inscripciones: Array<Inscripcion>;
  private marcas: Array<MarcaNs>;
  private columns: Array<Column>;
  public displayedColumns: Array<string>;
  private mejoresMarcas: Array<MejorMarca>;

  constructor(
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private session: SessionService,
    private pruebaService: PruebaService,
    private inscripcionService: InscripcionService,
    private clasificacionService: ClasificacionService,
    private marcaService: MarcaNsService,
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
    forkJoin([prueba, inscripciones]).subscribe(responseList => {
      this.prueba = responseList[0];
      this.nombrePrueba = this.buildNombrePrueba(responseList[0].tipo_prueba);
      this.inscripciones = responseList[1];
      this.getMarcas();
    });
  }

  private getMarcas() {
    this.marcaService
      .getAllByPrueba(this.prueba.idprueba)
      .subscribe((marcas: Array<MarcaNs>) => {
        this.marcas = marcas; // Estas son las marcas que existen en bd
        this.fillMarcas(); // Añadimos marcas que aun no existen en bd en los intentos que no tienen marca
        this.createColumns();
      });
  }

  private fillMarcas() {
    this.mejoresMarcas = [];
    this.inscripciones.forEach(inscripcion => {
      const atleta = inscripcion.atleta.idatleta;
      for (let i = 1; i <= this.prueba.num_intentos; i++) {
        if (!this.existMarca(atleta, i)) {
          this.marcas.push(this.createMarca(atleta, i));
        }
      }
      for (let i = 1; i <= this.prueba.num_intentos_mejora; i++) {
        if (!this.existMarca(atleta, i + this.prueba.num_intentos)) {
          this.marcas.push(
            this.createMarca(atleta, i + this.prueba.num_intentos)
          );
        }
      }
      this.mejoresMarcas.push({
        atleta: atleta,
        marca: this.calculateHighestMark(atleta),
      });
    });
  }

  private calculateHighestMark(atleta: number): number {
    const highestMark = Math.max.apply(
      Math,
      this.marcas
        .filter(m => m.atleta === atleta)
        .map(function(m) {
          return m.marca ? parseFloat(m.marca) : null;
        })
    );
    return highestMark > 0 ? highestMark : null;
  }

  private getHighestMark(atleta: number): number {
    const highestMark = this.mejoresMarcas.find(m => m.atleta === atleta).marca;
    return highestMark > 0 ? highestMark : null;
  }

  private getPosition(atleta: number) {
    const athleteBestMark: number = this.mejoresMarcas.find(
      m => m.atleta === atleta
    ).marca;
    if (athleteBestMark > 0) {
      let positionsAbove: number = this.mejoresMarcas.filter(
        m => m.marca > athleteBestMark
      ).length;
      const draws = this.mejoresMarcas.filter(
        m => m.marca === athleteBestMark && m.atleta !== atleta
      );
      if (draws.length > 0) {
        draws.forEach(d => {
          let currentAthleteHighestMark = athleteBestMark;
          let dAthleteHighestMark = athleteBestMark;
          const currentAthleteMarks = this.marcas
            .filter(m => m.atleta === atleta)
            .map(m => (m.marca ? parseFloat(m.marca) : null));
          const dAthleteMarks = this.marcas
            .filter(m => m.atleta === d.atleta)
            .map(m => (m.marca ? parseFloat(m.marca) : null));
          while (
            currentAthleteHighestMark &&
            currentAthleteHighestMark === dAthleteHighestMark
          ) {
            currentAthleteMarks.splice(
              currentAthleteMarks.indexOf(currentAthleteHighestMark),
              1
            ); // remove max from the array
            dAthleteMarks.splice(dAthleteMarks.indexOf(dAthleteHighestMark), 1); // remove max from the array
            currentAthleteHighestMark = Math.max.apply(
              Math,
              currentAthleteMarks
            ); // get the max of the array
            dAthleteHighestMark = Math.max.apply(Math, dAthleteMarks); // get the max of the array
          }
          if (
            dAthleteHighestMark &&
            (!currentAthleteHighestMark ||
              dAthleteHighestMark > currentAthleteHighestMark)
          ) {
            positionsAbove++;
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
        enabled: (inscripcion: Inscripcion) => true,
      },
    ];
    for (let i = 1; i <= this.prueba.num_intentos; i++) {
      this.columns.push({
        columnDef: `intento${i}`,
        header: `Intento ${i}`,
        isAttempt: true,
        sticky: false,
        stickyEnd: false,
        marca: (inscripcion: Inscripcion) =>
          this.getMarca(inscripcion.atleta.idatleta, i),
        class: (inscripcion: Inscripcion) =>
          this.getCellClass(inscripcion.atleta.idatleta, i).toLowerCase(),
        cell: (inscripcion: Inscripcion) =>
          this.getCellValue(inscripcion.atleta.idatleta, i),
        enabled: (inscripcion: Inscripcion) => true,
      });
    }
    for (let i = 1; i <= this.prueba.num_intentos_mejora; i++) {
      this.columns.push({
        columnDef: `intentoMejora${i}`,
        header: `Intento mejora ${i}`,
        isAttempt: true,
        sticky: false,
        stickyEnd: false,
        marca: (inscripcion: Inscripcion) =>
          this.getMarca(
            inscripcion.atleta.idatleta,
            i + this.prueba.num_intentos
          ),
        class: (inscripcion: Inscripcion) =>
          this.getCellClass(
            inscripcion.atleta.idatleta,
            i + this.prueba.num_intentos
          ).toLowerCase(),
        cell: (inscripcion: Inscripcion) =>
          this.getCellValue(
            inscripcion.atleta.idatleta,
            i + this.prueba.num_intentos
          ),
        enabled: (inscripcion: Inscripcion) =>
          this.isQualified(inscripcion.atleta.idatleta),
      });
    }
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
      enabled: (inscripcion: Inscripcion) => true,
    });
    this.updateDatasource();
  }

  private isQualified(atleta: number): boolean {
    const position = this.getPosition(atleta);
    return position !== '-' && position <= this.prueba.num_atletas_mejora;
  }

  private existMarca(atleta: number, intento: number) {
    return (
      this.marcas.find(m => m.atleta === atleta && m.intento === intento) !==
      undefined
    );
  }

  private getMarca(atleta: number, intento: number): MarcaNs {
    let marca: MarcaNs = this.marcas.find(
      m => m.atleta === atleta && m.intento === intento
    );
    if (typeof marca === 'undefined') {
      marca = {
        atleta,
        intento,
        resultado: null,
        marca: null,
      };
    }
    return marca;
  }

  private createMarca(idatleta: number, intento: number): MarcaNs {
    return {
      atleta: idatleta,
      intento: intento,
      resultado: null,
      marca: null,
    };
  }

  private getCellClass(idatleta: number, intento: number): string {
    const marca = this.marcas.find(
      m => m.atleta === idatleta && m.intento === intento
    );
    return marca ? marca.resultado || '' : '';
  }

  private getCellValue(idatleta: number, intento: number): string {
    const marca = this.marcas.find(
      m => m.atleta === idatleta && m.intento === intento
    );
    if (marca) {
      if (marca.resultado === 'VALIDO') {
        return marca.marca ? `${marca.marca}m` : '';
      } else {
        return RESULTADO[marca.resultado];
      }
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

  private hasEmptyMarksBefore(marca: MarcaNs): boolean {
    // Miramos si hay algún intento (no de mejora) sin marca
    if (marca.intento <= this.prueba.num_intentos + 1) {
      const emptyMarksBefore = this.marcas.find(
        m =>
          m.intento < marca.intento && m.resultado === null && m.marca === null
      );
      return emptyMarksBefore !== undefined;
    } else {
      // Miramos si hay algún intento de mejora sin marca
      const emptyMarksBefore = this.marcas.find(
        m =>
          (m.intento <= this.prueba.num_intentos ||
            (m.intento < marca.intento &&
              this.getPosition(m.atleta) <= this.prueba.num_atletas_mejora)) &&
          m.resultado === null &&
          m.marca === null
      );
      return emptyMarksBefore !== undefined;
    }
  }

  public openBottomSheet(marca: MarcaNs): void {
    if (this.hasEmptyMarksBefore(marca)) {
      this.openSnackBar('Hay intentos anteriores sin cubrir', 'Cerrar');
      return;
    }
    const marcaBackup: MarcaNs = Object.assign({}, marca);
    const bottomSheetRef = this.bottomSheet.open(
      ResultadoIntentoNoSvComponent,
      {
        data: {
          marca: marca,
        },
      }
    );
    bottomSheetRef.afterDismissed().subscribe((newMarca: MarcaNs) => {
      if (newMarca) {
        this.marcaService.edit(this.idprueba, newMarca).subscribe(
          response => {
            Object.assign(marca, newMarca);
            const currentAthleteHighestMark = this.mejoresMarcas.find(
              m => m.atleta === marca.atleta
            );
            currentAthleteHighestMark.marca = this.calculateHighestMark(
              marca.atleta
            );
          },
          (error: HttpErrorResponse) => {
            Object.assign(marca, marcaBackup);
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
      } else {
        Object.assign(marca, marcaBackup);
      }
    });
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
        const emptyAttempts = this.getEmptyAttempts();
        if (emptyAttempts.length > 0) {
          this.askIfMarkAsSkipped(emptyAttempts);
        } else {
          this.cleanMarks();
        }
      }
    });
  }

  private getEmptyAttempts(): Array<MarcaNs> {
    const emptyAttempts: Array<MarcaNs> = [];
    this.inscripciones.forEach(inscripcion => {
      const atleta = inscripcion.atleta.idatleta;
      let numberOfAttempts: number = this.prueba.num_intentos;
      if (this.isQualified(atleta)) {
        numberOfAttempts += this.prueba.num_intentos_mejora;
      }
      const athleteEmptyAttempts: Array<MarcaNs> = this.marcas.filter(
        m =>
          m.atleta === atleta &&
          m.intento <= numberOfAttempts &&
          m.resultado === null
      );
      athleteEmptyAttempts.forEach(a => emptyAttempts.push(a));
      // emptyAttempts.push(...athleteEmptyAttempts);
    });
    return emptyAttempts;
  }

  private askIfMarkAsSkipped(emptyAttempts: Array<MarcaNs>) {
    const dialogref = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Rellenar intentos sin resultado?',
        detailedMessage:
          'Los intentos sin resultado se marcarán con un "PASA". Haz click en "NO" si quieres cubrirlos por tí mismo.',
      },
    });
    dialogref.afterClosed().subscribe(result => {
      if (result && result === true) {
        this.markEmptyAttempsAsSkipped(emptyAttempts);
      }
    });
  }

  private markEmptyAttempsAsSkipped(emptyAttempts: Array<MarcaNs>) {
    emptyAttempts.forEach(attempt => {
      attempt.resultado = 'PASA';
    });
    this.marcaService.createSkipped(this.idprueba, emptyAttempts).subscribe(
      response => {
        this.cleanMarks();
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Ha ocurrido un error al rellenar los intentos vacíos',
          'Cerrar'
        );
      }
    );
  }

  /**
   * Eliminar marcas que se introdujeron (por error del usuario) en intentos de mejora para un atleta que no se clasifica para la mejora.
   */
  private cleanMarks() {
    const notQualifiedAthletes: Array<number> = this.inscripciones
      .filter(i => !this.isQualified(i.atleta.idatleta))
      .map(i => i.atleta.idatleta);
    const marksToDelete: Array<MarcaNs> = this.marcas.filter(
      m =>
        notQualifiedAthletes.includes(m.atleta) &&
        m.intento > this.prueba.num_intentos &&
        m.resultado !== null
    );
    if (marksToDelete.length > 0) {
      this.marcaService.delete(this.idprueba, marksToDelete).subscribe(
        response => {
          this.saveClassification();
        },
        (error: HttpErrorResponse) => {
          this.openSnackBar(
            'Ha ocurrido un error eliminando marcas sobrantes.',
            'Cerrar'
          );
        }
      );
    } else {
      this.saveClassification();
    }
  }

  private saveClassification() {
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

  public onRightClick(e: MouseEvent, marca: MarcaNs) {
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

  private eliminarMarca(marca: MarcaNs) {
    this.marcaService.delete(this.idprueba, [marca]).subscribe(
      response => {
        marca.marca = null;
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

  public openHelp() {
    this.bottomSheet.open(PruebaAyudaComponent, {
      data: {
        isSv: false,
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
