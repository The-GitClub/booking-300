import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatebookingComponent } from './components/booking/createbooking/createbooking.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/app_pages/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/registers/register/register.component';
import { UserhomeComponent } from './components/app_pages/userhome/userhome.component';
import { ViewbookingsComponent } from './components/booking/viewbookings/viewbookings.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'user',component:UserhomeComponent,},
  {path:'user/:id/view', component: ViewbookingsComponent,  },
  {path:'user/:id/book', component: CreatebookingComponent, } //canActivate: [AuthGuard]

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
