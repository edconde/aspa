import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CompeticionService } from '../../shared/services/competicion.service';
import { Competicion } from '../../shared/models/Competicion';

@Component({
  selector: 'aspa-competiciones',
  templateUrl: './competiciones.component.html',
  styleUrls: ['./competiciones.component.scss'],
})
export class CompeticionesComponent implements OnInit {
  public competiciones: Array<Competicion>;
  public error = false;
  public errorMessage = 'No se han podido cargar las competiciones';
  public loadingMessage = 'Cargando competiciones';

  constructor(private competicionService: CompeticionService) {}

  ngOnInit() {
    this.getCompeticiones();
  }

  public getCompeticiones() {
    this.competicionService.getAll().subscribe(
      competiciones => {
        this.competiciones = competiciones;
      },
      (error: HttpErrorResponse) => {
        this.error = true;
      }
    );
  }

  public onCompeticionesUpdated() {
    this.ngOnInit();
  }

  public onRetry() {
    this.error = false;
    this.ngOnInit();
  }
}
