import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user/user.service';
//import the MatSnackBar Messages Service to notify the user of an error
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable()
export class AuthGuard implements CanActivate {
   //positions for the alert
      horizontalPosition: MatSnackBarHorizontalPosition = "center";
      verticalPosition: MatSnackBarVerticalPosition = "bottom";

  constructor (private userService:UserService, private router:Router,  private _snackBar: MatSnackBar,){

  }

  canActivate() {
    if(this.userService.loggedIn()) {
      this.router.navigate(['/']);
      this._snackBar.open("Please Login First", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } 
    else{
      return true;
    }
  }
}