import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { User } from "../../Interfaces/User";
import { catchError, map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

const BASE_URL = environment.API_URL;

//import the MatSnackBar Messages Service to notify the user of an error
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class UserService {
  //positions for the alert
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  BASE_URL = environment.API_URL;
  authToken: any;
  userr: any;
  CurrentUser: User;
  CredentialsUsed = false;
  id: string;
  role: string;
  username: string;
  email: string;
  success: boolean;
  TokenForIdentification:any;
  // helper for Decoding JWT
  helper = new JwtHelperService();

  currentUser: User = {
    _id: null,
    username: null,
    email: null,
    role: null,
  };

  constructor(private _http: HttpClient) {}

  register(body: any) {
    //return this._http.get(`${this.BASE_URL}/users/register`,{
    return this._http
      .post<any>( BASE_URL + "users/register-customer", body, {
        observe: "body",
        headers: new HttpHeaders().append("Content-Type", "application/json").append(InterceptorSkipHeader, ''),
      })
      .pipe(catchError(this.handleError));
  }

  registerStaff(body: any) {
    //return this._http.get(`${this.BASE_URL}/users/register`,{
    return this._http
      .post<any>( BASE_URL + "users/register-staff", body, {
        observe: "body",
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      })
      .pipe(catchError(this.handleError));
  }

  registerManager(body: any) {
    //return this._http.get(`${this.BASE_URL}/users/register`,{
    return this._http
      .post<any>( BASE_URL + "users/register-manager", body, {
        observe: "body",
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      })
      .pipe(catchError(this.handleError));
  }

  login(body: any): Observable<User> {
    return this._http
      .post( BASE_URL + "users/login", body, {
        observe: "body",
        headers: new HttpHeaders().append("Content-Type", "application/json").append(InterceptorSkipHeader, ''),
      })
      .pipe(
        map((response: any) => {
          const user = response;

          //if the returned status message is success, do
          if (user.success) {
            localStorage.setItem("token", user.token);
            const decodedToken = this.helper.decodeToken(response.token);

            this.currentUser._id = decodedToken.user_id;
            this.currentUser.username = decodedToken.username;
            this.currentUser.role = decodedToken.role;
            this.ObtainID();
            this.ObtainRole();
            return this.currentUser;
          }
        }, catchError(this.handleError))
      );
  }

  ObtainID() {
    this.TokenForIdentification = this.helper.decodeToken(localStorage.getItem("token"));
    this.id = this.TokenForIdentification.user_id;
    return this.id;
  }

  ObtainRole() {
    this.TokenForIdentification = this.helper.decodeToken(localStorage.getItem("token"));
    if(this.TokenForIdentification == null){
      return this.role = "";
    }
    else{
       this.role = this.TokenForIdentification.role;
       return this.role;
    }
  }

  getUserName() {
    this.TokenForIdentification = this.helper.decodeToken(localStorage.getItem("token"));
    if(this.TokenForIdentification == null){
      return this.username = "";
    }
    else{
       this.username = this.TokenForIdentification.username;
       return this.username;
    }
  }

  getEmail() {
    this.TokenForIdentification = this.helper.decodeToken(localStorage.getItem("token"));
    if(this.TokenForIdentification == null){
      return this.email = "";
    }
    else{
       this.email = this.TokenForIdentification.email;
       return this.email;
    }
  }

  getBookings(id: string): Observable<User> {
    return this._http.get<User>(`${this.BASE_URL}/users/${id}/bookings`);
  }

  loggedIn() {
    this.loadToken();
    return this.helper.isTokenExpired(this.authToken); //False if Token is good, True if not good
  }

  loadToken() {
    const token = localStorage.getItem("token");
    this.authToken = token;
  }

  returnToken(){
    const token = localStorage.getItem("token");
    this.authToken = token;
    return this?.authToken;
  }


  //clears local storage
  logout() {
    this.authToken = null;
    this.userr = null;
    localStorage.clear();
  }
  handleError(err) {
    return throwError(err);
  }
}
