import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DogModel } from 'src/app/models/dog.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import {DogService} from 'src/app/services/dog.service';
import {FormControl} from "@angular/forms";
import {AppointmentModel} from "../../../models/appointment.model";
import {UserModel} from "../../../models/user.model";
import {AppointmentPopulatedModel} from "../../../models/appointment-populated.model";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  public appointments: AppointmentPopulatedModel[] = [];
  public sizeInput: FormControl = new FormControl("");
  public nameInput: FormControl = new FormControl("");
  public genderInput: FormControl = new FormControl("");
  public selectedUser?: UserModel;

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    const todayDate: Date = new Date();
    const month: string = todayDate.getMonth() < 9 ? `0${todayDate.getMonth() + 1}` : `${todayDate.getMonth() + 1}`
    const day: string = todayDate.getDate() < 10 ? `0${todayDate.getDate()}` : `${todayDate.getDate()}`

    const today: string = `${todayDate.getFullYear()}-${month}-${day}`

    //alap állapot csak jövőbeli, dátum szerint rendezve:
    this.appointmentService.getAppointments({date_gte: today, _sort: "date"}).subscribe({
      next: (appointmentsFromServer: AppointmentPopulatedModel[]) => {
        this.appointments = appointmentsFromServer;
        console.log(this.appointments);
      },
      error: (e) => console.log(e)
    });

    //toDo: megnézni, kieszedni: szűrők alaphelyzetbe
    this.sizeInput.setValue("");
    this.genderInput.setValue("");

  }

  public getAppointmentsByFilter(): void {
    let queryObj:any = {};

    //todo: szűrőket átírni appoinment-esre
    queryObj.name_like = this.nameInput.value;

    if (this.sizeInput.value !== "") {
      queryObj.size = this.sizeInput.value;
    }

    if (this.genderInput.value !== "") {
      queryObj.gender = this.genderInput.value;
    }

    this.appointmentService.getAppointments(queryObj).subscribe({
      next: appointments => this.appointments = appointments,
      error: (e) => console.log(e)
    })
  }

}
