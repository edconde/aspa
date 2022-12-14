import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'aspa-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Input() message;

  constructor() { }

  ngOnInit() {
    if (!this.message) {
      this.message = 'Cargando';
    }
  }
}
