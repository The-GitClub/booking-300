import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking } from '../../Interfaces/Booking';
import { User } from '../../Interfaces/User';

@Injectable()
export class BookingserviceService {
  public user: User;
  public booking: Booking;
  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }
  

  createBooking(id: string, bookingDate: string, time: string, table: string, name: string, guests: number): Observable<Booking> {
    return this.http.post<Booking>(`${this.BASE_URL}/users/${id}/bookings`,
    {bookingDate, time, table, name, guests});
  }

  cancelBooking(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/bookings/${id}`);
  }

  getBookings(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.BASE_URL}/users/${id}/bookings`);
  }

  getBookingsForCancel(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.BASE_URL}/bookings`)
  }

}
