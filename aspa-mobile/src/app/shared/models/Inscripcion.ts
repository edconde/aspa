import { Atleta } from './Atleta';

export interface Inscripcion {
  idinscripcion: number;
  atleta: Atleta;
  presentado: boolean;
  dorsal: number;
}
