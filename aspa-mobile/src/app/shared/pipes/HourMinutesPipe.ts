import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hourAndMinutes' })
export class ToHourAndMinutes implements PipeTransform {
    transform(dateTime: string): string {
        const date = new Date(dateTime);
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
