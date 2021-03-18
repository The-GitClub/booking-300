import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { UserService } from '../../../services/user/user.service';
import { Booking } from '../../../Interfaces/Booking';
import { BookingserviceService } from '../../../services/booking/bookingservice.service';

@Component({
  selector: 'app-bookings-view',
  templateUrl: './bookings-view.component.html',
  styleUrls: ['./bookings-view.component.css']
})
export class BookingsViewComponent implements OnInit {
  public error: string;
  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  //Defines the columns for the booking section
  public bookingcolumns = ["date", "name", "time", "guests", "allergy", "update", "cancel"];
  bookings: Booking[];
  filteredBookings: any[];

  username: String = "";
  userId: string = "";

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingserviceService,
    private _user: UserService
  ) {}

  ngOnInit() {
    this.displayAllBookings();
    const id = this.route.snapshot.paramMap.get('id');
  }

  cancelBooking(id: string) {
    this.bookingService
      .cancelBooking(id)
      .pipe(mergeMap(() => this.bookingService.getBookingsForCancel()))
      .subscribe(
        (bookings: Booking[]) => {
          this.bookings = bookings;
          this.successMsg = "Booking cancelled successfully";
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
    this.displayAllBookings();
  }

  displayAllBookings(): void {
    this.bookingService.getAllBookings().subscribe((data: any[]) => {
      this.bookings = data;
      this.filteredBookings = data;
      console.log(data);
    });
  }

  getAll(): void {
    this.bookingService.getAllBookings().subscribe((data: any[]) => {
      this.bookings = data || [];
    });
  }

  filterDate(f: NgForm): void {
     this.filteredBookings = this.bookings.filter((booking) =>
        booking?.date?.year.toString().includes(f?.value?.date?.year) &&
        booking?.date?.month.toString().includes(f?.value?.date?.month) &&
        booking?.date?.day.toString().includes(f?.value?.date?.day)
    );
  }

  filterName(f: NgForm): void {
    this.filteredBookings = this.bookings.filter((booking) =>
       booking?.name?.toLowerCase().includes(f?.value?.search?.trim().toLowerCase())
   );
  }

  isManager(){
    if(this._user.ObtainRole() == 'manager'){
      return true;
     }
     else{
       return false;
     }
  }
  clear(f: NgForm): void{
    this.filteredBookings = null;
    this.displayAllBookings();
    f.reset();
  }
}
