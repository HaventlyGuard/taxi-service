import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Passenger {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class PassengerService {
  constructor(private api: ApiService) {}
  create(p: Passenger): Observable<Passenger> { return this.api.post('passengers', p); }
}
