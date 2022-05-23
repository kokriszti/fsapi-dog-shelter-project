import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogModel } from 'src/app/models/dog.model';
import { DogService } from 'src/app/services/dog.service';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {OwnerModel} from "../../../models/owner.model";

@Component({
  selector: 'app-dog-data',
  templateUrl: './dog-data.component.html',
  styleUrls: ['./dog-data.component.scss']
})
export class DogDataComponent implements OnInit, OnDestroy {

  public idReadFromRoute?: any;
  public subscription?: Subscription;
  public selectedDog?: DogModel;
  public adoptionEditMode: boolean = false;
  public minDate: string = ""

  public ownerForm: FormGroup = new FormGroup({
    ownerLastName: new FormControl("", [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ. ]+$/)]),
    ownerFirstName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(/^[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ. ]+$/)]),
    ownerEmail: new FormControl("", [Validators.required, Validators.email]),
    ownerPhone: new FormControl("", [Validators.required, Validators.pattern(/^\d+$/)]),
    ownerAddress: new FormGroup({
      zip: new FormControl("", [Validators.required, Validators.pattern(/^\d{4}$/)]),
      city: new FormControl("", [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ ]+$/)]),
      streetAndNr: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(/^[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ0-9 /]+$/)])
    }),
    dateOfAdoption: new FormControl("", [Validators.required, this.dateValidator]),
  })

  constructor(private activatedRoute: ActivatedRoute,
              private dogService: DogService,
              private router: Router) { }

  ngOnInit(): void {

    //minimum dátum beállítása egy hétre vissza
    const dateWeekBack: Date = new Date(new Date().getTime() - 604800000)
    //ha egy számjegyű, 0-t tegyen elé
    const month: string = dateWeekBack.getMonth() < 9 ? `0${dateWeekBack.getMonth() + 1}` : `${dateWeekBack.getMonth() + 1}`
    const day: string = dateWeekBack.getDate() < 10 ? `0${dateWeekBack.getDate()}` : `${dateWeekBack.getDate()}`

    this.minDate = `${dateWeekBack.getFullYear()}-${month}-${day}`

    this.subscription = this.activatedRoute.paramMap.subscribe({
      next: (param) => {this.idReadFromRoute = param.get("id")},
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
    //minimum dátum beállítása egy héttel korábbra
    const dateWeekBack: Date = new Date(new Date().getTime() - 604800000)
    //ha egy számjegyű, 0-t tegyen elé
    const month: string = dateWeekBack.getMonth() < 9 ? `0${dateWeekBack.getMonth() + 1}` : `${dateWeekBack.getMonth() + 1}`
    const day: string = dateWeekBack.getDate() < 10 ? `0${dateWeekBack.getDate()}` : `${dateWeekBack.getDate()}`

    let weekBack = `${dateWeekBack.getFullYear()}-${month}-${day}`
    return dateInput.value >= weekBack ? null : {dateError: "Valós dátumot adj meg!"}
  }

  public editAdoption(): void {
    this.adoptionEditMode = true
  }

  public adopt():void {

    const owner: OwnerModel = this.ownerForm.value

    const updateBody = {
      owner: owner,
      status: "adopted"
    }

    if (this.selectedDog) {
      this.dogService.patchDog(this.selectedDog, updateBody).subscribe({
        next: (data: any) => {
          console.log(data);
          this.adoptionEditMode = false
        },
        error: (e) => {console.log(e);
        },
      })
    }



  }

}
