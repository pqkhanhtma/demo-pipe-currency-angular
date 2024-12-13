import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currency:  string;
  constructor() {
    this.currency = '';
  }

  get getCurrency() : string{
    return this.currency;
  }
  setCurrency(c: string){
    console.log(c, 'string');
     this.currency = c;
  }
}
