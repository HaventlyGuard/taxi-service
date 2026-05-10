import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Driver {
  id?: number;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
}

@Injectable({ providedIn: 'root' })
export class DriverService {
  constructor(private api: ApiService) {}
  create(d: Driver): Observable<Driver> { return this.api.post('drivers', d); }
}
