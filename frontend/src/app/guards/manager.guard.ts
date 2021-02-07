import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UserService } from "../services/user/user.service";
import { MatDialog } from "@angular/material/dialog";
import { ManagerNotificationComponent } from "../components/notifications/manager-notification/manager-notification.component";

@Injectable()
export class ManagerGuard implements CanActivate {

  constructor(
    private _user: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  canActivate() {
    if (this._user.ObtainRole() != "manager") {
      this.router.navigate(["/"]);
      this.openDialog();
      return false;
    } else {
      return true;
    }
  }
  openDialog() {
    this.dialog.open(ManagerNotificationComponent, {
      width: '350px',
      height: '200',
      backdropClass: 'backdropBackground',
    });
  }
}
