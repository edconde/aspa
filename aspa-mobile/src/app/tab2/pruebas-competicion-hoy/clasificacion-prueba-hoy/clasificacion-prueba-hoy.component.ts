import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { Prueba } from 'src/app/shared/models/Prueba';
import { LoadingController, ModalController } from '@ionic/angular';
import { InscripcionService } from 'src/app/shared/services/inscripcion.service';
import { ClasificacionService } from 'src/app/shared/services/clasificacion.service';
import { MarcaNsService } from 'src/app/shared/services/marca-ns.service';
import { MarcaSvService } from 'src/app/shared/services/marca-sv.service';
import { Inscripcion } from 'src/app/shared/models/Inscripcion';
import { Clasificacion } from 'src/app/shared/models/Clasificacion';
import { Marca } from 'src/app/shared/models/Marca';
import { forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { MarcasModalHoyPage } from './marcas-modal-hoy/marcas-modal-hoy.page';
import { Atleta } from 'src/app/shared/models/Atleta';
import { DISCIPLINAS } from 'src/app/shared/enums/Disciplina';
import { SEXOS } from 'src/app/shared/enums/Sexos';
import { AlturaService } from 'src/app/shared/services/altura.service';
import { Altura } from 'src/app/shared/models/Altura';

@Component({
  selector: 'app-clasificacion-prueba-hoy',
  templateUrl: './clasificacion-prueba-hoy.component.html',
  styleUrls: ['./clasificacion-prueba-hoy.component.scss'],
})
export class ClasificacionPruebaHoyComponent implements OnInit {
  public idcompeticion;
  private prueba: Prueba;
  public nombreTipoPrueba: string;
  private esSaltoVertical = false;
  private inscripciones: Inscripcion[];
  private clasificaciones: Clasificacion[];
  private marcas: Marca[];
  private alturas: Altura[];
  public rowItems: { pos: number; name: string; idinscripcion: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appDataService: AppDataService,
    private inscripcionesService: InscripcionService,
    private clasificacionesService: ClasificacionService,
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
    peticiones.push(this.clasificacionesService.getAllByPrueba(idprueba));
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
          this.clasificaciones = responseList[1];
          this.marcas = responseList[2];
          if (this.esSaltoVertical) {
            this.alturas = responseList[3];
            this.alturas.sort((a, b) => {
              return a.altura > b.altura ? 1 : -1;
            });
          }
          this.clasificaciones.forEach(c => {
            this.rowItems.push({
              pos: c.posicion,
              name: this.getFullName(c),
              idinscripcion: this.getIdInscripcion(c),
            });
          });
          this.rowItems = this.rowItems.sort((a, b) => {
            return a.pos === null
              ? 1
              : b.pos === null
              ? -1
              : a.pos - b.pos >= 0
              ? 1
              : -1;
          });
        },
        (error: HttpErrorResponse) => {
          this.router.navigate([`/fga/directo/${this.idcompeticion}`]);
        }
      );
  }

  private getFullName(clasificacion: Clasificacion): string {
    const atleta: Atleta = this.inscripciones.find(
      i => i.atleta.idatleta == clasificacion.id.atleta
    ).atleta;
    const nombre = atleta.nombre;
    const apellidos = atleta.apellidos;
    return `${nombre ? nombre + ' ' : ''}${apellidos || ''}`;
  }

  private getIdInscripcion(clasificacion: Clasificacion): number {
    return this.inscripciones.find(
      i => i.atleta.idatleta == clasificacion.id.atleta
    ).idinscripcion;
  }

  public verMarcas(idinscripcion: number) {
    this.presentModal(idinscripcion);
  }

  private async presentModal(idinscripcion: number): Promise<void> {
    const atleta: Atleta = this.inscripciones.find(
      i => i.idinscripcion == idinscripcion
    ).atleta;
    const modal = await this.modalController.create({
      component: MarcasModalHoyPage,
      componentProps: {
        atleta,
        marcas: this.marcas.filter(m => m.atleta == atleta.idatleta),
        alturas: this.alturas,
        esSaltoVertical: this.esSaltoVertical,
        prueba: this.prueba,
      },
    });
    return await modal.present();
  }
}
