import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../../../Interfaces/Booking';
//import { Booking } from 'src/app/Interfaces/Booking';
//import { Booking } from '../../../Interfaces/Booking';
import { User } from '../../../Interfaces/User';
//import { BookingserviceService } from 'src/app/services/booking/bookingservice.service';
import { BookingserviceService } from '../../../services/booking/bookingservice.service';
import { UserService } from '../../../services/user/user.service';

type Option = { text: string; value: string };
type BookingDate = { year: number; month: number; day: number };

type TableInDB = { table: string; };

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
  public guests: number;
  username: String='';
  userId: string='';

  options: Option[] = [
    { text: '3pm', value: '15' },
    { text: '4pm', value: '16' },
    { text: '5pm', value: '17' },
    { text: '6pm', value: '18' },
    { text: '7pm', value: '19' },
    { text: '8pm', value: '20' },
    { text: '9pm', value: '21' },
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
  bookingsArray: Booking[];
  filteredOptions: Option[];
  filteredTbls: Option[];
  filteredGuests: Option[];
  today = new Date();
  currentHour: string;
  fullDate: BookingDate;
  tableDB: TableInDB;
  fullCapacityError: boolean;

  ShowHideAllergy:boolean = false; //To hide and show the box


  constructor(private _user:UserService, private bookingService: BookingserviceService, private _router:Router, private route: ActivatedRoute) { 
    this.userId = this._user.ObtainID();
  }

  ngOnInit() {
    this.currentHour = this.today.getHours().toString();
    this.filteredOptions = this.options;
    this.filteredTbls = this.optionsTbl;
    this.filteredGuests = this.optionsGuests;
    this.fullCapacityError = false;
    this.getAll();
    this.fullDate = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate(),
    };

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

  save(f: NgForm) {
    this.bookingService.updateBooking(this.booking, f.value).subscribe();
    this.successMsg = 'Updated Successfully.';
    this._router.navigate(['booking-updated']);
    console.log(this.booking);
  }


  getAll(): void {
    this.bookingService.getAllBookings().subscribe((data: any[]) => {
      this.bookingsArray = data || [];
    });
  }

  onSubmit(f: NgForm) {
    this.userId = this._user.ObtainID();
    this.bookingService.makeBooking(this.userId, f.value).subscribe((data) => {
      this.filteredOptions = this.options;
      this.filteredTbls = this.optionsTbl;
      this.filteredGuests =this.optionsGuests;
      this.getAll();
      this.sendEmailConfirmation(data);
      f.resetForm();
      this._router.navigate(['booking-updated']);
    });
  }

  sendEmailConfirmation(data) {
    this.bookingService.sendEmailConfirmation(data).subscribe(() => {});
  }

  filterGuests(f: NgForm): void {
    let sameDayBookings = this.bookingsArray.filter((booking) => {
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
});
  console.log(totalguests);
    // Need to sum up guests in the appointments that are now found with same date/time
    this.filteredGuests = this.optionsGuests
      .filter((filteredguests) => {
        return !sameDayBookings.some((booking) => {
          // This disables the guests dropbox if over 30 on slot
          if(totalguests == 6){
            console.log('OVERBOOKED!')
          //  this.fullCapacityError = 'We are at full capacity. Please choose another time.'
            this.fullCapacityError = true;
          }

          if(totalguests == 6)
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
          if(totalguests == 5)
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
          if(totalguests == 4)
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

          // This disables guests dropdowns 4, 5, 6 --27
          if(totalguests == 3){
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

          // This disables guests dropdowns 5, 6 --26
          if(totalguests == 2){
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

          // This disables no guests dropdowns  --25
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

  toggleShowAllergy() {
    this.ShowHideAllergy = ! this.ShowHideAllergy;
    }

  isDisabled = (date: NgbDate, current: { month: number }): boolean => {
    let sameDayBookings = this.bookingsArray.filter((booking) => {
      return (
        booking.date.year === date.year &&
        booking.date.month === date.month &&
        booking.date.day === date.day 
      );
    });

    // disable today's date if current hour is greater than 5 pm
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

    // The value returned by getDay() method is an integer corresponding to the day of the week: 0 for Sunday,
    // 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday.
    return (
      dayOfTheWeek === 0 ||
      sameDayBookings.length === this.options.length
    );
  };

  filterTime(f: NgForm): void {

    this.filteredOptions = this.options
      
      .filter((hour) => {
        if (
          this.fullDate.year === f.value.date.year &&
          this.fullDate.month === f.value.date.month &&
          this.fullDate.day === f.value.date.day 
        ) {
          return parseInt(hour.value) > parseInt(this.currentHour);
        }
        return true;
      });
  }


}
