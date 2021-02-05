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

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent, canActivate: [antiAuthGuard]}, 
  {path:'register', component:RegisterComponent, canActivate: [antiAuthGuard] }, 
  {path:'manager', component:ManagerPageComponent, canActivate: [ManagerGuard]},
  {path:'staff', component:StaffPageComponent, canActivate: [StaffGuard]},
  {path:'user/view', component: ViewbookingsComponent, canActivate: [AuthGuard] },
  {path:'user/book', component: CreatebookingComponent, canActivate: [AuthGuard] }, //canActivate: [AuthGuard]
  {path:'user/view/update/:id', component: UpdatebookingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
