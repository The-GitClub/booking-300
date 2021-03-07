import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Restaurant } from '../../Interfaces/Restaurant';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  _id: string;

  constructor(private http: HttpClient) { }

  getRestaurant(): Observable<Restaurant> {
    return this.http.get<Restaurant>(BASE_URL + "restaurant")
  }

  getSpecRestaurant(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(BASE_URL + `restaurant/${id}`)
  }


  updateRestaurant(restaurant, data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(BASE_URL + `restaurant/${restaurant._id}`, data, httpOptions).pipe(
      tap(updatedRestaurant => console.log(`updated restaurant = ${JSON.stringify(updatedRestaurant)}`)),
      // catchError(error => of(new Booking()))
    );
  }

}
