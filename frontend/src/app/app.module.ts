import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Services
import { AppRoutingModule } from './app-routing.module';
import { BookingserviceService } from './services/booking/bookingservice.service';
import { UserService } from './services/user/user.service';
import { ValidationService } from './services/validation/validation.service';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/registers/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

//alerts
import {MatSnackBarModule} from '@angular/material/snack-bar';
//Icons
import { MatIconModule } from '@angular/material/icon';
//Material Card
import {MatCardModule} from '@angular/material/card';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { UserhomeComponent } from './components/app_pages/userhome/userhome.component';
import { ViewbookingsComponent } from './components/booking/viewbookings/viewbookings.component';
import { CreatebookingComponent } from './components/booking/createbooking/createbooking.component';
import { HomeComponent } from './components/app_pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    ViewbookingsComponent,
    CreatebookingComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //Needed for user registration
    ReactiveFormsModule, //Needed for user registration
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [UserService, BookingserviceService, ValidationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
