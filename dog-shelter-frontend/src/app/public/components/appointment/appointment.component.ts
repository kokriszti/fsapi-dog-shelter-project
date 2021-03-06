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
import {AuthService} from "../../../services/auth.service";


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
  public today: string = ""
  public appointmentTaken: boolean = false
  public selectedUser: any;
  public hasAppointment: boolean = false;
  private userSignInSubscription?: Subscription;

  public appointmentForm: FormGroup = new FormGroup({
    date: new FormControl("", [Validators.required, this.dateValidator]),
    time: new FormControl("", Validators.required),
    comment: new FormControl("", Validators.maxLength(500))
  })

  constructor(private activatedRoute: ActivatedRoute,
              private dogService: DogService,
              private appointmentService: AppointmentService,
              private dateService: DateService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.today = this.dateService.dateToString(0)

    this.minDate = this.dateService.dateToString(1)
    //m??snapt??l az??v v??g??ig
    this.maxDate = `${new Date(new Date().getTime() + 86400000).getFullYear()}-12-31`

    this.subscription = this.activatedRoute.paramMap.subscribe({
      next: (param) => {this.idReadFromRoute = param.get("dogId")},
      error: (e) => {console.log(e)}
    })    //subs v??ge

    this.dogService.getDog(this.idReadFromRoute).subscribe({
      next: (dog) => {this.selectedDog = dog},
      error: (e) => {console.log(e)}
    })
    //toDo kiszedni
    // this.userSignInSubscription = this.authService.getUserLoggedInObject().subscribe(
    //   user => this.selectedUser = user
    // )
    if (typeof localStorage.getItem('user')  === "string") {
      const userFromStorage: any = localStorage.getItem('user')
      this.selectedUser = JSON.parse(userFromStorage);
    }

  }



  public dateValidator(dateInput: AbstractControl): ValidationErrors | null {
    //minimum d??tum be??ll??t??sa k??vetkez?? napra
    const dateNextDay: Date = new Date(new Date().getTime() + 86400000)
    //ha egy sz??mjegy??, 0-t tegyen el??
    const month: string = dateNextDay.getMonth() < 9 ? `0${dateNextDay.getMonth() + 1}` : `${dateNextDay.getMonth() + 1}`
    const day: string = dateNextDay.getDate() < 10 ? `0${dateNextDay.getDate()}` : `${dateNextDay.getDate()}`

    const nextDay = `${dateNextDay.getFullYear()}-${month}-${day}`
    return dateInput.value >= nextDay && dateInput.value <= `${dateNextDay.getFullYear()}-12-31`? null : {dateError: "Val??s, j??v??beli d??tumot adj meg!"}
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

          //ha nincs ez az id??pont m??g lefoglalva:
          if (this.reservedAppointments.length <= 0) {

            let queryObj2: any = {}
            queryObj2.user = this.selectedUser._id;
            queryObj2.date_gte = this.today;

            this.appointmentService.getAppointments(queryObj2).subscribe({
              next: ownAppointments => {
                //ha usernek nincs m??g lefoglalt j??v??beli id??pontja:
                if (ownAppointments.length <= 0) {
                  //nullcheck:
                  if (this.selectedDog && this.selectedDog._id ) {

                    const newAppointment: AppointmentModel = {
                      dog: this.selectedDog._id,
                      user: this.selectedUser._id,
                      date: this.appointmentForm.get("date")?.value,
                      time: this.appointmentForm.get("time")?.value,
                      comment: this.appointmentForm.get("comment")?.value
                    }

                    this.appointmentService.saveAppointment(newAppointment).subscribe({
                      next: (appointment) => {
                        console.log(appointment)
                        this.appointmentForm.reset()
                        this.router.navigate(["dogs", this.selectedDog?._id])
                      },
                      error: (e) => {
                        console.log(e)
                      }
                    })    //saveappointment v??ge

                  }   //nullcheck v??ge
                } else {
                  //ha m??r van j??v??beli id??pontja
                  this.hasAppointment = true;
                }
              }       //bels?? next v??ge
            })



          } else {
            //ha az id??pont m??r foglalt
            this.appointmentTaken = true;
            console.log("Ez az id??pont m??r foglalt, k??rj??k v??lassz m??sikat!")
          }//k??ls?? if v??ge
        },
        error: (e) => console.log(e)
      })

    }



  }   //onSubmit v??ge

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    if(this.userSignInSubscription) this.userSignInSubscription.unsubscribe();
  }

}
