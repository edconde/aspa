import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { UserInfoComponent } from './layout/user-info/user-info.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';

@NgModule({
  imports: [LayoutRoutingModule, SharedModule],
  declarations: [
    PageNotFoundComponent,
    LayoutComponent,
    ToolbarComponent,
    SidenavComponent,
    UserInfoComponent,
    BreadcrumbComponent,
  ],
  providers: [],
  entryComponents: [],
})
export class LayoutModule {}
