import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService, Driver } from '../../services/driver.service';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-container">
      <h2>Регистрация водителя</h2>
      <form (ngSubmit)="onSubmit()">
        <input [(ngModel)]="driver.name" name="name" placeholder="Имя" required>
        <input [(ngModel)]="driver.email" name="email" placeholder="Email" required>
        <input [(ngModel)]="driver.phone" name="phone" placeholder="Телефон" required>
        <input [(ngModel)]="driver.licenseNumber" name="licenseNumber" placeholder="Номер прав" required>
        <button type="submit">Зарегистрировать</button>
      </form>
      @if (success) {
        <p class="success">Водитель создан! ID: {{ createdId }}</p>
      }
    </div>
  `,
  styles: [`
    .form-container { max-width: 400px; margin: 20px auto; padding: 20px; }
    input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; }
    button { width: 100%; padding: 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .success { color: green; margin-top: 10px; }
  `]
})
export class DriverFormComponent {
  driver: Driver = { name: '', email: '', phone: '', licenseNumber: '' };
  success = false;
  createdId?: number;

  constructor(private driverService: DriverService) {}

  onSubmit(): void {
    this.driverService.create(this.driver).subscribe({
      next: (d) => {
        this.success = true;
        this.createdId = d.id;
      },
      error: (e) => alert('Ошибка: ' + e.message)
    });
  }
}