import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../../../Interfaces/Restaurant';
import { RestaurantService } from '../../../services/restaurant/restaurant.service';
@Component({
  selector: 'app-admindashboardupdate',
  templateUrl: './admindashboardupdate.component.html',
  styleUrls: ['./admindashboardupdate.component.css']
})
export class AdmindashboardupdateComponent implements OnInit {
  @Input() restaurant: Restaurant;

  constructor(private restaurantService: RestaurantService, private _router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.restaurantService.getSpecRestaurant(id).subscribe((restaurant: Restaurant) => {
      this.restaurant = restaurant;
    //  console.log(this.booking);
    },
    (error) => {
  //    this.errorMsg = error.message;
    }
    );
  }


  
  save(f: NgForm) {
    this.restaurantService.updateRestaurant(this.restaurant, f.value).subscribe();
   // this.successMsg = 'Updated Successfully.';
    this._router.navigate(['booking-updated']);
    console.log(this.restaurant);
  }

}
