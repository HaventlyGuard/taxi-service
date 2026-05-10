import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Trip {
  id?: number;
  passengerId: number;
  origin: string;
  destination: string;
  price?: number;
  distanceKm?: number;
}

@Injectable({ providedIn: 'root' })
export class TripService {
  constructor(private api: ApiService) {}
  create(t: Trip): Observable<Trip> { return this.api.post('trips', t); }
}
