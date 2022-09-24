import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { AuthGuardService as AuthGuard } from './core/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: '',
    loadChildren: './layout/layout.module#LayoutModule',
    data: {
      breadcrumb: '',
    },
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true /*, enableTracing: true*/ }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
