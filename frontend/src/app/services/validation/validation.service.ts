import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

//import the MatSnackBar Messages Service to notify the user of an error
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class ValidationService {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  //form group for the register form
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
  });

  //form group for the login form
  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });

  constructor(private _snackBar: MatSnackBar) {}

  validateRegister(_registerForm) {
    this.registerForm = _registerForm;
    console.log("REGISTER VALIDATION STARTED");
    if (
      !this.registerForm.controls.email.valid &&
      !this.registerForm.controls.username.valid &&
      !this.registerForm.controls.password.valid &&
      !this.registerForm.controls.cpass.valid
    ) {
      console.log("Username and Email are Required");
      this._snackBar.open("Username, Password and Email are Required", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (
      !this.registerForm.controls.email.valid &&
      !this.registerForm.controls.username.valid
    ) {
      console.log("Username and Email are Required");
      this._snackBar.open("Username and Email are Required", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (
      !this.registerForm.controls.username.valid &&
      !this.registerForm.controls.password.valid
    ) {
      console.log("Username and Email are Required");
      this._snackBar.open("Username and Password are Required", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (
      !this.registerForm.controls.username.valid &&
      !this.registerForm.controls.cpass.valid
    ) {
      console.log("Username and Email are Required");
      this._snackBar.open("Username and Password are Required", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (!this.registerForm.controls.username.valid) {
      console.log("Username is Required");
      this._snackBar.open("Username is Required", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (!this.registerForm.controls.email.valid) {
      console.log("Email is Required");
      this._snackBar.open("Email is Required", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (
      !this.registerForm.controls.password.valid ||
      !this.registerForm.controls.cpass.valid
    ) {
      console.log("Password is Required");
      this._snackBar.open("Password is Required", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (
      this.registerForm.controls.password.value !=
      this.registerForm.controls.cpass.value
    ) {
      console.log("Passwords Do Not Match");
      this._snackBar.open("Passwords Do Not Match", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (!this.registerForm.valid) {
      console.log("Invalid Form");
      this._snackBar.open("Invalid Form", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (this.registerForm.valid) {
      console.log("Valid Form");
      return true;
    }
  }

  validateEmail(email){
    //taken from StackOverFlow
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(regex.test(email));
    return regex.test(email);
  }

  validateRegisterPassword(password){
   // Minimum eight characters, maximum 30, letters and numbers:
    const regex = /^[A-Za-z\d]{8,30}$/;
    console.log(regex.test(password));
    return regex.test(password);
  }


  validateLogin(_loginForm) {
    this.loginForm = _loginForm;
    console.log("LOGIN VALIDATION STARTED");
    if (
      !this.loginForm.controls.email.valid &&
      !this.loginForm.controls.password.valid
    ) {
      console.log("Email and Password are Required");
      this._snackBar.open("Email and Password are Required", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    }
    else if (
      !this.loginForm.controls.email.valid) {
      console.log("Email Required");
      this._snackBar.open("Email Required", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    }
    else if (
      !this.loginForm.controls.password.valid) {
      console.log("Password Required");
      this._snackBar.open("Password Required", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    }
    else{
      //console.log("Valid Form");
      return true;
    }
  }
}
