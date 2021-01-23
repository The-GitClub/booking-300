import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from '../../services/user/user.service';

import { MatCard } from '@angular/material/card';
//import the MatSnackBar Messages Service to notify the user of an error
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //positions for the alert
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  hide1 = true;
  hide2 = true;

  registerForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    cpass:new FormControl(null,Validators.required)
  })
  constructor(private _router:Router, private _userService:UserService,  private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  moveToLogin(){
    this._router.navigate(['/login']);
  }

  register(){
    if((this.registerForm.controls.email.value == "" && this.registerForm.controls.username.value == "")){
      console.log('Username and Email are Required');
      this._snackBar.open('Username and Email are Required', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
    else if((!this.registerForm.controls.email.valid  && 
    !this.registerForm.controls.username.valid && 
    !this.registerForm.controls.pass.valid  && 
    !this.registerForm.controls.cpass.valid
     )){
      console.log('Username and Email are Required');
      this._snackBar.open('Username, Password and Email are Required', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
    else if(!this.registerForm.controls.username.valid){
      console.log('Username is Required');
      this._snackBar.open('Username is Required', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
    else if(!this.registerForm.controls.email.valid){
      console.log('Email is Required');
      this._snackBar.open('Email is Required', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
    else if(!this.registerForm.controls.password.valid || !this.registerForm.controls.cpass.valid){
      console.log('Password is Required');
      this._snackBar.open('Password is Required', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
    else if(this.registerForm.controls.password.value != this.registerForm.controls.cpass.value){
      console.log('Passwords Do Not Match'); 
      this._snackBar.open('Passwords Do Not Match', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }
    else if(!this.registerForm.valid){
      console.log('Invalid Form');
      this._snackBar.open('Invalid Form', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }

    this._userService.register(JSON.stringify(this.registerForm.value)).subscribe(data => {
      if((data as any).success) {
        console.log("SUCCESS: ", (data as any).success);
        this.moveToLogin();
        this._snackBar.open((data as any).message, '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } 
      else {
        this._snackBar.open((data as any).message, '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      this._router.navigate(['register']);
      }
      //error=>console.error(error);
    // console.log(JSON.stringify(this.registerForm.value));
    });
  }
}
