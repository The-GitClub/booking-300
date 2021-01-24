import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

//import the MatSnackBar Messages Service to notify the user of an error
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
//validate the form
import { ValidationService } from '../../services/validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //positions for the alert
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  //boolean for showing/hiding password
  hide = true;

  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });
  constructor(private _router:Router, private _userService:UserService,private _snackBar: MatSnackBar, private _validate:ValidationService) { }

  ngOnInit() {
  }

  login(){

    if (!this._validate.validateLogin(this.loginForm)) {
      return false;
    }

    if (!this._validate.validateEmail(this.loginForm.controls.email.value)) {
      this._snackBar.open("Please Enter A Valid Email", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    }

    this._userService.login(JSON.stringify(this.loginForm.value)).subscribe(data => {
      if((data as any).success) {
        //console.log("LOGIN SUCCESS: ", (data as any).success);
        this._router.navigate(['/user']);
        this._snackBar.open((data as any).message, '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } 
    }, error => {
      //console.log("ERROR IN LOGIN FILE", (error as any).error.message);
      this._snackBar.open((error as any).error.message, '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }
}
