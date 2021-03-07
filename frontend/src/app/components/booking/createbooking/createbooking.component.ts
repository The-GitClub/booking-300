import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDate, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BookingserviceService } from '../../../services/booking/bookingservice.service';
import { UserService } from '../../../services/user/user.service';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
// Stripe
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.API_URL;

type Option = { text: string; value: string };
type BookingDate = { year: number; month: number; day: number };

type TableInDB = { table: string; };
type Booking = {
  date: BookingDate;
  time: string;
  name: string;
  email: string;
  phone: string;
  table: string;
  guests: string;
  allergy: string; //Form to fill in details
};
type Restaurant = {
  _id: string;
  capacity: number;
};

@Component({
  selector: 'app-createbooking',
  templateUrl: './createbooking.component.html',
  styleUrls: ['./createbooking.component.css']
})
export class CreatebookingComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: '#303238',
        fontSize: '16px',
        fontFamily: '"Open Sans", sans-serif',
        lineHeight: '40px',
        fontWeight: 300,
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#CFD7DF',
        },
      },
      invalid: {
        iconColor: '#FFC7EE',
        color: '#FFC7EE',
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en-GB',
  };

  stripeTest: FormGroup;
  options: Option[] = [
    { text: '9am', value: '9' },
    { text: '10am', value: '10' },
    { text: '11am', value: '11' },
    { text: '12am', value: '12' },
    { text: '1pm', value: '13' },
    { text: '2pm', value: '14' },
    { text: '3pm', value: '15' },
    { text: '4pm', value: '16' },
    { text: '5pm', value: '17' },
  ];
  optionsTbl: Option[] = [
    { text: '1', value: '1' },
    { text: '2', value: '2' },
    { text: '3', value: '3' },

  ];
  optionsGuests: Option[] = [
    { text: '1', value: '1' },
    { text: '2', value: '2' },
    { text: '3', value: '3' },
    { text: '4', value: '4' },
    { text: '5', value: '5' },
  ];

  bookings: Booking[];
  public restaurant: Restaurant;
  filteredOptions: Option[];
  filteredTbls: Option[];
  filteredGuests: Option[];
  today = new Date();
  currentHour: string;
  fullDate: BookingDate;
  tableDB: TableInDB;
  fullCapacityError: boolean;
  userId: string='';
  capacity: number;

  //Below is used for food allergy form
  ShowHideAllergy:boolean = false; //To hide and show the box

  constructor(private _user:UserService, private bookingService: BookingserviceService,
    private restaurantService: RestaurantService, private router: Router, private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['Angular v10', [Validators.required]],
      amount: [1000],
    });
    this.currentHour = this.today.getHours().toString();
    this.filteredOptions = this.options;
    this.filteredTbls = this.optionsTbl;
    this.filteredGuests = this.optionsGuests;
    this.fullCapacityError = false;
    this.getAll();
    this.getRestaurantCapacity();
    this.fullDate = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate(),
    };
  }

  pay(): void {
    var inputValue = (<HTMLInputElement>document.getElementById('cname')).value;
    if (this.stripeTest.valid) {
      this.createPaymentIntent(this.stripeTest.get('amount').value)
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(pi.client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name:inputValue
                },
              },
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
              var myForm = document.getElementById('bookingFormBtn');
              myForm.click();
            }
          }
        });
    } else {
      console.log(this.stripeTest);
    }
  }

  createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      BASE_URL + `create-payment-intent`,
      { amount }
    );
  }

  getAll(): void {
    this.bookingService.getAllBookings().subscribe((data: any[]) => {
      this.bookings = data || [];
     //console.log(data);
    });
  }

  getRestaurantCapacity() {
  this.restaurantService.getRestaurant().subscribe(
    (restaurant: Restaurant) => {
     //this.restaurant = restaurant;
     //this.restaurant.capacity = this.capacity
  this.capacity = restaurant[0].capacity
     console.log(this.capacity)
    },
    (error) => {
    //  this.error = error.message;
    });
  }

  sendEmailConfirmation(data) {
    this.bookingService.sendEmailConfirmation(data).subscribe(() => {});
  }

  toggleShowAllergy() {
    this.ShowHideAllergy = ! this.ShowHideAllergy;
  }

  filterGuests(f: NgForm): void {
    let sameDayBookings = this.bookings.filter((booking) => {
      return (
        booking.date.year === f.value.date.year &&
        booking.date.month === f.value.date.month &&
        booking.date.day === f.value.date.day
        && booking.time === f.value.time
      );
    });

    var totalguests = 0;
    // If there is no appointsments for that date and time, totalguests = 0 and all guests options available
    if(sameDayBookings.length == 0){
      totalguests = 0;
      this.fullCapacityError = false;

      this.optionsGuests[0].text = "1";
      this.optionsGuests[0].value = "1";

      this.optionsGuests[1].text = "2";
      this.optionsGuests[1].value = "2";

      this.optionsGuests[2].text = "3";
      this.optionsGuests[2].value = "3";

      this.optionsGuests[3].text = "4";
      this.optionsGuests[3].value = "4";

      this.optionsGuests[4].text = "5";
      this.optionsGuests[4].value = "5";
    }

    // If there is appointments for that date and time
  sameDayBookings.forEach(data => {
    // If guests is not null/undefined add up all guests for that slot
    if(data.guests){
    totalguests += Number(data.guests);
  }
  // console.log(sameDayAppointments;
  // console.log(totalguests);
});

  console.log(totalguests);
    // Need to sum up guests in the appointments that are now found with same date/time
    this.filteredGuests = this.optionsGuests
      .filter((filteredguests) => {
        return !sameDayBookings.some((booking) => {
          // This disables the guests dropbox if over 30 on slot
          if(totalguests == this.capacity){
            console.log('OVERBOOKED!')
          //  this.fullCapacityError = 'We are at full capacity. Please choose another time.'
            this.fullCapacityError = true;
          }

          if(totalguests == this.capacity)
          {
            console.log('All 5 item missing from guests')
            this.optionsGuests[0].text = "";
            this.optionsGuests[0].value = "";
            this.optionsGuests[1].text = "";
            this.optionsGuests[1].value = "";
            this.optionsGuests[2].text = "";
            this.optionsGuests[2].value = "";
            this.optionsGuests[3].text = "";
            this.optionsGuests[3].value = "";
            this.optionsGuests[4].text = "";
            this.optionsGuests[4].value = "";
            this.fullCapacityError = true;
          }

          // This disables guests dropdowns 2, 3, 4, 5, 6 --29
          if(totalguests == this.capacity -1)
          {
            console.log('4 item missing from guests')
            this.optionsGuests[0].text = "1";
            this.optionsGuests[0].value = "1";
            this.optionsGuests[1].text = "";
            this.optionsGuests[1].value = "";
            this.optionsGuests[2].text = "";
            this.optionsGuests[2].value = "";
            this.optionsGuests[3].text = "";
            this.optionsGuests[3].value = "";
            this.optionsGuests[4].text = "";
            this.optionsGuests[4].value = "";
            this.fullCapacityError = false;
          }

          // This disables guests dropdowns 3, 4, 5, 6 --28
          if(totalguests == this.capacity - 2)
          {
            console.log('3 item missing from guests')
            this.optionsGuests[0].text = "1";
            this.optionsGuests[0].value = "1";
            this.optionsGuests[1].text = "2";
            this.optionsGuests[1].value = "2";
            this.optionsGuests[2].text = "";
            this.optionsGuests[2].value = "";
            this.optionsGuests[3].text = "";
            this.optionsGuests[3].value = "";
            this.optionsGuests[4].text = "";
            this.optionsGuests[4].value = "";
            this.fullCapacityError = false;
          }

          // // This disables guests dropdowns 4, 5, 6 --27
          if(totalguests == this.capacity - 3){
            console.log('2 item missing from guests')
            this.optionsGuests[0].text = "1";
            this.optionsGuests[0].value = "1";
            this.optionsGuests[1].text = "2";
            this.optionsGuests[1].value = "2";
            this.optionsGuests[2].text = "3";
            this.optionsGuests[2].value = "3";
            this.optionsGuests[3].text = "";
            this.optionsGuests[3].value = "";
            this.optionsGuests[4].text = "";
            this.optionsGuests[4].value = "";
            this.fullCapacityError = false;
          }

          // // This disables guests dropdowns 5, 6 --26
          if(totalguests == this.capacity - 4){
            console.log('1 item missing from guests')
            this.optionsGuests[0].text = "1";
            this.optionsGuests[0].value = "1";
            this.optionsGuests[1].text = "2";
            this.optionsGuests[1].value = "2";
            this.optionsGuests[2].text = "3";
            this.optionsGuests[2].value = "3";
            this.optionsGuests[3].text = "4";
            this.optionsGuests[3].value = "4";
            this.optionsGuests[4].text = "";
            this.optionsGuests[4].value = "";
            this.fullCapacityError = false;
          }

          // // This disables no guests dropdowns  --25
          if(totalguests == 1){
            console.log('0 item missing from guests')
            this.optionsGuests[0].text = "1";
            this.optionsGuests[0].value = "1";
            this.optionsGuests[1].text = "2";
            this.optionsGuests[1].value = "2";
            this.optionsGuests[2].text = "3";
            this.optionsGuests[2].value = "3";
            this.optionsGuests[3].text = "4";
            this.optionsGuests[3].value = "4";
            this.optionsGuests[4].text = "5";
            this.optionsGuests[4].value = "5";
            this.fullCapacityError = false;
          }
          console.log(this.fullCapacityError);
        });
      })
      .filter((filteredguests) => {
        return true;
      });
  }

  isDisabled = (date: NgbDate, current: { month: number }): boolean => {
    let sameDayBookings = this.bookings.filter((booking) => {
      return (
        booking.date.year === date.year &&
        booking.date.month === date.month &&
        booking.date.day === date.day
      );
    });

    //Disable today's date if current hour is greater than 5 pm
    if (
      this.fullDate.year === date.year &&
      this.fullDate.month === date.month &&
      this.fullDate.day === date.day
    ) {
      if (this.currentHour > this.options[this.options.length - 1].value) {
        return true;
      }
    }

    let dateOfTheMonth = new Date(
      date.month + '/' + date.day + '/' + date.year
    );
    let dayOfTheWeek = dateOfTheMonth.getDay();

    //The value returned by getDay() method is an integer corresponding to the day of the week: 0 for Sunday,
    //1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday.
    return (
      dayOfTheWeek === 0 ||
      dayOfTheWeek === 6 ||
      sameDayBookings.length === this.options.length
    );
  };

  onSubmit(f: NgForm) {
    this.userId = this._user.ObtainID();
    this.bookingService.makeBooking(this.userId, f.value).subscribe((data) => {
      this.filteredOptions = this.options;
      this.filteredTbls = this.optionsTbl;
      this.filteredGuests =this.optionsGuests;
      this.getAll();
      this.sendEmailConfirmation(data);
      f.resetForm();
      this.router.navigate(['booking-confirmation']);
    });
  }

}
