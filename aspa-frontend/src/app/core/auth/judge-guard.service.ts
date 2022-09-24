import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild,
  CanLoad,
} from '@angular/router';
import decode from 'jwt-decode';
import { SessionService } from '../session/session.service';
import { ROLES } from '../session/models/enums/roles';
@Injectable({
  providedIn: 'root',
})
export class JudgeGuardService
  implements CanActivate, CanLoad, CanActivateChild {
  expectedRoles = [ROLES.ADMIN, ROLES.JUEZ];
  constructor(public router: Router, private session: SessionService) {}
  canActivate(): boolean {
    const token = this.session.getToken();
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      !this.session.isAuthenticated() ||
      !(this.expectedRoles.indexOf(tokenPayload.rol) > -1)
    ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    const token = this.session.getToken();
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      !this.session.isAuthenticated() ||
      !(this.expectedRoles.indexOf(tokenPayload.rol) > -1)
    ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    const token = this.session.getToken();
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      !this.session.isAuthenticated() ||
      !(this.expectedRoles.indexOf(tokenPayload.rol) > -1)
    ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
