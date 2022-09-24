import { Injectable } from '@angular/core';
import { Competicion } from '../models/Competicion';
import { Prueba } from '../models/Prueba';

/**
 * Almacena las competiciones obtenidas como resultado de la última petición
 */
@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private competiciones: Array<Competicion> = [];

  constructor() {}

  public getCompeticiones(): Array<Competicion> {
    return this.competiciones;
  }

  public getCompeticion(id: string): Competicion {
    return this.competiciones.find(c => c.idcompeticion == id);
  }

  public getPrueba(idcompeticion: string, idprueba: number): Prueba {
    const competicion: Competicion = this.getCompeticion(idcompeticion);
    return competicion
      ? competicion.pruebas.find(p => p.idprueba == idprueba)
      : null;
  }

  public setCompeticiones(competiciones: Array<Competicion>): void {
    this.competiciones = competiciones;
  }
}
