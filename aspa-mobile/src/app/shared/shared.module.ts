import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDate } from './pipes/DatePipe';
import { ToHourAndMinutes } from './pipes/HourMinutesPipe';

@NgModule({
  declarations: [
    // pipes
    FormatDate,
    ToHourAndMinutes,
  ],
  imports: [CommonModule],
  exports: [
    // pipes
    FormatDate,
    ToHourAndMinutes,
  ],
})
export class SharedModule {}
