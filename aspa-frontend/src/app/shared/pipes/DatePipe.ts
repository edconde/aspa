import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'formatDate' })
export class FormatDate implements PipeTransform {
    transform(fecha: string): string {
        return moment(new Date(fecha)).format('DD-MM-YYYY');
    }
}