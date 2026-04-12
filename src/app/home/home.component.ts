import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import IDeal from '../models/deal.model';
import { DealService } from '../services/deal.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    CurrencyPipe,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'dealName',
    'price',
    'address',
    'noi',
    'capRate',
  ];
  initDataSource: IDeal[] = [];
  filteredDataSource: IDeal[] = [];
  search = '';

  constructor(private dealsService: DealService) {}

  async ngOnInit() {
    try {
      const deals = await this.dealsService.getDeals();
      this.initDataSource = deals;
      this.filteredDataSource = this.initDataSource;
    } catch (error) {
      console.error(error);
    }
  }

  onSearchChange(searchText: string) {
    if (searchText.length >= 3) {
      this.filteredDataSource = this.initDataSource.filter((data) => {
        return (
          this.cleanData(data.dealName).includes(this.cleanData(searchText)) ||
          `$${data.price.toString()}`.includes(searchText)
        );
      });
    } else {
      this.filteredDataSource = this.initDataSource;
    }
  }

  private cleanData(text: string) {
    return text.toLowerCase().replaceAll(/[^A-Za-z0-9\s]/g, '');
  }
}
