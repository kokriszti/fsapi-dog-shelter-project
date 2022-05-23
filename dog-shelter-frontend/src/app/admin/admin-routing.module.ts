import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppointmentComponent} from "../public/components/appointment/appointment.component";
import {PageNotFoundComponent} from "../public/components/page-not-found/page-not-found.component";
import {AdminComponent} from "./admin.component";
import {DogListComponent} from "./components/dog-list/dog-list.component";
import {DogDataComponent} from "./components/dog-data/dog-data.component";
import {DogEditComponent} from "./components/dog-edit/dog-edit.component";
import {AppointmentListComponent} from "./components/appointment-list/appointment-list.component";
import {AdoptionDataComponent} from "../public/components/adoption-data/adoption-data.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: "", component: DogListComponent },
      { path: "dogs", component: DogListComponent },
      { path: "dogs/:id", component: DogDataComponent },
      { path: "dogs/:id/form", component: DogEditComponent },
      { path: "appointments", component: AppointmentListComponent },
      { path: "appointments/user-data/:userId", component: AdoptionDataComponent },
      { path: "**", component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
