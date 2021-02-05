import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user/user.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  username: String = "";
  userId: String = "";
  blankToken: any;
  tokenVal: any;
  constructor(public _user: UserService, private _router: Router, private _snackBar: MatSnackBar) {}

  //positions for the alert
 horizontalPosition: MatSnackBarHorizontalPosition = "center";
 verticalPosition: MatSnackBarVerticalPosition = "bottom";
  ngOnInit() {}

  logout() {
    this._user.logout();
    this._router.navigate(["/login"]);
  }

  protectedManager() {
    if (this._user.ObtainRole() == "manager") {
      return true;
    } else {
      this._router.navigate(["/login"]);
      this._snackBar.open("Please log in in as a manager to continue to this page", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    }
  }
  protectedStaffAndManager() {
    if (this._user.ObtainRole() == "manager" || this._user.ObtainRole() == "staff") {
      return true;
    } else {
      this._router.navigate(["/login"]);
      this._snackBar.open("Please log in in as a manager or staff member to continue to this page", "", {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return false;
    }
  }
}
