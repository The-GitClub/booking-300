import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../Interfaces/User';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

//import the MatSnackBar Messages Service to notify the user of an error
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Injectable()
export class UserService {
   //positions for the alert
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    BASE_URL = environment.API_URL;
    authToken: any;
    userr: any;
    CredentialsUsed = false;
  constructor(private _http:HttpClient,  private _snackBar: MatSnackBar) { }

  register(body:any){
    //return this._http.get(`${this.BASE_URL}/users/register`,{ 
    return this._http.post<any>('http://127.0.0.1:3000/users/register-customer',body,{
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

  user() {
    this.loadToken();
    return this._http.get('http://127.0.0.1:3000/users/user', {
      withCredentials:true,
      headers:new HttpHeaders().append('Authorization', this.authToken)
    })
    .pipe(catchError(this.handleError));
  }

  getBookings(id: string): Observable<User> {
    return this._http.get<User>(`${this.BASE_URL}/users/${id}/bookings`);
  }
  
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.userr = user;
  }

  loggedIn() {
    this.loadToken();
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.authToken); //False if Token is good, True if not good
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  //clears local storage
  logout() {
    this.authToken = null;
    this.userr = null;
    localStorage.clear();
  }

  handleError(err){
    console.log("ERROR MESSAGE IN SERVICE FILE : " , err.error.message);
    return throwError(err);
  }
}


