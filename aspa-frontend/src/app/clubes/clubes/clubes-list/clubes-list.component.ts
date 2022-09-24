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
import { Club } from '../../../shared/models/Club';
import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatPaginator,
  MatSnackBar,
} from '@angular/material';
import { ClubService } from '../../../shared/services/club.service';
import { ConfirmacionPopupComponent } from 'src/app/shared/components/confirmacion-popup/confirmacion-popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ClubPopupComponent } from './club-popup/club-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'aspa-clubes-list',
  templateUrl: './clubes-list.component.html',
  styleUrls: ['./clubes-list.component.scss'],
})
export class ClubesListComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() clubes: Array<Club>;
  public displayedColumns = [
    'licencia',
    'nombre',
    'direccion',
    'email',
    'telefono',
    'editar',
    'eliminar',
  ];
  dataSource: MatTableDataSource<Club>;
  @Output() clubesChanged = new EventEmitter<any>();

  constructor(
    private clubService: ClubService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.clubes);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openCreateClub() {
    const dialogRef = this.dialog.open(ClubPopupComponent, {
      width: '800px',
      data: {
        action: 'Crear',
        prueba: undefined,
      },
    });
    dialogRef.afterClosed().subscribe(club => {
      if (club) {
        this.addClub(club);
      }
    });
  }

  private addClub(club: Club) {
    this.clubService.add(club).subscribe(
      (data: any) => {
        this.openSnackBar('Club creado', 'cerrar');
        this.clubesChanged.emit();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.openSnackBar('Ya existe ese club', 'cerrar');
        } else {
          this.openSnackBar('Error en el servidor', 'cerrar');
        }
      }
    );
  }

  public openEditClub(club: Club) {
    const dialogRef = this.dialog.open(ClubPopupComponent, {
      width: '800px',
      data: {
        action: 'Editar',
        club: club,
      },
    });
    dialogRef.afterClosed().subscribe(c => {
      if (c) {
        this.editClub(c);
      }
    });
  }

  private editClub(club: Club) {
    this.clubService.edit(club).subscribe(
      (data: any) => {
        this.openSnackBar('Club editado', 'cerrar');
        this.clubesChanged.emit();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.openSnackBar('No existe el club a editar', 'cerrar');
        } else {
          this.openSnackBar('Error en el servidor', 'cerrar');
        }
      }
    );
  }

  public openDialog(idclub) {
    const dialogRef = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Eliminar club?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteClub(idclub);
      } else {
        dialogRef.close();
      }
    });
  }

  private deleteClub(idclub) {
    this.clubService.delete(idclub).subscribe(
      response => {
        this.clubesChanged.emit();
        this.openSnackBar('Club eliminado', 'cerrar');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.openSnackBar('No existe el club a eliminar', 'cerrar');
        } else {
          this.openSnackBar('Ha ocurrido un error', 'cerrar');
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.clubes) {
      this.ngOnInit();
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
