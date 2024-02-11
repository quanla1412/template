import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vncurrency'
})
export class VNCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
}
