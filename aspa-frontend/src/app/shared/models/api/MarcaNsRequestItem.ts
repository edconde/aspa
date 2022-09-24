import { MarcaNs } from '../Marca';

export class MarcaNsResquestItem {
  id: {
    atleta: number;
    intento: number;
  };
  resultado: string;
  marca: string;

  constructor(marcaNs: MarcaNs) {
    this.id = {
      atleta: marcaNs.atleta,
      intento: marcaNs.intento,
    };
    this.resultado = marcaNs.resultado;
    this.marca = marcaNs.marca;
  }
}
