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
export class ManagerGuard implements CanActivate {
  //positions for the alert
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  constructor (private _user:UserService, private router:Router, private _snackBar: MatSnackBar){

  }

  canActivate() {
    if(this._user.ObtainRole() != 'manager') {
      this.router.navigate(['/']);
      this._snackBar.open("Please Log In As A Manager First", "", {
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