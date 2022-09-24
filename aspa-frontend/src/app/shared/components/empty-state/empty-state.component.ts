import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'aspa-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent implements OnInit {
  @Output() retry = new EventEmitter<any>();
  @Input() retryButton: boolean;
  @Input() message: string;
  @Input() detailedMessage: string;
  @Input() icon: string;
  displayedMessage = 'Se ha producido un error';
  displayedIcon = 'warning';

  constructor() { }

  ngOnInit() {
    if (this.icon) {
      this.displayedIcon = this.icon;
    }
    if (this.message) {
      this.displayedMessage = this.message;
    }
  }

  askForRetry() {
    this.retry.emit();
  }
}
