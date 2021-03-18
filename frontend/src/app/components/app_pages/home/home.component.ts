import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(public _user: UserService, private _router: Router) {}

  username : string;
  ngOnInit(): void {
    this.getUserName();
  }
  isStaff() {
    if (this._user.ObtainRole() == "staff") {
      return true;
    } else {
      return false;
    }
  }
  isManager() {
    if (this._user.ObtainRole() == "manager") {
      return true;
    } else {
      return false;
    }
  }
  getUserName(){
    this.username = this._user.getUserName();
    return this.username;
  }
}
