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
import { Usuario } from '../../../shared/models/usuario.model';
import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatSnackBar,
  MatPaginator,
} from '@angular/material';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { ConfirmacionPopupComponent } from 'src/app/shared/components/confirmacion-popup/confirmacion-popup.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'aspa-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss'],
})
export class UsuariosListComponent implements OnInit, OnChanges {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() usuarios: Array<Usuario>;
  public displayedColumns = [
    'nombre',
    'apellidos',
    'email',
    'categoria',
    'editar',
    'eliminar',
  ];
  public dataSource: MatTableDataSource<Usuario>;
  @Output() usuarioDeleted = new EventEmitter<any>();

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public goToUserCreation() {
    this.router.navigate(['usuarios/crear']);
  }

  public goToUserEdition(idusuario) {
    this.router.navigate(['usuarios/editar', idusuario]);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(idusuario) {
    const dialogRef = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Eliminar usuario?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteUsuario(idusuario);
      } else {
        dialogRef.close();
      }
    });
  }

  public deleteUsuario(idusuario) {
    this.usuarioService.delete(idusuario).subscribe(
      response => {
        this.usuarioDeleted.emit();
        this.openSnackBar('Usuario eliminado', 'cerrar');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.openSnackBar('No existe el usuario a eliminar', 'cerrar');
        } else {
          this.openSnackBar('Ha ocurrido un error', 'cerrar');
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.usuarios) {
      this.ngOnInit();
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
