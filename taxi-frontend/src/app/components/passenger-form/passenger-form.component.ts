import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PassengerService, Passenger } from '../../services/passenger.service';

@Component({
  selector: 'app-passenger-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h2>Регистрация пассажира</h2>
      <input [(ngModel)]="p.name" placeholder="Имя">
      <input [(ngModel)]="p.email" placeholder="Email" type="email">
      <input [(ngModel)]="p.phone" placeholder="Телефон">
      <button (click)="save()">Зарегистрироваться</button>
      @if (done) {
        <div class="success">Пассажир создан! ID: {{ id }}</div>
      }
    </div>
  `
})
export class PassengerFormComponent {
  p: Passenger = { name: '', email: '', phone: '' };
  done = false;
  id?: number;
  constructor(private service: PassengerService) {}
  save() {
    this.service.create(this.p).subscribe(r => {
      this.done = true;
      this.id = r.id;
      this.p = { name: '', email: '', phone: '' };
    });
  }
}