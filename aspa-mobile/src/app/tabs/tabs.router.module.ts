import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'fga',
    component: TabsPage,
    children: [
      {
        path: 'resultados',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule),
          },
        ],
      },
      {
        path: 'directo',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule),
          },
        ],
      },
      {
        path: 'atletas',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/fga/resultados',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/fga/resultados',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/fga/resultados' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
