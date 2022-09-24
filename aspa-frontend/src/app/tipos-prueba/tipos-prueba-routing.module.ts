import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiposPruebaComponent } from './tipos-prueba/tipos-prueba.component';

const routes: Routes = [
    {
        path: '',
        component: TiposPruebaComponent,
        data: {
            breadcrumb: '',
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DisciplinasRoutingModule { }
