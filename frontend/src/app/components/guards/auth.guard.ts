import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private userService:UserService, private router:Router){

  }

  canActivate() {
    if(this.userService.loggedIn()) {
      this.router.navigate(['/login']);
      return false;
    } 
    else{
      return true;
    }
  }
}