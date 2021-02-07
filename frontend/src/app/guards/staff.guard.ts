import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { StaffNotificationComponent } from '../components/notifications/staff-notification/staff-notification.component';

@Injectable()
export class StaffGuard implements CanActivate {
  constructor (private _user:UserService, private router:Router,public dialog: MatDialog){

  }
  canActivate() {
    if (this._user.ObtainRole() != "staff") {
      this.router.navigate(["/"]);
      this.openDialog();
      return false;
    } else {
      return true;
    }
  }
  openDialog() {
    this.dialog.open(StaffNotificationComponent, {
      width: '350px',
      height: '200',
      backdropClass: 'backdropBackground',
    });
  }
}