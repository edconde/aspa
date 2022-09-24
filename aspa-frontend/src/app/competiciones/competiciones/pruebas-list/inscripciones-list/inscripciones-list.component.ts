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

@Component({
  selector: 'app-inscripciones-list',
  templateUrl: './inscripciones-list.component.html',
  styleUrls: ['./inscripciones-list.component.scss'],
})
export class InscripcionesListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private inscripciones: Inscripcion[];
  private idprueba: number;
  public loading: Boolean;
  public dataSource: MatTableDataSource<Inscripcion>;
  public displayedColumns: string[] = [
    'presentado',
    'dorsal',
    'atleta',
    'licencia',
  ];
  private sortFunction = (item, property) => {
    switch (property) {
      case 'atleta':
        return this.getNombreCompleto(item.atleta);
      default:
        return item[property];
    }
  };

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { inscripciones: Inscripcion[]; idprueba: number },
    private inscripcionService: InscripcionService,
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.inscripciones = data.inscripciones;
    this.idprueba = data.idprueba;
  }

  ngOnInit() {
    this.setDataSource();
  }

  private setDataSource() {
    this.dataSource = new MatTableDataSource<Inscripcion>(this.inscripciones);
    this.dataSource.sortingDataAccessor = this.sortFunction;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public onPresentadoChange(
    event: MatCheckboxChange,
    inscripcion: Inscripcion
  ) {
    if (inscripcion.presentado !== event.checked) {
      this.loading = true;
      inscripcion.presentado = event.checked;
      const ctrl = this;
      this.inscripcionService
        .edit(this.idprueba, inscripcion)
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
  }

  public getNombreCompleto(atleta: Atleta) {
    const nombre = atleta.nombre ? `${atleta.nombre} ` : '';
    const apellidos = atleta.apellidos || '';
    return `${nombre}${apellidos}`;
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
