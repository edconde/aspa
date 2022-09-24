import { Component, OnInit } from '@angular/core';
import {
  NavParams,
  ModalController,
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Prueba } from 'src/app/shared/models/Prueba';
import { DISCIPLINAS } from 'src/app/shared/enums/Disciplina';
import { CATEGORIAS } from 'src/app/shared/enums/Categoria';
import { TipoPrueba } from 'src/app/shared/models/TipoPrueba';
import { InscripcionService } from 'src/app/shared/services/inscripcion.service';
import { Inscripcion } from 'src/app/shared/models/Inscripcion';
import { SessionService } from 'src/app/shared/services/session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { SEXOS } from 'src/app/shared/enums/Sexos';

@Component({
  selector: 'app-prueba-hoy-modal',
  templateUrl: './prueba-hoy-modal.page.html',
  styleUrls: ['./prueba-hoy-modal.page.scss'],
})
export class PruebaHoyModalPage implements OnInit {
  public prueba: Prueba;
  public inscripcion: Inscripcion = null;
  public canParticipate = false;

  constructor(
    navParams: NavParams,
    private modalController: ModalController,
    private alertController: AlertController,
    private inscripcionService: InscripcionService,
    private session: SessionService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.prueba = navParams.get('prueba');
    this.canParticipate = this.isCategoriaAndSexo();
  }

  ngOnInit() {
    this.checkIfInscrito();
  }

  private async checkIfInscrito(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Cargando información',
    });
    await loading.present();
    if (this.session.isAuthenticated()) {
      this.inscripcionService
        .getAllByPrueba(this.prueba.idprueba)
        .pipe(finalize(() => loading.dismiss()))
        .subscribe(
          (inscripciones: Inscripcion[]) => {
            const inscripcion: Inscripcion = inscripciones.find(
              i => i.atleta.licencia == this.session.getLicencia()
            );
            if (inscripcion) {
              this.inscripcion = inscripcion;
            } else {
              this.inscripcion = null;
            }
          },
          (error: HttpErrorResponse) => {
            this.inscripcion = null;
          }
        );
    } else {
      loading.dismiss();
      this.inscripcion = null;
    }
  }

  public getCategoria(tipoPrueba: TipoPrueba): string {
    return CATEGORIAS[tipoPrueba.categoria];
  }

  public getSexo(tipoPrueba: TipoPrueba): string {
    return SEXOS[tipoPrueba.sexo];
  }

  public getDisciplina(tipoPrueba: TipoPrueba): string {
    return DISCIPLINAS[tipoPrueba.disciplina];
  }

  public isAuthenticated(): boolean {
    return this.session.isAuthenticated();
  }

  public close(): void {
    this.modalController.dismiss();
  }

  private isCategoriaAndSexo(): boolean {
    const sexoPrueba: string = this.prueba.tipo_prueba.sexo;
    const sexoAtleta: string = this.session.getSexo()
      ? 'FEMENINO'
      : 'MASCULINO';
    if (sexoPrueba !== 'MIXTO' && sexoPrueba !== sexoAtleta) {
      return false;
    }
    const fechaNacimiento = this.session.getFechaNacimiento();
    const anoAtleta = new Date(fechaNacimiento).getFullYear();
    const anoActual = new Date().getFullYear();
    let isCategoria = false;
    switch (this.prueba.tipo_prueba.categoria) {
      case 'BENJAMIN':
        isCategoria = anoAtleta >= anoActual - 10;
        break;
      case 'ALEVIN':
        isCategoria = anoAtleta >= anoActual - 12;
        break;
      case 'INFANTIL':
        isCategoria = anoAtleta >= anoActual - 14;
        break;
      case 'CADETE':
        isCategoria = anoAtleta >= anoActual - 16;
        break;
      case 'JUVENIL':
        isCategoria = anoAtleta >= anoActual - 18;
        break;
      case 'PROMESA':
        isCategoria =
          anoAtleta <= anoActual - 19 && anoAtleta >= anoActual - 23;
        break;
      case 'ABSOLUTA':
        isCategoria = true;
        break;
      case 'MASTER':
        isCategoria = anoAtleta <= anoActual - 30;
        break;
    }
    return isCategoria;
  }

  public async realizarInscripcionAlert(
    unsubscription?: boolean
  ): Promise<void> {
    const header = unsubscription
      ? '¿Eliminar inscripción?'
      : '¿Realizar inscripción?';
    const message = unsubscription
      ? 'Puedes volver a inscribirte cuando quieras antes del día de la prueba.'
      : 'Si por alguna razón no puedes competir, podrás eliminar tu inscripción.';
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            unsubscription
              ? this.eliminarInscripcion()
              : this.realizarInscripcion();
          },
        },
      ],
    });
    await alert.present();
  }

  private async realizarInscripcion() {
    const loading = await this.loadingController.create({
      message: 'Realizando inscripción',
    });
    await loading.present();
    this.inscripcionService
      .add(this.prueba.idprueba, {
        atleta: {
          idatleta: this.session.getIdatleta(),
          licencia: this.session.getLicencia(),
        },
      })
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        (res: Inscripcion) => {
          this.inscripcion = res;
        },
        (error: HttpErrorResponse) => {
          this.presentErrorToast(true);
          this.inscripcion = null;
        }
      );
  }

  private async eliminarInscripcion() {
    const loading = await this.loadingController.create({
      message: 'Eliminando inscripción',
    });
    await loading.present();
    this.inscripcionService
      .delete(this.prueba.idprueba, this.inscripcion.idinscripcion)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        res => {
          this.inscripcion = null;
        },
        (error: HttpErrorResponse) => {
          this.presentErrorToast();
        }
      );
  }

  public async presentErrorToast(inscripcion?: boolean) {
    const accion = inscripcion ? 'realizar' : 'eliminar';
    const toast = await this.toastController.create({
      header: 'Ha ocurrido un error',
      message: `No se ha podido ${accion} la inscripcion.`,
      duration: 2000,
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: 'warning',
        },
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }
}
