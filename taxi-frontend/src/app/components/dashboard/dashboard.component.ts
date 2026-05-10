import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="welcome">
      <h1>Добро пожаловать в TaxiApp</h1>
      <p>Выберите действие для начала работы</p>
      
      <div class="cards">
        <a routerLink="/passengers/new" class="card purple">
          <span class="card-icon">P</span>
          <h3>Пассажиры</h3>
          <p>Регистрация новых пользователей</p>
        </a>
        
        <a routerLink="/drivers/new" class="card blue">
          <span class="card-icon">D</span>
          <h3>Водители</h3>
          <p>Добавление водителей в систему</p>
        </a>
        
        <a routerLink="/trips/new" class="card green">
          <span class="card-icon">T</span>
          <h3>Поездки</h3>
          <p>Создание и отслеживание заказов</p>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .welcome {
      text-align: center;
      padding: 40px 0;
    }
    
    h1 {
      color: #333;
      margin-bottom: 10px;
    }
    
    p {
      color: #666;
      margin-bottom: 50px;
    }
    
    .cards {
      display: flex;
      gap: 25px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .card {
      background: white;
      border-radius: 12px;
      padding: 30px 25px;
      width: 230px;
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      transition: transform 0.3s, box-shadow 0.3s;
      border-top: 4px solid;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }
    
    .card.purple { border-color: #667eea; }
    .card.blue { border-color: #4facfe; }
    .card.green { border-color: #43e97b; }
    
    .card-icon {
      display: block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border-radius: 50%;
      margin: 0 auto 15px;
      font-size: 20px;
      font-weight: bold;
      color: white;
    }
    
    .purple .card-icon { background: #667eea; }
    .blue .card-icon { background: #4facfe; }
    .green .card-icon { background: #43e97b; }
    
    .card h3 {
      color: #333;
      margin-bottom: 8px;
    }
    
    .card p {
      color: #999;
      font-size: 14px;
      margin-bottom: 0;
    }
  `]
})
export class DashboardComponent {}