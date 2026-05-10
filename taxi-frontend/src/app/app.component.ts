import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Главная</a>
      <a routerLink="/passengers/new">Новый пассажир</a>
      <a routerLink="/drivers/new">Новый водитель</a>
      <a routerLink="/trips/new">Заказать поездку</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav {
      background: #333;
      padding: 15px;
      display: flex;
      gap: 20px;
    }
    nav a {
      color: white;
      text-decoration: none;
      padding: 5px 10px;
      border-radius: 4px;
    }
    nav a:hover {
      background: #555;
    }
  `]
})
export class AppComponent {
  title = 'taxi-frontend';
}
