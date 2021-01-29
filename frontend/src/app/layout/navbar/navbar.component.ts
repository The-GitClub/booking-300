import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username:String='';
  userId:String='';
  blankToken:any;
  tokenVal:any;
  constructor(public _user:UserService, private _router:Router) { 
    this.tokenVal = this._user.checkTokenExists(this.blankToken);
    if(this.tokenVal != undefined){
      this._user.user()
      .subscribe((data) =>
      {
        this.addName(data);
      },
      (error) =>
      {
        console.error(error);
      });
    }
    else{
    }
  }

  addName(data){
    this.username = data.username;
    this.userId = data._id;
  }
  ngOnInit() {

  }

  logout(){
    this._user.logout();
    this._router.navigate(['/login']);
  }
}
