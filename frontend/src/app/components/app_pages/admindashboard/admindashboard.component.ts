import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../../Interfaces/Booking';
import { BookingserviceService } from '../../../services/booking/bookingservice.service';
import { Restaurant } from '../../../Interfaces/Restaurant';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  public restaurant: Restaurant;
  public error: string;
  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  //Defines the columns for the booking section
  public columns = ["restaurantName", "restaurantEmail", "restaurantPassword", "capacity", "update"];
  public bookingcolumns = ["date", "name", "time", "guests", "allergy", "update", "cancel"];
  bookings: Booking[];
  filteredBookings: any[];

  username: String = "";
  userId: string = "";

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private bookingService: BookingserviceService
    //private _user: UserService
  ) {}

  ngOnInit() {
    this.getTheRestaurant();
    this.displayAllBookings();
    
    const id = this.route.snapshot.paramMap.get('id');
  }
  getTheRestaurant() {
    this.restaurantService.getRestaurant().subscribe(
      (restaurant: Restaurant) => {
        this.restaurant = restaurant;
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
     //console.log(data);
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
       booking?.name?.toLowerCase().includes(f?.value?.search?.toLowerCase())
   );
  }

}
