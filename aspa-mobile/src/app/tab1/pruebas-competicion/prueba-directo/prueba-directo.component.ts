import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { Prueba } from 'src/app/shared/models/Prueba';
import { LoadingController, ModalController } from '@ionic/angular';
import { InscripcionService } from 'src/app/shared/services/inscripcion.service';
import { MarcaNsService } from 'src/app/shared/services/marca-ns.service';
import { MarcaSvService } from 'src/app/shared/services/marca-sv.service';
import { Inscripcion } from 'src/app/shared/models/Inscripcion';
import { Marca, MarcaSv, MarcaNs } from 'src/app/shared/models/Marca';
import { forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Atleta } from 'src/app/shared/models/Atleta';
import { DISCIPLINAS } from 'src/app/shared/enums/Disciplina';
import { SEXOS } from 'src/app/shared/enums/Sexos';
import { AlturaService } from 'src/app/shared/services/altura.service';
import { Altura } from 'src/app/shared/models/Altura';
import { PruebaDirectoIntentoPage } from './prueba-directo-intento/prueba-directo-intento.page';

@Component({
  selector: 'app-prueba-directo',
  templateUrl: './prueba-directo.component.html',
  styleUrls: ['./prueba-directo.component.scss'],
})
export class PruebaDirectoComponent implements OnInit {
  public idcompeticion;
  private prueba: Prueba;
  public nombreTipoPrueba: string;
  private esSaltoVertical = false;
  private inscripciones: Inscripcion[];
  private marcas: Marca[];
  private alturas: Altura[];
  public intentos = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appDataService: AppDataService,
    private inscripcionesService: InscripcionService,
    private marcasNsService: MarcaNsService,
    private marcasSvService: MarcaSvService,
    private alturaService: AlturaService,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getAllInfo();
  }

  private async getAllInfo(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Cargando información',
    });
    await loading.present();
    this.idcompeticion = this.route.snapshot.params.idcompeticion;
    let idprueba: number;
    this.route.queryParams.subscribe(params => {
      idprueba = params.idprueba;
    });
    this.prueba = this.appDataService.getPrueba(this.idcompeticion, idprueba);
    this.nombreTipoPrueba = `${
      DISCIPLINAS[this.prueba.tipo_prueba.disciplina]
    } - ${SEXOS[this.prueba.tipo_prueba.sexo]}`;
    const peticiones = [];
    peticiones.push(this.inscripcionesService.getAllByPrueba(idprueba));
    if (
      ['SALTO_ALTURA', 'SALTO_PERTIGA'].indexOf(
        this.prueba.tipo_prueba.disciplina
      ) > -1
    ) {
      peticiones.push(this.marcasSvService.getAllByPrueba(idprueba));
      peticiones.push(this.alturaService.getAllByPrueba(idprueba));
      this.esSaltoVertical = true;
    } else {
      peticiones.push(this.marcasNsService.getAllByPrueba(idprueba));
    }
    forkJoin(peticiones)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        (responseList: any[]) => {
          this.inscripciones = responseList[0];
          this.marcas = responseList[1];
          if (this.esSaltoVertical) {
            this.alturas = responseList[2];
            this.alturas.sort((a, b) => {
              return a.altura > b.altura ? -1 : 1;
            });
            this.alturas = this.alturas.filter(a =>
              (this.marcas as MarcaSv[]).find(m => m.idaltura === a.idaltura)
            );
          } else {
            if (this.marcas.length > 0) {
              const mayorIntento = Math.max.apply(
                Math,
                this.marcas.map(m => m.intento)
              );
              this.intentos = Array.from(Array(mayorIntento).keys())
                .map(i => i + 1)
                .reverse();
            }
          }
        },
        (error: HttpErrorResponse) => {
          this.router.navigate([`/fga/resultados/${this.idcompeticion}`]);
        }
      );
  }

  public showAltura(altura: Altura) {
    let marcas = (this.marcas as MarcaSv[]).filter(
      m => m.idaltura == altura.idaltura
    );
    marcas.forEach(
      ma =>
        (ma.altura = this.alturas.find(
          a => a.idaltura == altura.idaltura
        ).altura)
    );
    const titulo = `Listón a ${altura.altura} m`;
    this.presentModal(marcas, titulo);
  }

  public showIntento(intento: number) {
    const marcas = (this.marcas as MarcaNs[]).filter(m => m.intento == intento);
    const titulo = `Intento nº ${intento}`;
    this.presentModal(marcas, titulo);
  }

  private async presentModal(marcas: Marca[], titulo: string): Promise<void> {
    const atletas: Atleta[] = this.inscripciones.map(i => i.atleta);
    const modal = await this.modalController.create({
      component: PruebaDirectoIntentoPage,
      componentProps: {
        atletas,
        marcas,
        esSaltoVertical: this.esSaltoVertical,
        titulo,
      },
    });
    return await modal.present();
  }
}
