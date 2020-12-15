import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../Interfaces/Booking';
import { User } from '../Interfaces/User';
import { BookingserviceService } from '../bookingservice.service';
import { UserService } from '../user.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-viewbookings',
  templateUrl: './viewbookings.component.html',
  styleUrls: ['./viewbookings.component.css']
})
export class ViewbookingsComponent implements OnInit {

  public booking: Booking;
  public bookings: Booking[];
  public error: string;
  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public columns = ['bookingDate', 'time', 'name', 'table', 'guests' , 'cancel'];

  constructor(private route: ActivatedRoute, private bookingService: BookingserviceService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookingService.getBookings(id).subscribe((booking: Booking) => {
      this.booking = booking;
      console.log(booking);
    },
    (error) => {
      this.error = error.message;
    }
    );
  }

   cancelBooking(id: string){
    this.bookingService.cancelBooking(id)
    .pipe(
      mergeMap(() => this.bookingService.getBookingsForCancel())
      )
      .subscribe((bookings: Booking[]) => {
        this.bookings = bookings;
        this.successMsg = 'Booking successfully canceled';
      },
      (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
      });
  }

}


 
  



