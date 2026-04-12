import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import IDeal from '../models/deal.model';
import { DealService } from '../services/deal.service';
import { AddDealDialog } from '../add-deal-dialog/add-deal-dialog.component';

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
    MatButton,
    MatButtonModule,
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

  constructor(
    private dealsService: DealService,
    public dialog: MatDialog,
  ) {}

  async ngOnInit() {
    await this.getDeals();
  }

  private async getDeals() {
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

  async addDeal() {
    const dialogRef = this.dialog.open(AddDealDialog, {
      panelClass: 'app-custom-dialog',
    });
    dialogRef.afterClosed().subscribe(() => this.refreshTable());
  }

  private async refreshTable() {
    await this.getDeals();
  }
}
