import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPipe',
  standalone: true
})
export class CurrencyPipePipe implements PipeTransform {

  transform(value: any, currency: string): string {
    switch (currency) {
      case 'VN':
        return `${value} đ`;
      case 'EURO':
        return `${parseFloat(value)*30000} euro`;
      case 'USD':
        return `${parseFloat(value)*26000} usd`;
      default:
        return `${value} ${currency}`;
    }
  }
}
