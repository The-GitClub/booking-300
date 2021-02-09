import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Booking } from "../../../Interfaces/Booking";
import { BookingserviceService } from "../../../services/booking/bookingservice.service";
import { mergeMap } from "rxjs/operators";
import { UserService } from "../../../services/user/user.service";
import { ThisReceiver } from "@angular/compiler";

@Component({
  selector: "app-viewbookings",
  templateUrl: "./viewbookings.component.html",
  styleUrls: ["./viewbookings.component.css"],
})
export class ViewbookingsComponent implements OnInit {
  public booking: Booking;
  public bookings: Booking[];
  public error: string;
  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public columns = ["date", "time", "name", "guests", "update", "cancel"];

  username: String = "";
  userId: string = "";

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingserviceService,
    private _user: UserService
  ) {}

  ngOnInit() {
    this.getTheBookings();
    const id = this.route.snapshot.paramMap.get('id');
  }
  getTheBookings() {
    this.userId = this._user.ObtainID();
    this.bookingService.getBookings(this.userId).subscribe(
      (booking: Booking) => {
        this.booking = booking;
      },
      (error) => {
        this.error = error.message;
      }
    );
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
    this.getTheBookings();
  }
}
