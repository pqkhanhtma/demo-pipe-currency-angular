import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select, SelectChangeEvent } from 'primeng/select';
import { CurrencyService } from '../../services/currency.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Select, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private currencyService: CurrencyService;
  constructor(cS: CurrencyService, private route: ActivatedRoute){
    this.currencyService = cS;
    // if(localStorage.getItem('currency')){
    //   this.selectedCurrency = localStorage.getItem('currency') ?? "";
    //   this.currencyService.setCurrency(this.selectedCurrency);
    // }
    this.route.queryParams
      .subscribe(params => {
        if(params['currency']){
          this.setCurrency(params['currency']);
        }
        else{
          if(localStorage.getItem('currency-conversation-data')){
            this.setCurrency(JSON.parse(localStorage.getItem('currency-conversation-data') ?? "{}").currency ?? "USD");
          }
        }
      }
    );
  }
  currency: String[] | undefined;

  selectedCurrency: string | undefined;

  setCurrency(c: string){
    this.selectedCurrency = c;
    console.log(c, 'string');
    this.currencyService.setCurrency(this.selectedCurrency);
  }
  ngOnInit() {
      this.currency = [
        'VND',
        'USD',
        'EUR',
        'INR',
        'AUD',
      ];
  }
  onChange(e: SelectChangeEvent){
    this.currencyService.setCurrency(e.value)
    console.log(e.value, 'string');
    // localStorage.setItem('currency', e.value);
  }
}
