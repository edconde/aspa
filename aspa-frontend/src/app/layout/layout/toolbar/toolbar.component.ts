import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'aspa-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() isMobile;
  @Output() clickMenuButton: EventEmitter<any>;

  constructor() {
    this.clickMenuButton = new EventEmitter<any>();
  }

  ngOnInit() { }

  click() {
    this.clickMenuButton.emit();
  }
}
