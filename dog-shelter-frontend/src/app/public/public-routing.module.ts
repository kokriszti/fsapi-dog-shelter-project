import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import {LandingComponent} from "./components/landing/landing.component";
import {DogsComponent} from "./components/dogs/dogs.component";
import {DogDetailsComponent} from "./components/dog-details/dog-details.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {AppointmentComponent} from "./components/appointment/appointment.component";
import {RegisterComponent} from "./components/register/register.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: '', component: PublicComponent, children: [
      { path: "", component: LandingComponent },
      { path: "dogs", component: DogsComponent },
      { path: "dogs/:id", component: DogDetailsComponent },
      { path: "appointment/:dogId", component: AppointmentComponent },
      { path: "user/:userId", component: UserProfileComponent },
      { path: "**", component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
