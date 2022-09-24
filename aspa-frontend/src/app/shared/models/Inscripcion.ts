import { Atleta } from 'src/app/shared/models/Atleta';

export interface Inscripcion {
  idinscripcion: number;
  atleta: Atleta;
  presentado: boolean;
  dorsal: number;
}
