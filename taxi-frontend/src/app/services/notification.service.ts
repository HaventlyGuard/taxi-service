import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Notification {
  id?: number;
  tripId: number;
  recipientType: string;
  recipientId: number;
  message: string;
  status?: string;
  attempts?: number;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private api: ApiService) { }

  create(notification: Notification): Observable<Notification> {
    return this.api.post<Notification>('notifications', notification);
  }

  getByTrip(tripId: number): Observable<Notification[]> {
    return this.api.get<Notification[]>(`notifications?tripId=${tripId}`);
  }
}