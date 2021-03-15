import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-userhome",
  templateUrl: "./userhome.component.html",
  styleUrls: ["./userhome.component.css"],
})
export class UserhomeComponent implements OnInit {
  username: String = "";
  userId: String = "";

  constructor(private _user: UserService, private _router: Router) {
  }

  addName(data) {
    this.username = data.username;
    this.userId = data._id;
  }
  ngOnInit() {}

  logout() {
    this._user.logout();
    this._router.navigate(["/login"]), 
    (error) => console.error(error);
  }
}
