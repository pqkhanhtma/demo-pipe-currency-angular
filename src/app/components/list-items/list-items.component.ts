import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyPipePipe } from '../../pipe/currency-pipe.pipe';
@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [CurrencyPipePipe],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css',
})
export class ListItemsComponent {
  public currencyService: CurrencyService;
  constructor(cS: CurrencyService){
    this.currencyService = cS;
  }
}
