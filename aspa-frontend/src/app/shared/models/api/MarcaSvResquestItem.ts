import { MarcaSv } from '../Marca';

export class MarcaSvResquestItem {
  id: {
    atleta: number;
    intento: number;
    idaltura: number;
  };
  resultado: string;

  constructor(marcaSv: MarcaSv) {
    this.id = {
      atleta: marcaSv.atleta,
      intento: marcaSv.intento,
      idaltura: marcaSv.idaltura,
    };
    this.resultado = marcaSv.resultado;
  }
}
