import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CompeticionService } from '../shared/services/competicion.service';
import { Competicion } from '../shared/models/Competicion';
import { AppDataService } from '../shared/services/app-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public competiciones: Competicion[] = [];

  constructor(
    private competicionService: CompeticionService,
    private appDataService: AppDataService,
    private plt: Platform,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getCompeticiones();
  }

  private async getCompeticiones(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Cargando competiciones',
    });
    await loading.present();
    this.competicionService
      .getToday()
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(
        (competiciones: Competicion[]) => {
          this.competiciones = competiciones;
          this.appDataService.setCompeticiones(competiciones);
        },
        (error: HttpErrorResponse) => {}
      );
  }

  public getDiaMes(fecha: string): string {
    return `${fecha.substr(8, 2)}/${fecha.substr(5, 2)}`;
  }
}
