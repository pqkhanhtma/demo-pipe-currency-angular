import { Injectable } from '@angular/core';

interface City {
  name: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currency:  City;
  constructor() {
    this.currency = {} as City;
  }

  getCurrency() : String{
    return this.currency.code;
  }
  getStore() : City {
    return this.currency;
  }
  setCurrency(c: City){
     this.currency = c;
  }
}
