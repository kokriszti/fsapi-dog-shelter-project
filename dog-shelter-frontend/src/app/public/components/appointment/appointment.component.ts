import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogModel } from 'src/app/models/dog.model';
import { DogService } from 'src/app/services/dog.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import {AppointmentModel} from "../../../models/appointment.model";
import {AppointmentPopulatedModel} from "../../../models/appointment-populated.model";
import {DateService} from "../../../services/date.service";


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit, OnDestroy {

  public idReadFromRoute?: any;
  public subscription?: Subscription;
  public selectedDog?: DogModel;
  public reservedAppointments: AppointmentPopulatedModel[] = []
  public minDate: string = ""
  public maxDate: string = ""
  public appointmentTaken: boolean = false

  public appointmentForm: FormGroup = new FormGroup({
    date: new FormControl("", [Validators.required, this.dateValidator]),
    time: new FormControl("", Validators.required),
    comment: new FormControl("", Validators.maxLength(500))
  })

  constructor(private activatedRoute: ActivatedRoute,
              private dogService: DogService,
              private appointmentService: AppointmentService,
              private dateService: DateService,
              private router: Router) { }

  ngOnInit(): void {

    this.minDate = this.dateService.dateToString(1)
    //másnaptól azév végéig
    this.maxDate = `${new Date(new Date().getTime() + 86400000).getFullYear()}-12-31`

    this.subscription = this.activatedRoute.paramMap.subscribe({
      next: (param) => {this.idReadFromRoute = param.get("dogId")},
      error: (e) => {console.log(e)}
    })    //subs vége

    this.dogService.getDog(this.idReadFromRoute).subscribe({
      next: (dog) => {this.selectedDog = dog},
      error: (e) => {console.log(e)}
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public dateValidator(dateInput: AbstractControl): ValidationErrors | null {
    //minimum dátum beállítása következő napra
    const dateNextDay: Date = new Date(new Date().getTime() + 86400000)
    //ha egy számjegyű, 0-t tegyen elé
    const month: string = dateNextDay.getMonth() < 9 ? `0${dateNextDay.getMonth() + 1}` : `${dateNextDay.getMonth() + 1}`
    const day: string = dateNextDay.getDate() < 10 ? `0${dateNextDay.getDate()}` : `${dateNextDay.getDate()}`

    const nextDay = `${dateNextDay.getFullYear()}-${month}-${day}`
    return dateInput.value >= nextDay && dateInput.value <= `${dateNextDay.getFullYear()}-12-31`? null : {dateError: "Valós, jövőbeli dátumot adj meg!"}
  }

  public setAppointmentTaken() {
    this.appointmentTaken = false
  }


  public onSubmit(): void {
    //console.log(this.appointmentForm.value)

    if (this.appointmentForm.valid) {
      let queryObj:any = {};
      queryObj.date = this.appointmentForm.get("date")?.value;
      queryObj.time = this.appointmentForm.get("time")?.value;

      console.log(queryObj)

      this.appointmentService.getAppointments(queryObj).subscribe({
        next: appointments => {
          this.reservedAppointments = appointments;
          console.log(this.reservedAppointments)

          //ha nincs ez az időpont még lefoglalva:
          if (this.reservedAppointments.length <= 0) {

            //nullcheck:
            if (this.selectedDog && this.selectedDog._id ) {
              const userFromStorage: any = localStorage.getItem('user')


              //userID és név egyelőre beégetett, autentikáció után cserélni
              const newAppointment: AppointmentModel = {
                dog: this.selectedDog._id,
                //toDo: usert dinamikussá:

                user: JSON.parse(userFromStorage)._id,
                //user: "6293b58bdc9f697f23468c8d",
                date: this.appointmentForm.get("date")?.value,
                time: this.appointmentForm.get("time")?.value,
                comment: this.appointmentForm.get("comment")?.value
              }

              this.appointmentService.saveAppointment(newAppointment).subscribe({
                next: (appointment) => {
                  console.log(appointment)
                  this.appointmentForm.reset()
                },
                error: (e) => {
                  console.log(e)
                }
              })    //saveappointment vége

            }   //nullcheck vége

          } else {

            this.appointmentTaken = true;
            console.log("Ez az időpont már foglalt, kérjük válassz másikat!")
          }//külső if vége
        },
        error: (e) => console.log(e)
      })

    }



  }   //onSubmit vége

}
