import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../models/DialogData';

@Component({
  selector: 'app-confirmacion-popup',
  templateUrl: './confirmacion-popup.component.html',
  styleUrls: ['./confirmacion-popup.component.scss']
})
export class ConfirmacionPopupComponent {

  message: string;
  detailedMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.message = data.title;
    this.detailedMessage = data.detailedMessage;
  }

}
