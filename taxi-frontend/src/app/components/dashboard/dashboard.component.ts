import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TripService, TripStats } from '../../services/trip.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="dashboard">
      <h1>🚕 Сервис такси</h1>
      @if (stats) {
        <div class="stats">
          <div class="stat-card">
            <h3>Поездок сегодня</h3>
            <p>{{ stats.count }}</p>
          </div>
          <div class="stat-card">
            <h3>Средняя цена</h3>
            <p>{{ stats.avgPrice | currency:'RUB' }}</p>
          </div>
        </div>
      } @else {
        <p>Загрузка статистики...</p>
      }
    </div>
  `,
  styles: [`
    .dashboard { padding: 20px; }
    .stats { display: flex; gap: 20px; margin-top: 20px; }
    .stat-card { 
      background: #f0f0f0; 
      padding: 20px; 
      border-radius: 8px; 
      flex: 1;
      text-align: center;
    }
    .stat-card h3 { color: #666; }
    .stat-card p { font-size: 24px; font-weight: bold; color: #333; }
  `]
})
export class DashboardComponent implements OnInit {
  stats?: TripStats;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getStats().subscribe({
      next: (s) => this.stats = s,
      error: () => console.log('Stats not available')
    });
  }
}