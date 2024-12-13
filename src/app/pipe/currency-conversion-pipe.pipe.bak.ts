import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { Pipe, PipeTransform, ChangeDetectorRef,  Injector , OnDestroy} from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';


@Pipe({
    name: 'currencyConversion',
    standalone: true
})
export class CurrencyConversionPipe implements PipeTransform, OnDestroy   {
    storageVariableName: any = 'currency-conversation-data';
    private asyncPipe: AsyncPipe;
    rate: any = 1;
    currency: any = 'USD';
    constructor(private http: HttpClient, private _ref: ChangeDetectorRef,  private injector: Injector) {
        // this.getData();
        // const lp: any = localStorage.getItem(this.storageVariableName);
        // const lang = !!lp ? JSON.parse(lp).currency : 'USD';
        // this.getRate(lang);
        this.asyncPipe = new AsyncPipe(injector.get(ChangeDetectorRef));
    }
    ngOnDestroy() {
      this.asyncPipe.ngOnDestroy();
    }
    getData(): any {
        return JSON.parse(localStorage.getItem(this.storageVariableName) || '{}');
    }
    transform(value: number, currentCurrency: string,  showSymbol: boolean = true): Observable<any> {
      if(!value){
        return of(null);
      }
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
            console.log(444, response);
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
    // transform(value: number, currentCurrency: string,  showSymbol: boolean = true): any {
    //   const dt: any = {};
    //   let newValue: Observable<number> = of(value).pipe();
    //   return this.asyncPipe.transform(newValue.pipe(
    //     map(async v => {
    //       const response = await this.http.get<any>('https://api.soctrip.com/billing/exchange-rate/USD/' + currentCurrency).toPromise();
    //       if (!!response.success) {
    //         this.rate =  response.data;
    //         this.currency = currentCurrency;
    //         dt.rate = response.data;
    //         dt.currency = currentCurrency;
    //         dt.expiry = new Date().getTime() + 1 * 60 * 60 * 1000;
    //         dt.hash = dt.currency + dt.rate + dt.expiry;
    //         localStorage.setItem(this.storageVariableName, JSON.stringify(dt));
    //         console.log(444, response);
    //       }
    //       if (showSymbol) {
    //           return (value * this.rate).toLocaleString('en-US', {
    //               style: 'currency',
    //               currency: this.currency,
    //           });
    //       } else {
    //           return (value * this.rate).toLocaleString('en-US', {
    //               style: 'decimal',
    //               maximumFractionDigits: 2,
    //           });
    //       } 
    //     })
    //   ));
        
    //   // this.getRate(currentCurrency)
    //   // if (showSymbol) {
    //   //     return (value * this.rate).toLocaleString('en-US', {
    //   //         style: 'currency',
    //   //         currency: this.currency,
    //   //     });
    //   // } else {
    //   //     return (value * this.rate).toLocaleString('en-US', {
    //   //         style: 'decimal',
    //   //         maximumFractionDigits: 2,
    //   //     });
    //   // }
    // }
    static isRequestingExchangerate: boolean = false;

    getRate(currency: string)  {
        const dt: any = {};
        this.http
            .get<any>('https://api.soctrip.com/billing/exchange-rate/USD/' + currency)
            .subscribe(
                (data) => {
                    if (!!data.success) {
                        this.rate =  data.data;
                        this.currency = currency;
                        dt.rate = data.data;
                        dt.currency = currency;
                        dt.expiry = new Date().getTime() + 1 * 60 * 60 * 1000;
                        dt.hash = dt.currency + dt.rate + dt.expiry;
                        localStorage.setItem(this.storageVariableName, JSON.stringify(dt));
                        this._ref.markForCheck();
                        console.log(444);
                      }
                },
                (error) => {
                    CurrencyConversionPipe.isRequestingExchangerate = false;
                }
            );
    }
}
