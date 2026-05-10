import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripService, Trip } from '../../services/trip.service';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>Заказать поездку</h2>
      <form (ngSubmit)="onSubmit()">
        <input [(ngModel)]="trip.passengerId" name="passengerId" type="number" placeholder="ID пассажира" required>
        <input [(ngModel)]="trip.origin" name="origin" placeholder="Откуда" required>
        <input [(ngModel)]="trip.destination" name="destination" placeholder="Куда" required>
        <button type="submit">Заказать</button>
      </form>
      @if (success) {
        <div class="success">
          <p>Поездка создана!</p>
          <p>ID: {{ createdTrip?.id }}</p>
          <p>Цена: {{ createdTrip?.price | currency:'RUB' }}</p>
          <p>Дистанция: {{ createdTrip?.distanceKm }} км</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .form-container { max-width: 400px; margin: 20px auto; padding: 20px; }
    input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; }
    button { width: 100%; padding: 10px; background: #ffc107; color: #333; border: none; border-radius: 4px; cursor: pointer; }
    .success { background: #d4edda; padding: 15px; margin-top: 10px; border-radius: 4px; }
  `]
})
export class TripFormComponent {
  trip: Trip = { passengerId: 0, origin: '', destination: '' };
  success = false;
  createdTrip?: Trip;

  constructor(private tripService: TripService) {}

  onSubmit(): void {
    this.tripService.create(this.trip).subscribe({
      next: (t) => {
        this.success = true;
        this.createdTrip = t;
      },
      error: (e) => alert('Ошибка: ' + e.message)
    });
  }
}