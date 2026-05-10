import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Driver {
  id?: number;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  status?: string;
  rating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private api: ApiService) { }

  create(driver: Driver): Observable<Driver> {
    return this.api.post<Driver>('drivers', driver);
  }

  getById(id: number): Observable<Driver> {
    return this.api.get<Driver>(`drivers/${id}`);
  }

  getAll(): Observable<Driver[]> {
    return this.api.get<Driver[]>('drivers');
  }

  updateStatus(id: number, status: string): Observable<Driver> {
    return this.api.patch<Driver>(`drivers/${id}/status`, { status });
  }
}