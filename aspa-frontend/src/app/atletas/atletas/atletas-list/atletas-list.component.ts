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
import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatSnackBar,
  MatPaginator,
} from '@angular/material';
import { Router } from '@angular/router';
import { AtletaService } from '../../../shared/services/atleta.service';
import { ConfirmacionPopupComponent } from 'src/app/shared/components/confirmacion-popup/confirmacion-popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Atleta } from '../../../shared/models/Atleta';
import { Club } from 'src/app/shared/models/Club';
import { ClubService } from 'src/app/shared/services/club.service';

@Component({
  selector: 'aspa-atletas-list',
  templateUrl: './atletas-list.component.html',
  styleUrls: ['./atletas-list.component.scss'],
})
export class AtletasListComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() atletas: Array<Atleta>;
  private clubes: Club[];
  public displayedColumns = [
    'licencia',
    'nombre',
    'apellidos',
    'fecha_nacimiento',
    'dni',
    'telefono',
    'club',
    'editar',
    'eliminar',
  ];
  public dataSource: MatTableDataSource<Atleta>;
  @Output() atletaDeleted = new EventEmitter<any>();

  constructor(
    private router: Router,
    private atletaService: AtletaService,
    private clubService: ClubService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.atletas);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getClubes();
  }

  private getClubes() {
    this.clubService.getAll().subscribe(
      clubes => {
        this.clubes = clubes;
      },
      (error: HttpErrorResponse) => {
        // no lo consideramos error
      }
    );
  }

  public getClubName(idclub: number): string {
    if (!this.clubes) {
      return;
    }
    const club = this.clubes.find(c => c.idclub == idclub);
    return club ? club.nombre : '-';
  }

  public goToUserCreation() {
    this.router.navigate(['atletas/crear']);
  }

  public goToUserEdition(idatleta) {
    this.router.navigate(['atletas/editar', idatleta]);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(idatleta) {
    const dialogRef = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Eliminar atleta?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteAtleta(idatleta);
      } else {
        dialogRef.close();
      }
    });
  }

  private deleteAtleta(idatleta) {
    this.atletaService.delete(idatleta).subscribe(
      response => {
        this.atletaDeleted.emit();
        this.openSnackBar('Atleta eliminado', 'cerrar');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.openSnackBar('No existe el atleta a eliminar', 'cerrar');
        } else {
          this.openSnackBar('Ha ocurrido un error', 'cerrar');
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.atletas) {
      this.ngOnInit();
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
