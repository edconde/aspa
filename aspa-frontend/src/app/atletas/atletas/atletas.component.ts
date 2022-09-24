import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AtletaService } from '../../shared/services/atleta.service';
import { Atleta } from '../../shared/models/Atleta';

@Component({
  selector: 'aspa-atletas',
  templateUrl: './atletas.component.html',
  styleUrls: ['./atletas.component.scss'],
})
export class AtletasComponent implements OnInit {
  public atletas: Array<Atleta>;
  public error = false;
  public errorMessage = 'No se han podido cargar los atletas';
  public loadingMessage = 'Cargando atletas';

  constructor(private atletaService: AtletaService) {}

  ngOnInit() {
    this.getAtletas();
  }

  public getAtletas() {
    this.atletaService.getAll().subscribe(
      atletas => {
        this.atletas = atletas;
      },
      (error: HttpErrorResponse) => {
        this.error = true;
      }
    );
  }

  public onAtletaDeleted() {
    this.ngOnInit();
  }

  public onRetry() {
    this.error = false;
    this.ngOnInit();
  }
}
