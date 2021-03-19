import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../Interfaces/Booking';
import { BookingserviceService } from '../../../services/booking/bookingservice.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  username: string;
  email: string;
  role: string;
  bookingCount: number = 0;
  public booking: Booking;
  public bookings: Booking[];
  public error: string;

  userId: string = "";

  constructor(
    private bookingService: BookingserviceService,
    private _user: UserService
  ) {}

  ngOnInit(): void {
  }

  getUserName(){
    this.username = this._user.getUserName();
    return this.username;
  }

  getEmail(){
    this.email = this._user.getEmail();
    return this.email;
  }

  getRole(){
    this.role = this._user.ObtainRole();
    return this.role;
  }
}
