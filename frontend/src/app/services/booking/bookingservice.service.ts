import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Booking } from '../../Interfaces/Booking';
import { User } from '../../Interfaces/User';

const BASE_URL = environment.API_URL;

@Injectable()
export class BookingserviceService {
  // public user: User;
  // public booking: Booking;
  // private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }



  makeBooking = (id:string, data) => {
    return this.http.post(BASE_URL + `users/${id}/bookings`, data);
  };

  getBookings(id: string): Observable<Booking> {
    return this.http.get<Booking>(BASE_URL + `users/${id}/bookings`);
  }

  getBooking(id: string): Observable<Booking> {
    return this.http.get<Booking>(BASE_URL + `bookings/${id}`)
  }
  updateBooking(booking, data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(BASE_URL + `bookings/${booking._id}`, data, httpOptions).pipe(
      tap(updatedBooking => console.log(`updated booking = ${JSON.stringify(updatedBooking)}`)),
      // catchError(error => of(new Booking()))
    );
  }

  getBookingsForCancel(): Observable<Booking[]> {
    return this.http.get<Booking[]>(BASE_URL + `bookings`)
  }

  cancelBooking(id: string): Observable<any> {
    return this.http.delete(BASE_URL + `bookings/${id}`);
  }




  // createBooking(id: string, bookingDate: string, time: string, table: string, name: string, guests: number): Observable<Booking> {
  //   return this.http.post<Booking>(`${this.BASE_URL}/users/${id}/bookings`,
  //   {bookingDate, time, table, name, guests});
  // }

  getBookingsForAdmin = () => {
    return this.http.get(BASE_URL + "bookings");
  };

  getAllBookings = () => {
    return this.http.get(BASE_URL + "bookings/getAll");
  };

  deleteBooking = (id) => {
    return this.http.delete(BASE_URL + "bookings" + id);
  };


  sendEmailConfirmation = (message) => {
    return this.http.post(BASE_URL + 'nodemailer', message);
  };

  findBooking = (id) => {
    return this.http.get(BASE_URL + "bookings" + id);
  };
}
