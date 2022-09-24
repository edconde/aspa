import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatChipInputEvent, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-alturas-add',
  templateUrl: './alturas-add.component.html',
  styleUrls: ['./alturas-add.component.scss']
})
export class AlturasAddComponent {

  @ViewChild('alturasInput') alturasInput: ElementRef;
  public visible = true;
  public selectable = false;
  public removable = true;
  public addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, SPACE];
  public altura: number;
  public alturas: number[];
  public newAlturas: Array<number> = [];
  private step: number = 0.03;

  constructor(private bottomSheetRef: MatBottomSheetRef, @Inject(MAT_BOTTOM_SHEET_DATA) public data: { alturas: Array<number> },
    private snackBar: MatSnackBar) {
    if (data.alturas && data.alturas.length > 0) {
      this.alturas = data.alturas;
      this.altura = Math.round((Math.max.apply(Math, this.alturas) + this.step) * 100) / 100;
    } else {
      this.alturas = [];
      this.altura = 0.00;
    }
    this.bottomSheetRef.afterOpened().subscribe(
      opened => {
        this.alturasInput.nativeElement.focus();
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    let newAltura: number;
    // Add altura
    if (value && value.trim().length > 0) {
      newAltura = parseFloat(value.trim())
      if (!this.alturas.includes(newAltura) && !this.newAlturas.includes(newAltura)) {
        this.newAlturas.push(newAltura);
      }
    }

    // Reset the input value
    if (input) {
      const maxAltura = Math.max.apply(Math, this.alturas);
      const maxNewAltura = Math.max.apply(Math, this.newAlturas);
      const max = Math.max.apply(Math, [maxAltura, maxNewAltura]) + this.step;
      this.altura = Math.round(max * 100) / 100;
    }
  }

  remove(altura: number): void {
    const index = this.newAlturas.indexOf(altura);

    if (index >= 0) {
      this.newAlturas.splice(index, 1);
    }
  }

  saveAlturas() {
    if (this.newAlturas.length > 0) {
      this.bottomSheetRef.dismiss(this.newAlturas);
    } else {
      this.openSnackBar('No has añadido ninguna altura nueva!', 'Cerrar');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
