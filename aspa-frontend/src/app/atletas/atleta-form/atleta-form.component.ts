import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtletaService } from '../../shared/services/atleta.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Atleta } from '../../shared/models/Atleta';
import { Club } from 'src/app/shared/models/Club';
import { forkJoin } from 'rxjs';
import { ClubService } from 'src/app/shared/services/club.service';

@Component({
  selector: 'aspa-atleta-form',
  templateUrl: './atleta-form.component.html',
  styleUrls: ['./atleta-form.component.scss'],
})
export class AtletaFormComponent implements OnInit {
  title = 'Editar atleta';
  idatleta: number;
  atleta: Atleta;
  atletaForm: FormGroup;
  clubes: Array<Club>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private atletaService: AtletaService,
    private clubService: ClubService,
    private snackBar: MatSnackBar
  ) {
    this.atletaForm = this.createFormGroup();
  }

  ngOnInit() {
    if (this.route.snapshot.url.toString().startsWith('editar')) {
      this.idatleta = this.route.snapshot.params['idatleta'];
      this.getAtletaAndClubes();
    } else {
      this.getClubes();
      this.title = 'Alta de atleta';
    }
  }

  private createFormGroup() {
    return new FormGroup({
      licencia: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', Validators.required),
      sexo: new FormControl(false, Validators.required),
      dni: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      idclub: new FormControl('', [Validators.required]),
    });
  }

  private getAtletaAndClubes() {
    const atleta = this.atletaService.getById(this.idatleta);
    const clubes = this.clubService.getAll();
    forkJoin([atleta, clubes]).subscribe(
      responseList => {
        this.atleta = responseList[0];
        this.clubes = responseList[1];
        this.fillForm();
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/atletas']);
      }
    );
  }

  private getClubes() {
    this.clubService.getAll().subscribe(
      clubes => {
        this.clubes = clubes;
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/atletas']);
      }
    );
  }

  private fillForm() {
    this.atletaForm.get('licencia').setValue(this.atleta.licencia);
    this.atletaForm.get('email').setValue(this.atleta.email);
    this.atletaForm.get('nombre').setValue(this.atleta.nombre);
    this.atletaForm.get('apellidos').setValue(this.atleta.apellidos);
    this.atletaForm
      .get('fechaNacimiento')
      .setValue(this.atleta.fechaNacimiento);
    this.atletaForm.get('sexo').setValue(this.atleta.sexo);
    this.atletaForm.get('dni').setValue(this.atleta.dni);
    this.atletaForm.get('telefono').setValue(this.atleta.telefono);
    this.atletaForm
      .get('idclub')
      .setValue(
        this.clubes.find(club => club.idclub == this.atleta.idclub).idclub
      );
  }

  public onSubmit() {
    if (this.atleta) {
      const atletaToEdit: Atleta = Object.assign(
        { idatleta: this.atleta.idatleta },
        this.atletaForm.value
      );
      this.editAtleta(atletaToEdit);
    } else {
      const atletaToCreate: Atleta = Object.assign(
        { idatleta: null },
        this.atletaForm.value
      );
      this.addAtleta(atletaToCreate);
    }
  }

  private addAtleta(atleta: Atleta) {
    this.atletaService.add(atleta).subscribe(
      (data: any) => {
        this.openSnackBar('Atleta creado', 'cerrar');
        this.goBack();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.openSnackBar('Licencia/dni ya registrado', 'cerrar');
        } else {
          this.openSnackBar('Error en el servidor', 'cerrar');
        }
      }
    );
  }

  private editAtleta(atleta: Atleta) {
    this.atletaService.edit(atleta).subscribe(
      (data: any) => {
        this.openSnackBar('Atleta editado', 'cerrar');
        this.goBack();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.openSnackBar('No existe el atleta a editar', 'cerrar');
        } else {
          this.openSnackBar('Error en el servidor', 'cerrar');
        }
      }
    );
  }

  public goBack() {
    this.router.navigate(['/atletas']);
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
