import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
//import the UserService to register the user
import { UserService } from "../../../../services/user/user.service";
//import the MatSnackBar Messages Service to notify the user of an error
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
//validate the form
import { ValidationService } from "../../../../services/validation/validation.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  //positions for the alert
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  //booleans for showing/hiding passwords
  hide1 = true;
  hide2 = true;

  //Register FormGroup
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
  });

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _validate: ValidationService
  ) {}

  ngOnInit() {}

  /* #region  Register */
  register() {
    // (validate that all required form fields have been filled in)
      if (!this._validate.validateRegister(this.registerForm)) {
        return false;
      }
    // (validate that the entered password is a valid password)
      if (
        !this._validate.validateRegisterPassword( this.registerForm.controls.password.value)) {
        this._snackBar.open("Password must be between 8 and 30 characters", "", {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        return false;
      }

    // (validate that the entered email is a valid email)
      if (!this._validate.validateEmail(this.registerForm.controls.email.value)) {
        this._snackBar.open("Invalid Email", "", {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        return false;
      }
    // (subscribe to the register method on the user service to log in)
      this._userService
        .register(JSON.stringify(this.registerForm.value))
        .subscribe(
          (data) => {
          // (if the boolean "success" returns true, display the returned message to the user and redirect them to the 'user' page)
            if ((data as any).success) {
              this._router.navigate(["/login"]);
              this._snackBar.open((data as any).message, "", {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
            }
          // (if there is an error display the returned error message to the user)
          },
          (error) => {
            this._snackBar.open((error as any).error.message, "", {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        );
    }
  /* #endregion Register*/
}
