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
import { Competicion } from '../../../shared/models/Competicion';
import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatSnackBar,
  MatPaginator,
} from '@angular/material';
import { Router } from '@angular/router';
import { CompeticionService } from '../../../shared/services/competicion.service';
import { ConfirmacionPopupComponent } from 'src/app/shared/components/confirmacion-popup/confirmacion-popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CompeticionPopupComponent } from './competicion-popup/competicion-popup.component';
import { ROLES } from 'src/app/core/session/models/enums/roles';
import { SessionService } from 'src/app/core/session/session.service';

@Component({
  selector: 'aspa-competiciones-list',
  templateUrl: './competiciones-list.component.html',
  styleUrls: ['./competiciones-list.component.scss'],
})
export class CompeticionesListComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() competiciones: Array<Competicion>;
  displayedColumns = [
    'nombre',
    'fecha',
    'lugar',
    'editar',
    'pruebas',
    'eliminar',
  ];
  dataSource: MatTableDataSource<Competicion>;
  @Output() competicionesUpdated = new EventEmitter<any>();

  constructor(
    private router: Router,
    private competicionService: CompeticionService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.competiciones);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public openCreate() {
    const dialogRef = this.dialog.open(CompeticionPopupComponent, {
      data: {
        action: 'Crear',
        competicion: undefined,
      },
    });
    dialogRef.afterClosed().subscribe(created => {
      if (created === true) {
        this.competicionesUpdated.emit();
        this.openSnackBar('Competición creada', 'cerrar');
      }
    });
  }

  public openEdit(competicion: Competicion) {
    const dialogRef = this.dialog.open(CompeticionPopupComponent, {
      data: {
        action: 'Editar',
        competicion: competicion,
      },
    });
    dialogRef.afterClosed().subscribe(edited => {
      if (edited === true) {
        this.competicionesUpdated.emit();
        this.openSnackBar('Competición editada', 'cerrar');
      }
    });
  }

  public verPruebasCompeticion(id: number) {
    this.router.navigate(['competiciones/', id, 'pruebas']);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Eliminar competicion?',
        detailedMessage:
          'OJO! Sólo será eliminada si no tiene pruebas asociadas',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCompeticion(id);
      } else {
        dialogRef.close();
      }
    });
  }

  private deleteCompeticion(id: number) {
    this.competicionService.delete(id).subscribe(
      response => {
        this.competicionesUpdated.emit();
        this.openSnackBar('Competicion eliminada', 'cerrar');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 422) {
          this.openSnackBar('La competición tiene pruebas!', 'cerrar');
        } else if (error.status === 404) {
          this.openSnackBar('No existe la competicion a eliminar', 'cerrar');
        } else {
          this.openSnackBar('Ha ocurrido un error', 'cerrar');
        }
      }
    );
  }

  public isAdmin(): boolean {
    return this.session.getRol() === ROLES.ADMIN;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.competiciones) {
      this.ngOnInit();
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
