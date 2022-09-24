import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoPrueba } from '../../shared/models/TipoPrueba';
import { TipoPruebaService } from '../../shared/services/tipo-prueba.service';

@Component({
  selector: 'aspa-tipos-prueba',
  templateUrl: './tipos-prueba.component.html',
  styleUrls: ['./tipos-prueba.component.scss'],
})
export class TiposPruebaComponent implements OnInit {
  tiposPrueba: Array<TipoPrueba>;
  error = false;
  errorMessage = 'No se han podido cargar los tipos de prueba';
  loadingMessage = 'Cargando tipos de prueba';

  constructor(private tipoPruebaService: TipoPruebaService) {}

  ngOnInit() {
    this.getTiposPrueba();
  }

  getTiposPrueba() {
    this.tipoPruebaService.getAll().subscribe(
      tiposPrueba => {
        this.tiposPrueba = tiposPrueba;
      },
      (error: HttpErrorResponse) => {
        this.error = true;
      }
    );
  }

  onTipoPruebaDeletedOrCreated() {
    this.getTiposPrueba();
  }

  onRetry() {
    this.error = false;
    this.ngOnInit();
  }
}
