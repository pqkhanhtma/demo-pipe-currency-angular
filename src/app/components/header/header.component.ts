import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select, SelectChangeEvent } from 'primeng/select';
import { CurrencyService } from '../../services/currency.service';

interface City {
    name: string;
    code: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Select, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private currencyService: CurrencyService;
  constructor(cS: CurrencyService){
    this.currencyService = cS;
    if(localStorage.getItem('currency')){
      this.selectedCity = JSON.parse(localStorage.getItem('currency') ?? "{}") as City;
      this.currencyService.setCurrency(this.selectedCity);
    }
    
  }
  currency: City[] | undefined;

  selectedCity: City | undefined;

  ngOnInit() {
      this.currency = [
          { name: 'Viet Nam', code: 'VN' },
          { name: 'My', code: 'USD' },
          { name: 'Anh', code: 'EURO' },
          { name: 'Nga', code: 'RUB' },
          { name: 'Phap', code: 'EURO' }
      ];
  }
  onChange(e: SelectChangeEvent){
    this.currencyService.setCurrency(e.value)
    console.log(e);
    localStorage.setItem('currency', JSON.stringify(e.value));
  }
}
