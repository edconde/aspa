import { Prueba } from './Prueba';

export interface Competicion {
  idcompeticion: string;
  nombre: string;
  fecha: Date;
  lugar: string;
  pruebas: Prueba[];
}
