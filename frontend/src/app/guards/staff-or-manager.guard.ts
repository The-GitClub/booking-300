import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StaffOrManagerComponent } from '../components/notifications/staff-or-manager/staff-or-manager.component';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class StaffOrManagerGuard implements CanActivate {

  constructor (private _user:UserService, private router:Router,public dialog: MatDialog){

  }
  canActivate() {
    if (this._user.ObtainRole() != "staff" || "manager") {
      console.log(this._user.ObtainRole());
      this.router.navigate(["/"]);
      this.openDialog();
      return false;
    } else {
      return true;
    }
  }
  openDialog() {
    this.dialog.open(StaffOrManagerComponent, {
      width: '350px',
      height: '200',
      backdropClass: 'backdropBackground',
    });
  }
}
