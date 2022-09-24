import { Component, OnInit } from '@angular/core';
import { PickerController, Platform, LoadingController } from '@ionic/angular';
import { PickerOptions, PickerColumnOption } from '@ionic/core';
import { finalize } from 'rxjs/operators';
import { CompeticionService } from '../shared/services/competicion.service';
import { Competicion } from '../shared/models/Competicion';
import { AppDataService } from '../shared/services/app-data.service';
import { HttpErrorResponse } from '@angular/common/http';

const ANOS: PickerColumnOption[] = [
  { text: '2019', value: 2019 },
  { text: '2020', value: 2020 },
  { text: '2021', value: 2021 },
];

const MESES: PickerColumnOption[] = [
  { text: 'Todo el año', value: 0 },
  { text: 'Enero', value: 1 },
  { text: 'Febrero', value: 2 },
  { text: 'Marzo', value: 3 },
  { text: 'Abril', value: 4 },
  { text: 'Mayo', value: 5 },
  { text: 'Junio', value: 6 },
  { text: 'Julio', value: 7 },
  { text: 'Agosto', value: 8 },
  { text: 'Septiembre', value: 9 },
  { text: 'Octubre', value: 10 },
  { text: 'Noviembre', value: 11 },
  { text: 'Diciembre', value: 12 },
];

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public competiciones: Competicion[] = [];
  private selectedAnoIndex = 1;
  private selectedMesIndex = 1;
  private competicionFilter = '';

  constructor(
    private pickerCtrl: PickerController,
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
      .get(this.getAno(), this.selectedMesIndex)
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

  public getCompeticionesFiltradas(): Array<Competicion> {
    return this.competiciones
      ? this.competiciones.filter(c =>
          c.nombre.startsWith(this.competicionFilter)
        )
      : [];
  }

  public getDiaMes(fecha: string): string {
    return `${fecha.substr(8, 2)}/${fecha.substr(5, 2)}`;
  }

  public async showAdvancedPicker() {
    const opts: PickerOptions = {
      columns: [
        {
          name: 'ano',
          options: ANOS,
          selectedIndex: this.selectedAnoIndex,
        },
        {
          name: 'mes',
          options: MESES,
          selectedIndex: this.selectedMesIndex,
        },
      ],
    };
    const picker = await this.pickerCtrl.create(opts);
    picker.columns.forEach(column => {
      column.options.forEach(element => {
        delete element.selected;
        delete element.duration;
        delete element.transform;
      });
    });
    picker.present();
    picker.onDidDismiss().then(async data => {
      const ano = await picker.getColumn('ano');
      const mes = await picker.getColumn('mes');
      this.setAno(ano.selectedIndex);
      this.setMes(mes.selectedIndex);
      this.getCompeticiones();
    });
  }

  public getAno(): string {
    return ANOS[this.selectedAnoIndex].text;
  }
  public getMes(): string {
    return MESES[this.selectedMesIndex].text;
  }

  public setAno(selectedAnoIndex?: number) {
    this.selectedAnoIndex = selectedAnoIndex > -1 ? selectedAnoIndex : null;
  }

  public setMes(selectedMesIndex?: number) {
    this.selectedMesIndex = selectedMesIndex > -1 ? selectedMesIndex : null;
  }

  public onCompeticionFilterChange(event: CustomEvent) {
    this.competicionFilter = event.detail.value;
  }

  public removeAno(event: MouseEvent): void {
    event.stopPropagation();
    this.setAno(1);
    this.getCompeticiones();
  }

  public removeMes(event: MouseEvent): void {
    event.stopPropagation();
    this.setMes(0);
    this.getCompeticiones();
  }

  public removeName(): void {
    this.competicionFilter = '';
  }
}
