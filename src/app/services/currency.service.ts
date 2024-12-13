import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currency:  string | undefined;
  constructor() {
    this.currency = undefined;
  }

  get getCurrency() : string{
    return this.currency ?? 'USD';
  }
  setCurrency(c: string){
     this.currency = c;
  }
}
