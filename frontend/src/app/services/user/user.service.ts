import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../Interfaces/User';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  userr: User;
  BASE_URL = environment.API_URL;

  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post<any>('http://127.0.0.1:3000/users/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
    .pipe(map((res: HttpResponse<JSON>) => res));;
  }

  // registerUser(user) {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http
  //     .post<any>('http://localhost:3000/users/register', user, {
  //       headers: headers,
  //     })
  //     .pipe(map((res: HttpResponse<JSON>) => res));
  // }

  login(body:any){
    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  user(){
    return this._http.get('http://127.0.0.1:3000/users/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  getBookings(id: string): Observable<User> {
    return this._http.get<User>(`${this.BASE_URL}/users/${id}/bookings`);
  }

  logout(){
    return this._http.get('http://127.0.0.1:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

}
