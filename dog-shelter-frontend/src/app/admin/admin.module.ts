import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DogListComponent } from './components/dog-list/dog-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AdminComponent } from './admin.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { DogDataComponent } from './components/dog-data/dog-data.component';
import { DogEditComponent } from './components/dog-edit/dog-edit.component';


@NgModule({
  declarations: [
    DogListComponent,
    AppointmentListComponent,
    AdminComponent,
    AdminMenuComponent,
    DogDataComponent,
    DogEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
