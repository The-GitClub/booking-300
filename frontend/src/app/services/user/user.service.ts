import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { User } from "../../Interfaces/User";
import { catchError, map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

//import the MatSnackBar Messages Service to notify the user of an error
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Router } from "@angular/router";

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
      .post<any>("http://127.0.0.1:3000/users/register-customer", body, {
        observe: "body",
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      })
      .pipe(catchError(this.handleError));
  }

  login(body: any): Observable<User> {
    return this._http
      .post("http://127.0.0.1:3000/users/login", body, {
        observe: "body",
        withCredentials: true,
        headers: new HttpHeaders().append("Content-Type", "application/json"),
      })
      .pipe(
        map((response: any) => {
          const user = response;

          console.log(user.success);
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
    console.log("ID IN THE ObtainID method", this.id);
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
