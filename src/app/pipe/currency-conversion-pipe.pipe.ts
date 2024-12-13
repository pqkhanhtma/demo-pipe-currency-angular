import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { Pipe, PipeTransform, ChangeDetectorRef,  Injector , OnDestroy} from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';


@Pipe({
    name: 'currencyConversion',
    standalone: true
})
export class CurrencyConversionPipe implements PipeTransform   {
    storageVariableName: any = 'currency-conversation-data';
    rate: any = 1;
    currency: any = 'USD';
    constructor(private http: HttpClient) {
    }
    getRate(value: number, currentCurrency: string,  showSymbol: boolean = true) : Observable<any> {
      const dt: any = {};
      return this.http.get<any>('https://api.soctrip.com/billing/exchange-rate/USD/' + currentCurrency).pipe(
        map(response => {
          if (!!response.success) {
            this.rate =  response.data;
            this.currency = currentCurrency;
            dt.rate = response.data;
            dt.currency = currentCurrency;
            dt.expiry = new Date().getTime() + 1 * 60 * 60 * 1000;
            dt.hash = dt.currency + dt.rate + dt.expiry;
            localStorage.setItem(this.storageVariableName, JSON.stringify(dt));
            console.log(5555);
          }
          if (showSymbol) {
              return (value * this.rate).toLocaleString('en-US', {
                  style: 'currency',
                  currency: this.currency,
              });
          } else {
              return (value * this.rate).toLocaleString('en-US', {
                  style: 'decimal',
                  maximumFractionDigits: 2,
              });
          } 
        }),
        catchError(err => {
          return of(err);
        })
      )
    }
    transform(value: number, currentCurrency: string,  showSymbol: boolean = true): Observable<any> {
      if(!value){
        return of(null);
      }
      return this.getRate(value, currentCurrency ,showSymbol);
    }
}
