import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Atleta } from 'src/app/shared/models/Atleta';
import { MarcaSv, MarcaNs } from 'src/app/shared/models/Marca';
import { Prueba } from 'src/app/shared/models/Prueba';
import { Altura } from 'src/app/shared/models/Altura';

@Component({
  selector: 'app-marcas-modal-hoy',
  templateUrl: './marcas-modal-hoy.page.html',
  styleUrls: ['./marcas-modal-hoy.page.scss'],
})
export class MarcasModalHoyPage implements OnInit {
  public atleta: Atleta;
  public alturasSv: Array<{ altura: number; marcas: MarcaSv[] }> = [];
  public marcasNs: MarcaNs[];
  public marcasNsMejora: MarcaNs[];
  public prueba: Prueba;
  public esSaltoVertical = false;

  constructor(navParams: NavParams, private modalController: ModalController) {
    this.atleta = navParams.get('atleta');
    this.prueba = navParams.get('prueba');
    this.esSaltoVertical = navParams.get('esSaltoVertical');
    if (this.esSaltoVertical) {
      const alturas: Altura[] = navParams.get('alturas');
      const marcas: MarcaSv[] = navParams.get('marcas');
      alturas.forEach(a => {
        this.alturasSv.push({
          altura: a.altura,
          marcas: marcas.filter(m => m.idaltura === a.idaltura),
        });
      });
    } else {
      const marcas: MarcaNs[] = navParams.get('marcas');
      this.marcasNs = marcas.filter(m => m.intento <= this.prueba.num_intentos);
      this.marcasNsMejora = marcas.filter(
        m => m.intento > this.prueba.num_intentos
      );
    }
  }

  ngOnInit() {}

  public getFullName(): string {
    const nombre = this.atleta.nombre;
    const apellidos = this.atleta.apellidos;
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
