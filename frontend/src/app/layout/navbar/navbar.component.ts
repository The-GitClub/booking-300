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
    .subscribe(
      data=>this.addName(data),
      error=>this._router.navigate(['/login'])
    )
  }

  addName(data){
    this.username = data.username;
    this.userId = data._id;
  }
  ngOnInit() {

  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{console.log(data);},
      error=>console.error(error)
    )
    this._router.navigate(['/login']);
  }
}
