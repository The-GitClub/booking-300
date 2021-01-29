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
  tokenVal:any;
  constructor(public _user:UserService, private _router:Router) { 
    if(this._user.checkTokenExists(this.tokenVal) != undefined){
      console.log("TOKEN IS NOT NULL!", this.tokenVal); 
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
    console.log("TOKEN IS NULL!", this.tokenVal); 
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
