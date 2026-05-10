import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Passenger {
  id?: number;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private api: ApiService) { }

  create(passenger: Passenger): Observable<Passenger> {
    return this.api.post<Passenger>('passengers', passenger);
  }

  getById(id: number): Observable<Passenger> {
    return this.api.get<Passenger>(`passengers/${id}`);
  }

  getAll(): Observable<Passenger[]> {
    return this.api.get<Passenger[]>('passengers');
  }
}