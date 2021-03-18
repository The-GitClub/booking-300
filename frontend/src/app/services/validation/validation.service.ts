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
  //positions for the alert
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
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  });

  constructor(private _snackBar: MatSnackBar) {}
// (validate that all required form fields have been filled in and that both entered passwords match)
  validateRegister(_registerForm) {
    this.registerForm = _registerForm;
    if (
      !this.registerForm.controls.email.valid &&
      !this.registerForm.controls.username.valid &&
      !this.registerForm.controls.password.valid &&
      !this.registerForm.controls.cpass.valid
    ) {
      this._snackBar.open("Username, Password and Email are Required", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (
      !this.registerForm.controls.email.valid &&
      !this.registerForm.controls.username.valid
    ) {
      this._snackBar.open("Username and Email are Required", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (
      !this.registerForm.controls.username.valid &&
      !this.registerForm.controls.password.valid
    ) {
      this._snackBar.open("Username and Password are Required", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (
      !this.registerForm.controls.username.valid &&
      !this.registerForm.controls.cpass.valid
    ) {
      this._snackBar.open("Username and Password are Required", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (!this.registerForm.controls.username.valid) {
      this._snackBar.open("Username is Required", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (!this.registerForm.controls.email.valid) {
      this._snackBar.open("Email is Required", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (
      !this.registerForm.controls.password.valid ||
      !this.registerForm.controls.cpass.valid
    ) {
      this._snackBar.open("Password is Required", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (
      this.registerForm.controls.password.value !=
      this.registerForm.controls.cpass.value
    ) {
      this._snackBar.open("Passwords Do Not Match", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (!this.registerForm.valid) {
       this._snackBar.open("Invalid Form", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else {
      return true;
    }
  }
// (validate that the entered email is a valid email)
  validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

// (validate that the entered password is a valid password)
  validateRegisterPassword(password) {
  // Minimum eight characters, maximum 30, letters and numbers:
    const regex = /^[A-Za-z\d]{8,30}$/;
    return regex.test(password);
  }

// (validate that all required form fields have been filled in)
  validateLogin(_loginForm) {
    this.loginForm = _loginForm;
    if (
      !this.loginForm.controls.email.valid &&
      !this.loginForm.controls.password.valid
    ) {
      this._snackBar.open("Email and Password are Required", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (!this.loginForm.controls.email.valid) {
      this._snackBar.open("Email Required", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else if (!this.loginForm.controls.password.valid) {
      this._snackBar.open("Password Required", "", {
        panelClass: ['white-snackbar'],
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    } else {
      return true;
    }
  }
}
