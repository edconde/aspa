import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatCheckboxChange,
  MatSnackBar,
} from '@angular/material';
import { Inscripcion } from 'src/app/shared/models/Inscripcion';
import { InscripcionService } from 'src/app/shared/services/inscripcion.service';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Atleta } from 'src/app/shared/models/Atleta';
import { Prueba } from 'src/app/shared/models/Prueba';
import { SEXOS } from 'src/app/shared/models/Sexo';

@Component({
  selector: 'aspa-inscripciones-atletas',
  templateUrl: './inscripciones-atletas.component.html',
  styleUrls: ['./inscripciones-atletas.component.scss'],
})
export class InscripcionesAtletasComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private inscripciones: Inscripcion[];
  private prueba: Prueba;
  private atletas: Atleta[];
  public loading: Boolean;
  public dataSource: MatTableDataSource<Atleta>;
  public displayedColumns: string[] = [
    'inscrito',
    'nombre',
    'apellidos',
    'licencia',
  ];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      inscripciones: Inscripcion[];
      prueba: Prueba;
      atletas: Atleta[];
    },
    private inscripcionService: InscripcionService,
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.inscripciones = data.inscripciones;
    this.prueba = data.prueba;
    this.atletas = data.atletas;
  }

  ngOnInit() {
    this.setDataSource();
  }

  private setDataSource() {
    this.dataSource = new MatTableDataSource<Atleta>(
      this.atletas.filter(a =>
        this.isCategoriaAndSexo(
          a,
          this.prueba.tipo_prueba.categoria,
          this.prueba.tipo_prueba.sexo
        )
      )
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private isCategoriaAndSexo(
    atleta: Atleta,
    categoria: string,
    sexo: string
  ): boolean {
    if (
      (SEXOS[sexo] === 'Masculino' && atleta.sexo) ||
      (SEXOS[sexo] === 'Femenino' && !atleta.sexo)
    ) {
      return false;
    }
    const anoAtleta = new Date(atleta.fechaNacimiento).getFullYear();
    const anoActual = new Date().getFullYear();
    let isCategoria = false;
    switch (categoria) {
      case 'BENJAMIN':
        isCategoria = anoAtleta >= anoActual - 10;
        break;
      case 'ALEVIN':
        isCategoria = anoAtleta >= anoActual - 12;
        break;
      case 'INFANTIL':
        isCategoria = anoAtleta >= anoActual - 14;
        break;
      case 'CADETE':
        isCategoria = anoAtleta >= anoActual - 16;
        break;
      case 'JUVENIL':
        isCategoria = anoAtleta >= anoActual - 18;
        break;
      case 'PROMESA':
        isCategoria =
          anoAtleta <= anoActual - 19 && anoAtleta >= anoActual - 23;
        break;
      case 'ABSOLUTA':
        isCategoria = true;
        break;
      case 'MASTER':
        isCategoria = anoAtleta <= anoActual - 30;
        break;
    }
    return isCategoria;
  }

  public onPresentadoChange(event: MatCheckboxChange, atleta: Atleta) {
    if (this.isInscrito(atleta) !== event.checked) {
      this.loading = true;
      if (event.checked) {
        this.inscribirAtleta(atleta);
      } else {
        this.desInscribirAtleta(atleta);
      }
    }
  }

  private inscribirAtleta(atleta: Atleta): void {
    this.inscripcionService
      .add(this.prueba.idprueba, atleta)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.changeDetector.detectChanges();
        })
      )
      .subscribe(
        response => {},
        (error: HttpErrorResponse) => {
          if (error.status === 422) {
            this.openSnackBar(
              'Atleta ya inscrito o prueba finalizada',
              'Cerrar'
            );
          } else {
            this.openSnackBar('Ha ocurrido un error en la anotación', 'Cerrar');
          }
        }
      );
  }

  private desInscribirAtleta(atleta: Atleta): void {
    const idinscripcion = this.inscripciones.find(
      i => i.atleta.idatleta === atleta.idatleta
    ).idinscripcion;
    this.inscripcionService
      .delete(this.prueba.idprueba, idinscripcion)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.changeDetector.detectChanges();
        })
      )
      .subscribe(
        response => {},
        (error: HttpErrorResponse) => {
          this.openSnackBar('Ha ocurrido un error en la anotación', 'Cerrar');
        }
      );
  }

  public isInscrito(atleta: Atleta): boolean {
    return (
      this.inscripciones.find(i => i.atleta.idatleta === atleta.idatleta) !==
      undefined
    );
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
