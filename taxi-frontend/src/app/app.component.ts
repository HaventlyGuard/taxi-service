import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header>
      <div class="header-content">
        <a routerLink="/" class="logo">TaxiApp</a>
        <nav>
          <a routerLink="/">Главная</a>
          <a routerLink="/passengers/new">Пассажиры</a>
          <a routerLink="/drivers/new">Водители</a>
          <a routerLink="/trips/new">Поездки</a>
        </nav>
      </div>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 0 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
    }
    
    .logo {
      color: white;
      text-decoration: none;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    
    nav {
      display: flex;
      gap: 5px;
      background: none;
      padding: 0;
      box-shadow: none;
      z-index: auto;
      position: static;
    }
    
    nav a {
      color: rgba(255,255,255,0.9);
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 6px;
      transition: all 0.3s;
      font-size: 14px;
    }
    
    nav a:hover {
      background: rgba(255,255,255,0.2);
      color: white;
    }
    
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 30px 20px;
    }
  `]
})
export class AppComponent {}