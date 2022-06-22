import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdoptionFormModel} from "../../../models/adoption-form-model";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {UserModel} from "../../../models/user.model";
import { UserService } from "../../../services/user.service"
import { AppointmentService } from "../../../services/appointment.service"
import {DogModel} from "../../../models/dog.model";
import {AppointmentModel} from "../../../models/appointment.model";
import {AppointmentPopulatedModel} from "../../../models/appointment-populated.model";
import {DateService} from "../../../services/date.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public idReadFromRoute?: any;
  public subscription?: Subscription;
  public selectedUser?: UserModel;
  public userAppointment?: AppointmentPopulatedModel

  public userForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    confirmPassword: new FormControl("", Validators.required)
  })

  //AdoptionForm gyerek gombja, ha nincs text, nem jelenik meg a gomb:
  public btnText: string = "";
  //editMode-ban szerkeszthetők az adatok:
  public editPassword: boolean = false
  public editMode: boolean = false;

  //adoption-data komponensnek küldi, ha nem gyerek(adminon), formázás classek életbe lépnek
  public isChild: boolean = true;

  constructor(private userService: UserService,
              private appointmentService: AppointmentService,
              private activatedRoute: ActivatedRoute,
              private dateService: DateService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap.subscribe({
      next: (param) => {this.idReadFromRoute = param.get("userId")},
      error: (e) => {console.log(e)}
    })    //subs vége

    this.userService.getUser(this.idReadFromRoute).subscribe({
      next: (user) => {
        this.selectedUser = user
        this.userForm.get("username")?.setValue(user.username)
      },
      error: (e) => {console.log(e)}
    })

    const today = this.dateService.dateToString(0)

    this.appointmentService.getAppointments({date_gte: today, user: this.idReadFromRoute}).subscribe({
      next: (appointmentsFromServer: AppointmentPopulatedModel[]) => {
        console.log(appointmentsFromServer)
        this.userAppointment = appointmentsFromServer[appointmentsFromServer.length-1];
        console.log(this.userAppointment);
      },
      error: (e) => console.log(e)
    });
  }   //onInit vége

  public toggleEditMode(): void {
    this.editMode = true;
    this.editPassword = false
    this.btnText = "Változtatások mentése"
  }

  public changePassword() {
    this.editPassword = true;
    this.editMode = false;
  }

  public patchPassword(): void {

    if(this.selectedUser) {
      const newPassword = {
        password: this.userForm.get("password")?.value
      }

      this.userService.patchUser(this.selectedUser, newPassword).subscribe({
        next: (data: any) => {
          console.log(data);
          this.editPassword = false
        },
        error: (e) => {console.log(e);
        },
      })
    }

  }

  public updateUser(adoptionFormFromChild: AdoptionFormModel): void {
    //console.log(adoptionFormFromChild)
    if(this.selectedUser) {

      const userToUpdate: UserModel = {
        _id: this.idReadFromRoute,
        username: this.selectedUser.username,
        password: this.selectedUser.password,
        //toDo: ha később nem jön ki hiba, ezt kiszedni:
        // username: this.userForm.get("username")?.value,
        // password: this.userForm.get("password")?.value,
        isAdmin: this.selectedUser.isAdmin,
        adoptionForm: adoptionFormFromChild
      }

      //console.log(userToUpdate)
      this.userService.updateUser(userToUpdate).subscribe({
        next: (user: UserModel) => {
          console.log(user);
          this.editMode = false
          //adatok szerkesztése után újbóli lekérés, hogy a frissített adatok jelenjenek meg:
          this.userService.getUser(this.idReadFromRoute).subscribe({
            next: (user) => {
              this.selectedUser = user
              this.userForm.get("username")?.setValue(user.username)
            },
            error: (e) => {console.log(e)}
          })
        },
        error: (e) => {console.log(e);
        },
      })    //subscribe vége
    }
  }   //saveUser vége

  public deleteAppointment(id: string | undefined){
    if(id) {
    this.appointmentService.deleteAppointments(id).subscribe({
      next: () => {
        this.userAppointment = undefined
      },
      error: (e) => {console.log(e)}
    })
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
