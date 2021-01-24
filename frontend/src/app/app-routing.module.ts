import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatebookingComponent } from './components/createbooking/createbooking.component';
import { AuthGuard } from './components/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { ViewbookingsComponent } from './components/viewbookings/viewbookings.component';

const routes: Routes = [
  {path:'', component:HomeComponent},

  // {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'user',component:UserhomeComponent, canActivate: [AuthGuard]},
  {path:'user/:id/view', component: ViewbookingsComponent,  canActivate: [AuthGuard]},
  {path:'user/:id/book', component: CreatebookingComponent, canActivate: [AuthGuard]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
