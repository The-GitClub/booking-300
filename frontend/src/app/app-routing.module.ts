import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatebookingComponent } from './components/booking/createbooking/createbooking.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/app_pages/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/registers/register/register.component';
import { UserhomeComponent } from './components/app_pages/userhome/userhome.component';
import { ViewbookingsComponent } from './components/booking/viewbookings/viewbookings.component';
import { UpdatebookingComponent } from './components/booking/updatebooking/updatebooking.component';
import { ManagerPageComponent } from './components/app_pages/manager-page/manager-page.component';
import { StaffPageComponent } from './components/app_pages/staff-page/staff-page.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'manager', component:ManagerPageComponent},
  {path:'staff', component:StaffPageComponent},
  {path:'user/view', component: ViewbookingsComponent,  },
  {path:'user/book', component: CreatebookingComponent, }, //canActivate: [AuthGuard]
  {path:'user/view/update/:id', component: UpdatebookingComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
