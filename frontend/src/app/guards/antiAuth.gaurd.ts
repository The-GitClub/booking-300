  
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable()
export class antiAuthGuard implements CanActivate {
  constructor (private userService:UserService, private router:Router){

  }

  canActivate() {
    if(!this.userService.loggedIn()) {
      this.router.navigate(['/']);
      return false;
    } 
    else{
      return true;
    }
  }
}