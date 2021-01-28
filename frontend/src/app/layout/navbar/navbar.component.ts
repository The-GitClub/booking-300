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

  constructor(public _user:UserService, private _router:Router) { 
    this._user.user()
    .subscribe((data) =>
    {
      console.log("DATA IN NAVBAR", data); 
      this.addName(data);
      console.log("DATA IN NAVBAR", data); 
    },
    (error) =>
    {
      console.error("COULDN'T ACCESS THE SERVER FROM THE NAVBAR", error);
    });
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
