import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripService, Trip } from '../../services/trip.service';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h2>Заказать поездку</h2>
      <input [(ngModel)]="t.passengerId" type="number" placeholder="ID пассажира">
      <input [(ngModel)]="t.origin" placeholder="Откуда">
      <input [(ngModel)]="t.destination" placeholder="Куда">
      <button (click)="save()">Заказать</button>
      @if (done) {
        <div class="success">
          Поездка создана!<br>
          ID: {{ id }}<br>
          Цена: {{ price }} RUB<br>
          Дистанция: {{ distance }} км
        </div>
      }
    </div>
  `
})
export class TripFormComponent {
  t: Trip = { passengerId: 0, origin: '', destination: '' };
  done = false;
  id?: number;
  price?: number;
  distance?: number;
  constructor(private service: TripService) {}
  save() {
    this.service.create(this.t).subscribe(r => {
      this.done = true;
      this.id = r.id;
      this.price = r.price;
      this.distance = r.distanceKm;
      this.t = { passengerId: 0, origin: '', destination: '' };
    });
  }
}