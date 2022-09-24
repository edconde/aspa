import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../models/DialogData';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-campo-popup',
  templateUrl: './campo-popup.component.html',
  styleUrls: ['./campo-popup.component.scss'],
})
export class CampoPopupComponent {
  public action = 'Crear';
  public title: string;
  public message: string;
  public campoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CampoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.title = data.title;
    this.message = data.detailedMessage;
    this.campoForm = new FormGroup({
      campo: new FormControl('', Validators.required),
    });
    if (data.campoValue) {
      this.campoForm.get('campo').setValue(data.campoValue);
    }
    if (data.action) {
      this.action = data.action;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
