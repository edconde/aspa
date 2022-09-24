import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competicion } from 'src/app/shared/models/Competicion';
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { TipoPrueba } from 'src/app/shared/models/TipoPrueba';
import { DISCIPLINAS } from 'src/app/shared/enums/Disciplina';
import { CATEGORIAS } from 'src/app/shared/enums/Categoria';
import {
  LoadingController,
  ModalController,
  PickerController,
} from '@ionic/angular';
import { PruebaModalPage } from './prueba-modal/prueba-modal.page';
import { PickerColumnOption, PickerOptions } from '@ionic/core';
import { Prueba } from 'src/app/shared/models/Prueba';

const CATEGORIA: PickerColumnOption[] = [
  { text: 'TODAS', value: 'TODAS' },
  { text: CATEGORIAS.ABSOLUTA, value: 'ABSOLUTA' },
  { text: CATEGORIAS.BENJAMIN, value: 'BENJAMIN' },
  { text: CATEGORIAS.ALEVIN, value: 'ALEVIN' },
  { text: CATEGORIAS.INFANTIL, value: 'INFANTIL' },
  { text: CATEGORIAS.CADETE, value: 'CADETE' },
  { text: CATEGORIAS.JUVENIL, value: 'JUVENIL' },
  { text: CATEGORIAS.PROMESA, value: 'PROMESA' },
  { text: CATEGORIAS.MASTER, value: 'MASTER' },
];

const DISCIPLINA: PickerColumnOption[] = [
  { text: 'TODAS', value: 'TODAS' },
  { text: 'Disco', value: 'LANZAMIENTO_DISCO' },
  { text: 'Jabalina', value: 'LANZAMIENTO_JABALINA' },
  { text: 'Martillo', value: 'LANZAMIENTO_MARTILLO' },
  { text: 'Peso', value: 'LANZAMIENTO_PESO' },
  { text: 'Altura', value: 'SALTO_ALTURA' },
  { text: 'Longitud', value: 'SALTO_LONGITUD' },
  { text: 'Pértiga', value: 'SALTO_PERTIGA' },
  { text: 'Triple salto', value: 'TRIPLE_SALTO' },
];

@Component({
  selector: 'app-pruebas-competicion',
  templateUrl: './pruebas-competicion.component.html',
  styleUrls: ['./pruebas-competicion.component.scss'],
})
export class PruebasCompeticionComponent implements OnInit {
  private idcompeticion: string;
  public competicion: Competicion;
  private selectedCategoriaIndex = 0;
  private selectedDisciplinaIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appDataService: AppDataService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private pickerCtrl: PickerController
  ) {}

  ngOnInit() {
    this.getCompeticion();
  }

  private async getCompeticion(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Cargando pruebas',
    });
    await loading.present();
    this.idcompeticion = this.route.snapshot.params.idcompeticion;
    this.competicion = this.appDataService.getCompeticion(this.idcompeticion);
    loading.dismiss();
  }

  public getLabel(tipoPrueba: TipoPrueba): string {
    return `${DISCIPLINAS[tipoPrueba.disciplina]} - ${
      CATEGORIAS[tipoPrueba.categoria]
    }`;
  }

  public getPruebasFiltradas(): Array<Prueba> {
    return this.competicion
      ? this.competicion.pruebas.filter(
          p =>
            (this.selectedCategoriaIndex === 0 ||
              p.tipo_prueba.categoria ==
                CATEGORIA[this.selectedCategoriaIndex].value) &&
            (this.selectedDisciplinaIndex === 0 ||
              p.tipo_prueba.disciplina ==
                DISCIPLINA[this.selectedDisciplinaIndex].value)
        )
      : [];
  }

  public chooseAction(p: Prueba): void {
    if (p.finalizada) {
      this.router.navigate(
        [`/fga/resultados/${this.competicion.idcompeticion}/clasificaciones`],
        { queryParams: { idprueba: p.idprueba } }
      );
    } else if (new Date(p.fecha) < new Date()) {
      this.router.navigate(
        [`/fga/resultados/${this.competicion.idcompeticion}/en-curso`],
        { queryParams: { idprueba: p.idprueba } }
      );
    } else {
      this.presentModal(p.idprueba);
    }
  }

  public getIconName(p: Prueba): string {
    if (p.finalizada) {
      return 'trophy';
    } else if (new Date(p.fecha) < new Date()) {
      return 'walk';
    } else {
      return 'create';
    }
  }

  private async presentModal(idprueba: number): Promise<void> {
    const modal = await this.modalController.create({
      component: PruebaModalPage,
      componentProps: {
        prueba: this.competicion.pruebas.find(p => p.idprueba == idprueba),
      },
    });
    return await modal.present();
  }

  public async showAdvancedPicker() {
    const opts: PickerOptions = {
      columns: [
        {
          name: 'categoria',
          options: CATEGORIA,
          selectedIndex: this.selectedCategoriaIndex,
        },
        {
          name: 'disciplina',
          options: DISCIPLINA,
          selectedIndex: this.selectedDisciplinaIndex,
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
      const categoria = await picker.getColumn('categoria');
      const disciplina = await picker.getColumn('disciplina');
      this.selectedCategoriaIndex = categoria.selectedIndex;
      this.selectedDisciplinaIndex = disciplina.selectedIndex;
    });
  }

  public getCategoria(): string {
    return CATEGORIA[this.selectedCategoriaIndex].text;
  }

  public getDisciplina(): string {
    return DISCIPLINA[this.selectedDisciplinaIndex].text;
  }

  public setCategoria(selectedCategoriaIndex?: number) {
    this.selectedCategoriaIndex =
      selectedCategoriaIndex > -1 ? selectedCategoriaIndex : 0;
  }

  public setDisciplina(selectedDisciplinaIndex?: number) {
    this.selectedDisciplinaIndex =
      selectedDisciplinaIndex > -1 ? selectedDisciplinaIndex : 0;
  }

  public removeCategoria(event: MouseEvent): void {
    event.stopPropagation();
    this.setCategoria(0);
  }

  public removeDisciplina(event: MouseEvent): void {
    event.stopPropagation();
    this.setDisciplina(0);
  }
}
