import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService, Driver } from '../../services/driver.service';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <h2>Регистрация водителя</h2>
      <input [(ngModel)]="d.name" placeholder="Имя">
      <input [(ngModel)]="d.email" placeholder="Email" type="email">
      <input [(ngModel)]="d.phone" placeholder="Телефон">
      <input [(ngModel)]="d.licenseNumber" placeholder="Номер прав">
      <button (click)="save()">Зарегистрироваться</button>
      @if (done) {
        <div class="success">Водитель создан! ID: {{ id }}</div>
      }
    </div>
  `
})
export class DriverFormComponent {
  d: Driver = { name: '', email: '', phone: '', licenseNumber: '' };
  done = false;
  id?: number;
  constructor(private service: DriverService) {}
  save() {
    this.service.create(this.d).subscribe(r => {
      this.done = true;
      this.id = r.id;
      this.d = { name: '', email: '', phone: '', licenseNumber: '' };
    });
  }
}