import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatebookingComponent } from './components/booking/createbooking/createbooking.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/app_pages/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/registers/register/register.component';
import { ViewbookingsComponent } from './components/booking/viewbookings/viewbookings.component';
import { UpdatebookingComponent } from './components/booking/updatebooking/updatebooking.component';
import { ManagerPageComponent } from './components/app_pages/manager-page/manager-page.component';
import { StaffPageComponent } from './components/app_pages/staff-page/staff-page.component';
import { ManagerGuard } from './guards/manager.guard';
import { StaffGuard } from './guards/staff.guard';
import { antiAuthGuard } from './guards/antiAuth.gaurd';
import { BookingconfirmationComponent } from './components/app_pages/bookingconfirmation/bookingconfirmation.component';
import { BookingupdatedComponent } from './components/app_pages/bookingupdated/bookingupdated.component';
import { AdmindashboardComponent } from './components/app_pages/admindashboard/admindashboard.component';
import { AdmindashboardupdateComponent } from './components/app_pages/admindashboardupdate/admindashboardupdate.component';
import { ProfilePageComponent } from './components/app_pages/profile-page/profile-page.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'dashboard', component:AdmindashboardComponent, canActivate: [ManagerGuard]},
  {path:'dashboard/update/:id', component:AdmindashboardupdateComponent, canActivate: [ManagerGuard]},
  {path:'booking-confirmation', component:BookingconfirmationComponent},
  {path:'booking-updated', component:BookingupdatedComponent},

  {path:'login', component:LoginComponent, canActivate: [antiAuthGuard]},
  {path:'register', component:RegisterComponent, canActivate: [antiAuthGuard] },
  {path:'manager', component:ManagerPageComponent, canActivate: [ManagerGuard]},
  {path:'staff', component:StaffPageComponent, canActivate: [StaffGuard]},
  {path:'profile', component:ProfilePageComponent, canActivate: [AuthGuard]},
  {path:'user/view', component: ViewbookingsComponent, canActivate: [AuthGuard] },
  {path:'user/book', component: CreatebookingComponent, canActivate: [AuthGuard] },
  {path:'user/view/update/:id', component: UpdatebookingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
