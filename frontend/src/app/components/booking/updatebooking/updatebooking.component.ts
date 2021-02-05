import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { Booking } from 'src/app/Interfaces/Booking';
import { Booking } from '../../../Interfaces/Booking';
import { User } from '../../../Interfaces/User';
//import { BookingserviceService } from 'src/app/services/booking/bookingservice.service';
import { BookingserviceService } from '../../../services/booking/bookingservice.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-updatebooking',
  templateUrl: './updatebooking.component.html',
  styleUrls: ['./updatebooking.component.css']
})
export class UpdatebookingComponent implements OnInit {

  @Input() booking: Booking;

  public successMsg: string;
  public errorMsg: string;
  public user: User;
  public bookingDate: string;
  public time: string;
  public table: string;
  public name: string;
//  public booking: Booking;
  public guests: number;
  username: String='';
  userId: string='';

  constructor(private _user:UserService, private bookingService: BookingserviceService, private _router:Router, private route: ActivatedRoute) { 
    this.userId = this._user.ObtainID();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookingService.getBooking(id).subscribe((booking: Booking) => {
      this.booking = booking;
    },
    (error) => {
      this.errorMsg = error.message;
    }
    );
  }

  addId(data){
    this.username = data.username;
    this.userId = data._id;
  }

  save(): void {
    this.bookingService.updateBooking(this.booking).subscribe();
    this.successMsg = 'Updated Successfully.'
  }

}
