import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material';
import { Club } from '../../../../shared/models/Club';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmacionPopupComponent } from 'src/app/shared/components/confirmacion-popup/confirmacion-popup.component';

@Component({
  selector: 'app-club-popup',
  templateUrl: './club-popup.component.html',
  styleUrls: ['./club-popup.component.scss'],
})
export class ClubPopupComponent {
  public action: string;
  public clubForm: FormGroup;
  public club: Club;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ClubPopupComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.action = data.action;
    this.club = data.club;
    this.clubForm = this.createForm();
    if (this.club !== undefined) {
      this.fillForm();
    }
  }

  private createForm() {
    return new FormGroup({
      licencia: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
    });
  }

  private fillForm() {
    this.clubForm.patchValue(this.club);
  }

  public onSubmit() {
    if (!this.clubForm.valid) {
      return;
    }
    const club: Club = this.clubForm.value;
    if (this.club) {
      club.idclub = this.club.idclub;
    }
    const dialogref = this.dialog.open(ConfirmacionPopupComponent, {
      data: {
        title: '¿Guardar?',
      },
    });
    dialogref.afterClosed().subscribe(result => {
      if (result && result === true) {
        this.close(club);
      }
    });
  }

  public goBack() {
    this.close();
  }

  private close(returnValue?) {
    if (returnValue) {
      this.dialogRef.close(returnValue);
    } else {
      this.dialogRef.close();
    }
  }
}
