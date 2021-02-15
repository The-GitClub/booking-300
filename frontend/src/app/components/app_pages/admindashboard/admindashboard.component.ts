import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../../../Interfaces/Restaurant';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';

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
  public columns = ["restaurantName", "capacity", "update"];

  username: String = "";
  userId: string = "";

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    //private _user: UserService
  ) {}

  ngOnInit() {
    this.getTheBookings();
    const id = this.route.snapshot.paramMap.get('id');
  }
  getTheBookings() {
    this.restaurantService.getRestaurant().subscribe(
      (restaurant: Restaurant) => {
        this.restaurant = restaurant;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

}
