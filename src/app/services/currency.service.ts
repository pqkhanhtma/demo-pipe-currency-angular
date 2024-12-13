import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currency:  String;
  constructor() {
    this.currency = '';
  }

  get getCurrency() : String{
    return this.currency;
  }
  setCurrency(c: String){
     this.currency = c;
  }
}
