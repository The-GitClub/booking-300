import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../Interfaces/User';
import { catchError, map } from 'rxjs/operators';

//import the MatSnackBar Messages Service to notify the user of an error
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Injectable()
export class UserService {
   //positions for the alert
   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'bottom';
   
  userr: any;

  BASE_URL = environment.API_URL;
  LoginState: boolean;

  constructor(private _http:HttpClient,  private _snackBar: MatSnackBar) { }

  register(body:any){
    //return this._http.get(`${this.BASE_URL}/users/register`,{
    return this._http.post<any>('http://127.0.0.1:3000/users/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
    .pipe(catchError(this.handleError));
  }

  login(body:any){
    //return this._http.get(`${this.BASE_URL}/users/login`,{
    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
    .pipe(catchError(this.handleError));
  }

  storeUserData(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userr = user;
    console.log("USER IN SERVICE FILE", this.userr);
  }

  user(){
    //return this._http.get(`${this.BASE_URL}/users`,{
    return this._http.get('http://127.0.0.1:3000/users/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
    .pipe(catchError(this.handleError));
  }

  getBookings(id: string): Observable<User> {
    return this._http.get<User>(`${this.BASE_URL}/users/${id}/bookings`);
  }
  
  loggedIn() {
    this.userr = localStorage.getItem('user');
    if(this.userr == null)
    {
      return false;
    }
    else if(this.userr != null)
    {
      return true;
    }
  }

  logout(){
    this.loggedIn();
    localStorage.clear();
    //return this._http.get(`${this.BASE_URL}/users/logout`,{
    return this._http.get('http://127.0.0.1:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
    .pipe(catchError(this.handleError));
  }

  handleError(err){
    console.log("ERROR MESSAGE IN SERVICE FILE : " , err.error.message);
    return throwError(err);
  }
}


