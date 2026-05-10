# Taxi Microservices Platform

Микросервисное приложение для заказа такси. Демонстрирует архитектуру микросервисов, работу с PostgreSQL, REST-взаимодействие и многопоточную обработку.

---

## Основные возможности

- Регистрация пассажиров и водителей
- Создание и управление поездками
- Автоматическое назначение водителя
- Пул воркеров для обработки уведомлений
- Расчёт стоимости поездки по расстоянию
- Рейтинг водителей
- Статистика поездок

---

## Архитектура

4 микросервиса + фронтенд:

### User Service (port 8081)
- CRUD пассажиров и водителей
- Поиск свободного водителя

### Trip Service (port 8082)
- Создание поездки с автоматическим назначением водителя
- Расчёт цены
- Смена статусов поездки
- Рейтинг поездки

### Notification Service (port 8083)
- Фоновая обработка задач (worker pool из 4 потоков)
- Retry до 3 попыток
- Graceful shutdown

### API Gateway (port 8080)
- Единая точка входа для всех сервисов

### Frontend (port 4200)
- Angular SPA с формами регистрации и заказа поездок

---

## Технологии

- Java 21 + Spring Boot
- Spring Data JPA + Hibernate
- PostgreSQL
- Docker Compose
- Angular 19
- Swagger (OpenAPI)

---

## Запуск

### Предварительные требования

- Docker Desktop
- PowerShell или терминал

### 1. Клонировать репозиторий


git clone <repo-url>
cd service-taxi
2. Запустить все сервисы
bash
docker compose up -d --build
3. Создать схемы в БД
bash
docker exec -it postgres psql -U postgres -d taxi -c "CREATE SCHEMA IF NOT EXISTS user_service; CREATE SCHEMA IF NOT EXISTS trip_service; CREATE SCHEMA IF NOT EXISTS notification_service;"
4. Перезапустить сервисы
bash
docker compose restart user-service trip-service notification-service
Доступы
Сервис	URL
Фронтенд	http://localhost:4200
API Gateway	http://localhost:8080
User Service Swagger	http://localhost:8081/swagger-ui/index.html
Trip Service Swagger	http://localhost:8082/swagger-ui/index.html
Notification Service Swagger	http://localhost:8083/swagger-ui/index.html
pgAdmin	http://localhost:5050
pgAdmin: admin@admin.com / admin

Использование
Через веб-интерфейс
Откройте http://localhost:4200

Зарегистрируйте пассажира и водителя

Создайте поездку, указав ID пассажира

Через API
bash
# Создать пассажира
curl -X POST http://localhost:8080/api/passengers \
  -H "Content-Type: application/json" \
  -d '{"name":"Иван","email":"ivan@mail.ru","phone":"+79001234567"}'

# Создать водителя
curl -X POST http://localhost:8080/api/drivers \
  -H "Content-Type: application/json" \
  -d '{"name":"Петр","email":"petr@mail.ru","phone":"+79007654321","licenseNumber":"AB1234"}'

# Создать поездку
curl -X POST http://localhost:8080/api/trips \
  -H "Content-Type: application/json" \
  -d '{"passengerId":1,"origin":"Москва, Тверская","destination":"Москва, Шереметьево"}'
База данных
PostgreSQL с 3 схемами:

user_service — passengers, drivers

trip_service — trips

notification_service — notification_tasks

Подключение через pgAdmin: http://localhost:5050

Host: postgres

Port: 5432

Database: taxi

User: postgres

Password: postgres

Основной сценарий работы
Регистрация пассажира

Регистрация водителя

Создание поездки

Автоматическое назначение водителя

Расчёт стоимости по расстоянию

Смена статусов поездки

Обработка уведомлений в фоне