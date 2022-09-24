interface Marca {
  atleta: number;
  intento: number;
  resultado: string;
}

export interface MarcaNs extends Marca {
  marca: string;
}

export interface MarcaSv extends Marca {
  idaltura: number;
  altura: number;
}
