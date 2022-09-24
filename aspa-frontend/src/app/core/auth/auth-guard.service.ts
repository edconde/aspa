import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanLoad,
  CanActivateChild,
} from '@angular/router';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService
  implements CanActivate, CanLoad, CanActivateChild {
  constructor(public session: SessionService, public router: Router) {}
  canActivate(): boolean {
    return this.canLoad();
  }

  // Accedemos a las rutas hijas de layout si estamos logeados
  canActivateChild(): boolean {
    return this.canLoad();
  }

  // Cargamos layout si estamos logeados
  canLoad(): boolean {
    if (!this.session.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
