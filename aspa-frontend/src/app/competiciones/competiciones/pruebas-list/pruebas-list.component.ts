import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  MatSnackBar,
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatBottomSheet,
  MatPaginator,
} from '@angular/material';
import { Prueba } from '../../../shared/models/Prueba';
import { ConfirmacionPopupComponent } from 'src/app/shared/components/confirmacion-popup/confirmacion-popup.component';
import { PruebaPopupComponent } from './prueba-popup/prueba-popup.component';
import { TipoPrueba } from 'src/app/shared/models/TipoPrueba';
import { CATEGORIAS } from 'src/app/shared/models/Categoria';
import { DISCIPLINAS } from 'src/app/shared/models/Disciplina';
import { SEXOS } from 'src/app/shared/models/Sexo';
import { PruebaService } from '../../../shared/services/prueba.service';
import { CompeticionService } from '../../../shared/services/competicion.service';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { SessionService } from 'src/app/core/session/session.service';
import { InscripcionService } from '../../../shared/services/inscripcion.service';
import { Inscripcion } from '../../../shared/models/Inscripcion';
import { InscripcionesListComponent } from './inscripciones-list/inscripciones-list.component';
import { Atleta } from 'src/app/shared/models/Atleta';
import { AtletaService } from 'src/app/shared/services/atleta.service';
import { InscripcionesAtletasComponent } from './inscripciones-atletas/inscripciones-atletas.component';
import { ROLES } from 'src/app/core/session/models/enums/roles';

@Component({
  selector: 'aspa-pruebas-list',
  templateUrl: './pruebas-list.component.html',
  styleUrls: ['./pruebas-list.component.scss'],
})
export class PruebasListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public title = 'Pruebas de la competicion';
  private idcompeticion: number;
  public nombreCompeticion: string;
  private pruebas: Array<Prueba>;
  private atletas: Array<Atleta>;
  public displayedColumns = [
    'estado',
    'fecha',
    'hora_prueba',
    'tipo_prueba',
    'usuario',
    'cubrir_hoja',
    'camara_llamadas',
    'inscripciones',
    'editar',
    'eliminar',
  ];
  public dataSource: MatTableDataSource<Prueba>;
  private fechaCompeticion: Date;
  public now: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pruebaService: PruebaService,
    private session: SessionService,
    private competicionService: CompeticionService,
    private inscripcionService: InscripcionService,
    private atletaService: AtletaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {
    if (this.session.getRol() === ROLES.JUEZ) {
      this.displayedColumns = this.displayedColumns.filter(
        d => d !== 'inscripciones'
      );
    }
  }

  ngOnInit() {
    this.idcompeticion = this.route.snapshot.params['idcompeticion'];
    this.getAllInfo().subscribe(
      responseList => {
        this.fechaCompeticion = responseList[0].fecha;
        this.nombreCompeticion = responseList[0].nombre;
        this.pruebas = responseList[0].pruebas;
        this.atletas = responseList[1];
        this.updateDatasource(this.pruebas);
        setInterval(() => {
          this.now = new Date();
        }, 1000);
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/competiciones']);
      }
    );
  }

  private getAllInfo() {
    const competicion = this.competicionService.getById(this.idcompeticion);
    const atletas = this.atletaService.getAll();
    return forkJoin([competicion, atletas]);
  }

  private getPruebasCompeticion() {
    this.pruebaService.getAllByCompetition(this.idcompeticion).subscribe(
      pruebas => {
        this.updateDatasource(pruebas);
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/competiciones']);
      }
    );
  }

  public pasarLista(idprueba: number) {
    this.inscripcionService
      .getAllByPrueba(idprueba)
      .subscribe((inscripciones: Inscripcion[]) => {
        this.openInscripcionesList(inscripciones, idprueba);
      });
  }

  private openInscripcionesList(
    inscripciones: Inscripcion[],
    idprueba: number
  ) {
    this.bottomSheet.open(InscripcionesListComponent, {
      data: {
        inscripciones,
        idprueba,
      },
    });
  }

  public inscribirAtletas(prueba: Prueba) {
    this.inscripcionService
      .getAllByPrueba(prueba.idprueba)
      .subscribe((inscripciones: Inscripcion[]) => {
        this.openInscripcionesAtletas(inscripciones, prueba);
      });
  }

  private openInscripcionesAtletas(
    inscripciones: Inscripcion[],
    prueba: Prueba
  ) {
    this.bottomSheet.open(InscripcionesAtletasComponent, {
      data: {
        inscripciones,
        prueba,
        atletas: this.atletas,
      },
    });
  }

  private updateDatasource(data: Prueba[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public openCreatePrueba() {
    const dialogRef = this.dialog.open(PruebaPopupComponent, {
      width: '800px',
      data: {
        action: 'Crear',
        prueba: undefined,
        fecha: this.fechaCompeticion,
      },
    });
    dialogRef.afterClosed().subscribe(prueba => {
      if (prueba) {
        this.addPrueba(prueba);
      }
    });
  }

  private addPrueba(prueba: Prueba) {
    this.pruebaService.addToCompetition(this.idcompeticion, prueba).subscribe(
      (data: any) => {
        this.openSnackBar('Prueba añadida', 'cerrar');
        this.getPruebasCompeticion();
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar('Error en el servidor', 'cerrar');
      }
    );
  }

  public openEditPrueba(prueba: Prueba) {
    const dialogRef = this.dialog.open(PruebaPopupComponent, {
      width: '800px',
      data: {
        action: 'Editar',
        prueba: prueba,
        fecha: this.fechaCompeticion,
      },
    });
    dialogRef.afterClosed().subscribe(p => {
      if (p) {
        this.editPrueba(p);
      }
    });
  }

  private editPrueba(prueba: Prueba) {
    this.pruebaService.edit(this.idcompeticion, prueba).subscribe(
      (data: any) => {
        this.openSnackBar('Prueba editada', 'cerrar');
        this.getPruebasCompeticion();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.openSnackBar('No existe la prueba a editar', 'cerrar');
        } else {
          this.openSnackBar('Error en el servidor', 'cerrar');
        }
      }
    );
  }

  public openDialog(idprueba) {
    const dialogRef = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Eliminar prueba?',
        detailedMessage: '¡OJO! No podrás recuperar los datos de esta prueba.',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deletePrueba(idprueba);
      }
    });
  }

  private deletePrueba(idprueba) {
    this.pruebaService.delete(this.idcompeticion, idprueba).subscribe(
      (data: any) => {
        this.openSnackBar('Prueba eliminada', 'cerrar');
        this.getPruebasCompeticion();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.openSnackBar('No existe la prueba a eliminar', 'cerrar');
        } else {
          this.openSnackBar('Error en el servidor', 'cerrar');
        }
      }
    );
    this.getPruebasCompeticion();
  }

  public openHojaCampo(prueba: Prueba) {
    const disciplina = DISCIPLINAS[prueba.tipo_prueba.disciplina];
    if (
      disciplina === DISCIPLINAS.SALTO_PERTIGA ||
      disciplina === DISCIPLINAS.SALTO_ALTURA
    ) {
      this.router.navigate([prueba.idprueba, 'hoja-campo-sv'], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate([prueba.idprueba, 'hoja-campo'], {
        relativeTo: this.route,
      });
    }
  }

  public goBack() {
    this.router.navigate(['/competiciones']);
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public getDescription(t: TipoPrueba) {
    return `${CATEGORIAS[t.categoria]} ${SEXOS[t.sexo]} - ${
      DISCIPLINAS[t.disciplina]
    }`;
  }

  public sinComenzar(prueba: Prueba): boolean {
    return !prueba.finalizada && !this.after(prueba.cierre_camara);
  }

  public enCurso(prueba: Prueba): boolean {
    return !prueba.finalizada && this.after(prueba.cierre_camara);
  }

  public canEditSheet(prueba: Prueba): boolean {
    return (
      (this.session.getRol() === ROLES.ADMIN &&
        this.after(prueba.cierre_camara)) ||
      (this.session.getUserid() == parseInt(prueba.usuario.idusuario, 10) &&
        this.enCurso(prueba))
    );
  }

  public isAdmin(): boolean {
    return this.session.getRol() === ROLES.ADMIN;
  }

  public after(apertura: string | Date) {
    return this.now.getTime() > new Date(apertura).getTime();
  }

  public getTimeLeft(apertura: string) {
    const duration = moment.duration(moment(this.now).diff(apertura));
    const hours =
      duration.get('hours') < 0 ? `${Math.abs(duration.get('hours'))}h ` : '';
    const mins =
      duration.get('minutes') < 0
        ? `${Math.abs(duration.get('minutes'))}min `
        : '';
    const secs =
      duration.get('seconds') < 0
        ? `${Math.abs(duration.get('seconds'))}s `
        : '';
    return `${hours}${mins}${secs}`;
  }
}
