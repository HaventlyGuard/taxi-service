import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Trip {
  id?: number;
  passengerId: number;
  driverId?: number;
  origin: string;
  destination: string;
  status?: string;
  price?: number;
  distanceKm?: number;
  durationMin?: number;
  rating?: number;
  createdAt?: string;
}

export interface TripStats {
  count: number;
  avgPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private api: ApiService) { }

  create(trip: Trip): Observable<Trip> {
    return this.api.post<Trip>('trips', trip);
  }

  getById(id: number): Observable<Trip> {
    return this.api.get<Trip>(`trips/${id}`);
  }

  getByPassenger(passengerId: number): Observable<Trip[]> {
    return this.api.get<Trip[]>(`trips?passengerId=${passengerId}`);
  }

  updateStatus(id: number, status: string): Observable<Trip> {
    return this.api.patch<Trip>(`trips/${id}/status`, { status });
  }

  rateTrip(id: number, rating: number): Observable<Trip> {
    return this.api.patch<Trip>(`trips/${id}/rate`, { rating });
  }

  getStats(): Observable<TripStats> {
    return this.api.get<TripStats>('trips/stats/today');
  }
}