import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../Interfaces/Booking';
import { BookingserviceService } from '../../../services/booking/bookingservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../Interfaces/User';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {
  public successMsg: string;
  public errorMsg: string;
  public user: User;
  public bookingDate: string;
  public time: string;
  public table: string;
  public name: string;
  public booking: Booking;
  public guests: number;
  username: String='';
  userId: string='';

  constructor(private _user:UserService, private bookingService: BookingserviceService, private _router:Router) { 
    this._user.user()
    .subscribe(
      data=>this.addId(data),
      error=>console.log(error)
    )
  }

  ngOnInit() {
  }


  addId(data){
    this.username = data.username;
    this.userId = data._id;
  }

  createBooking() {
    this.successMsg = '';
    this.errorMsg = '';
    this.bookingService.createBooking(this.userId, this.bookingDate, this.time, this.table, this.name, this.guests)
    .subscribe((createdBooking: Booking) => {
      this.bookingDate = '';
      this.time = '';
      this.table ='';
      this.name = '';
      this.guests = null;
      //this.userId = '';
      const bookingDate = new Date(createdBooking.bookingDate).toDateString();
      this.successMsg = `Booking successfully created for ${bookingDate}`;

    },
    (error) => {
      this.errorMsg = (error as any).error.message;
    });
}

}