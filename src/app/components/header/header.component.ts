import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

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
}
