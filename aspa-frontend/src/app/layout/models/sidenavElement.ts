import { ROLES } from 'src/app/core/session/models/enums/roles';

export class SidenavElement {
  name: string;
  route: string;
  icon: string;
  roles: ROLES[];

  constructor(name: string, route: string, icon: string, roles: any) {
    this.name = name;
    this.route = route;
    this.icon = icon;
    this.roles = roles;
  }
}
