import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import IDeal from '../models/deal.model';
import { DealService } from '../services/deal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe],
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
  dataSource: IDeal[] = [];

  constructor(private dealsService: DealService) {}

  async ngOnInit() {
    try {
      const deals = await this.dealsService.getDeals();
      this.dataSource = deals;
    } catch (error) {
      console.error(error);
    }
  }
}
