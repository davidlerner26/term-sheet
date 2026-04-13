import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/nav/nav.component';
import { LoadingService } from './services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, MatProgressSpinnerModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadingSubscription = new Subscription();

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingSubscription =
      this.loadingService.$loadingUserMerchant.subscribe({
        next: (isLoading: boolean) => {
          this.isLoading = isLoading;
        },
      });
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }
}
