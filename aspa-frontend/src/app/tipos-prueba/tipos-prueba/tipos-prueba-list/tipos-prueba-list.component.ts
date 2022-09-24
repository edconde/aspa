import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  Output,
} from '@angular/core';
import { TipoPrueba } from '../../../shared/models/TipoPrueba';
import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatPaginator,
  MatSnackBar,
} from '@angular/material';
import { TipoPruebaService } from '../../../shared/services/tipo-prueba.service';
import { ConfirmacionPopupComponent } from 'src/app/shared/components/confirmacion-popup/confirmacion-popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoPruebaPopupComponent } from './tipo-prueba-popup/tipo-prueba-popup.component';
import { DISCIPLINAS } from '../../../shared/models/Disciplina';
import { CATEGORIAS } from '../../../shared/models/Categoria';
import { SEXOS } from '../../../shared/models/Sexo';
import { Router } from '@angular/router';

@Component({
  selector: 'aspa-tipos-prueba-list',
  templateUrl: './tipos-prueba-list.component.html',
  styleUrls: ['./tipos-prueba-list.component.scss'],
})
export class TiposPruebaListComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() tiposPrueba: Array<TipoPrueba>;
  public displayedColumns = ['disciplina', 'categoria', 'sexo', 'eliminar'];
  public dataSource: MatTableDataSource<TipoPrueba>;
  @Output() tipoPruebaDeletedOrCreated = new EventEmitter<any>();
  private disciplinas = DISCIPLINAS;
  private categorias = CATEGORIAS;
  private sexos = SEXOS;

  constructor(
    private tipoPruebaService: TipoPruebaService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tiposPrueba);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openForm() {
    const dialogRef = this.dialog.open(TipoPruebaPopupComponent, {
      data: {
        title: 'Nuevo tipo de prueba:',
      },
    });

    dialogRef.afterClosed().subscribe(created => {
      if (created === true) {
        this.tipoPruebaDeletedOrCreated.emit();
        this.openSnackBar('Tipo de prueba creado', 'cerrar');
      }
    });
  }

  public openDialog(idtipoprueba) {
    const dialogRef = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Eliminar tipo de prueba?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteTipoPrueba(idtipoprueba);
      } else {
        dialogRef.close();
      }
    });
  }

  private deleteTipoPrueba(idtipoprueba) {
    this.tipoPruebaService.delete(idtipoprueba).subscribe(
      response => {
        this.tipoPruebaDeletedOrCreated.emit();
        this.openSnackBar('Tipo de prueba eliminado', 'cerrar');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 422) {
          this.openSnackBar('Hay pruebas con ese tipo de concurso!', 'cerrar');
        } else if (error.status === 404) {
          this.openSnackBar(
            'No existe el tipo de concurso a eliminar',
            'cerrar'
          );
        } else {
          this.openSnackBar('Ha ocurrido un error', 'cerrar');
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tiposPrueba) {
      this.ngOnInit();
    }
  }

  public getDisciplinaLabel(disciplina) {
    return this.disciplinas[disciplina];
  }

  public getCategoriaLabel(categoria) {
    return this.categorias[categoria];
  }

  public getSexoLabel(sexo) {
    return this.sexos[sexo];
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
