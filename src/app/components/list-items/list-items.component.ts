import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyPipePipe } from '../../pipe/currency-pipe.pipe';
import { CurrencyConversionPipe } from '../../pipe/currency-conversion-pipe.pipe';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [CurrencyPipePipe, CurrencyConversionPipe, AsyncPipe],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css',
})
export class ListItemsComponent {
  public currencyService: CurrencyService;
  constructor(cS: CurrencyService){
    this.currencyService = cS;
  }
}
