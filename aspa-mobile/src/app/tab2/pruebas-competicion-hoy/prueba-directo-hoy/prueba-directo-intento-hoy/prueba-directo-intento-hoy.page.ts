import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Atleta } from 'src/app/shared/models/Atleta';
import { Marca, MarcaSv } from 'src/app/shared/models/Marca';

@Component({
  selector: 'app-prueba-directo-intento-hoy',
  templateUrl: './prueba-directo-intento-hoy.page.html',
  styleUrls: ['./prueba-directo-intento-hoy.page.scss'],
})
export class PruebaDirectoIntentoHoyPage implements OnInit {
  private atletas: Atleta[];
  public esSaltoVertical = false;
  public marcas: Marca[];
  public titulo = '';
  public intentos = [];

  constructor(navParams: NavParams, private modalController: ModalController) {
    this.atletas = navParams.get('atletas');
    this.esSaltoVertical = navParams.get('esSaltoVertical');
    this.marcas = navParams.get('marcas');
    this.titulo = navParams.get('titulo');
    if (this.esSaltoVertical) {
      this.intentos = this.marcas.map(m => m.intento);
      this.intentos = this.intentos
        .filter((i, index) => this.intentos.indexOf(i) === index)
        .reverse();
    }
  }

  ngOnInit() {}

  public getMarcasIntento(intento: number): MarcaSv[] {
    return (this.marcas as MarcaSv[]).filter(m => m.intento == intento);
  }

  public getAtleta(m: Marca): string {
    const atleta = this.atletas.find(a => a.idatleta == m.atleta);
    const nombre = atleta.nombre;
    const apellidos = atleta.apellidos;
    return `${nombre ? nombre + ' ' : ''}${apellidos || ''}`;
  }

  public getMarca(marca: string): string {
    if (marca) {
      return ` - ${marca} m`;
    } else {
      return '';
    }
  }

  public close(): void {
    this.modalController.dismiss();
  }
}
