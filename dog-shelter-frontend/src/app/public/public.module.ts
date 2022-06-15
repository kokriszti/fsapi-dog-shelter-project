import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { DogsComponent } from './components/dogs/dogs.component';
import { DogDetailsComponent } from './components/dog-details/dog-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AdoptionFormComponent } from './components/adoption-form/adoption-form.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdoptionDataComponent } from './components/adoption-data/adoption-data.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "../services/jwt.interceptor";


@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    DogsComponent,
    DogDetailsComponent,
    PageNotFoundComponent,
    LoginComponent,
    AdoptionFormComponent,
    AppointmentComponent,
    RegisterComponent,
    UserProfileComponent,
    AdoptionDataComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
