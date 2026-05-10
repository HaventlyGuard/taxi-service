import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PassengerFormComponent } from './components/passenger-form/passenger-form.component';
import { DriverFormComponent } from './components/driver-form/driver-form.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'passengers/new', component: PassengerFormComponent },
  { path: 'drivers/new', component: DriverFormComponent },
  { path: 'trips/new', component: TripFormComponent },
];