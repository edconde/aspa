import { Usuario } from './Usuario';
import { TipoPrueba } from './TipoPrueba';

export interface Prueba {
  idprueba: number;
  fecha: Date;
  hora_prueba: Date;
  apertura_camara: Date;
  cierre_camara: Date;
  tipo_prueba: TipoPrueba;
  usuario: Usuario;
  num_intentos: number;
  num_intentos_mejora: number;
  num_atletas_mejora: number;
  finalizada: boolean;
}
