import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SidenavElement } from '../../models/sidenavElement';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/session/session.service';
import { ROLES } from 'src/app/core/session/models/enums/roles';

@Component({
  selector: 'aspa-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() isMobile: boolean;
  @Output() clickSidenavItem = new EventEmitter<any>();

  username: string;
  public sidenavElements: Array<SidenavElement> = [];

  constructor(
    private session: SessionService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    // lista de elementos del sidenav
    this.sidenavElements = [
      new SidenavElement('Competiciones', '/competiciones', 'flag', [
        ROLES.ADMIN,
        ROLES.JUEZ,
      ]),
      new SidenavElement('Clubes', '/clubes', 'domain', [ROLES.ADMIN]),
      new SidenavElement('Atletas', '/atletas', 'directions_run', [
        ROLES.ADMIN,
      ]),
      new SidenavElement('Usuarios', '/usuarios', 'supervisor_account', [
        ROLES.ADMIN,
      ]),
      new SidenavElement('Tipos de prueba', '/tipos-prueba', 'fitness_center', [
        ROLES.ADMIN,
      ]),
    ];

    this.session.getUsernameAsObservable().subscribe(
      username => {
        this.username = username;
      },
      (error: any) => {
        this.username = null;
      }
    );
  }

  public click() {
    this.clickSidenavItem.emit();
  }

  public isAllowed(roles: ROLES[]) {
    return roles.length === 0 || roles.indexOf(this.session.getRol()) > -1;
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public logout() {
    this.session.close();
    this.openSnackBar('Sesión cerrada', 'cerrar');
    this.router.navigate(['/login']);
  }
}
