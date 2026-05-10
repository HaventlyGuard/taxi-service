import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PassengerService, Passenger } from '../../services/passenger.service';

@Component({
  selector: 'app-passenger-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-container">
      <h2>Регистрация пассажира</h2>
      <form (ngSubmit)="onSubmit()">
        <input [(ngModel)]="passenger.name" name="name" placeholder="Имя" required>
        <input [(ngModel)]="passenger.email" name="email" placeholder="Email" required>
        <input [(ngModel)]="passenger.phone" name="phone" placeholder="Телефон" required>
        <button type="submit">Зарегистрировать</button>
      </form>
      @if (success) {
        <p class="success">Пассажир создан! ID: {{ createdId }}</p>
      }
    </div>
  `,
  styles: [`
    .form-container { max-width: 400px; margin: 20px auto; padding: 20px; }
    input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; }
    button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .success { color: green; margin-top: 10px; }
  `]
})
export class PassengerFormComponent {
  passenger: Passenger = { name: '', email: '', phone: '' };
  success = false;
  createdId?: number;

  constructor(private passengerService: PassengerService) {}

  onSubmit(): void {
    this.passengerService.create(this.passenger).subscribe({
      next: (p) => {
        this.success = true;
        this.createdId = p.id;
      },
      error: (e) => alert('Ошибка: ' + e.message)
    });
  }
}