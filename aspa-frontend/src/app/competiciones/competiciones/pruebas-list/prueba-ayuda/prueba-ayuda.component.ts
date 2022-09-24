import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-prueba-ayuda',
  templateUrl: './prueba-ayuda.component.html',
  styleUrls: ['./prueba-ayuda.component.scss']
})
export class PruebaAyudaComponent implements OnInit {

  public isSv: boolean;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { isSv: boolean }) {
    this.isSv = data.isSv;
  }

  ngOnInit() {
  }

}
