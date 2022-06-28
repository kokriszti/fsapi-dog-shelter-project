import {Component, OnDestroy, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogModel } from 'src/app/models/dog.model';
import { DogService } from 'src/app/services/dog.service';
import {DateService} from "../../../services/date.service";

@Component({
  selector: 'app-dog-edit',
  templateUrl: './dog-edit.component.html',
  styleUrls: ['./dog-edit.component.scss']
})
export class DogEditComponent implements OnInit, OnDestroy {

  public idReadFromRoute?: any;
  public subscription?: Subscription;
  public selectedDog?: DogModel;
  public maxDate: string = "";
  public minDate: string = "2002-01-01";

  public dogForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ0-9 ./]+$/)]),
    gender: new FormControl("", Validators.required),
    size: new FormControl("", Validators.required),
    dateOfBirth: new FormControl("", [Validators.required, this.dateValidator]),
    description: new FormControl("", Validators.required),
    imgSrc: new FormControl("", Validators.required),
    isVaccinated: new FormControl("", Validators.required),
    isSterilized: new FormControl("", Validators.required),
    kennelNr: new FormControl("", [Validators.required, Validators.min(1), Validators.max(30)]),
    activity: new FormControl(""),
    toChild: new FormControl(""),
    toFlat: new FormControl("")
  })

  constructor(private activatedRoute: ActivatedRoute,
              private dogService: DogService,
              private dateService: DateService,
              private router: Router) { }

  ngOnInit(): void {

    this.maxDate = this.dateService.dateToString(0)

    this.subscription = this.activatedRoute.paramMap.subscribe({
      next: (param) => {this.idReadFromRoute = param.get("id")},
      error: (e) => {console.log(e)}
    })    //subs vége

    if(this.idReadFromRoute !== "new-dog") {

      this.dogService.getDog(this.idReadFromRoute).subscribe({
        next: (dog) => {
          this.selectedDog = dog
          console.log(this.selectedDog)
          //todo: formot felpopulálni, lásd adoption-form TS

          this.dogForm.get("name")?.setValue(dog.name)
          this.dogForm.get("gender")?.setValue(dog.gender)
          this.dogForm.get("size")?.setValue(dog.size)
          this.dogForm.get("dateOfBirth")?.setValue(dog.dateOfBirth)
          this.dogForm.get("description")?.setValue(dog.description)
          this.dogForm.get("imgSrc")?.setValue(dog.imgSrc)
          if (dog.isVaccinated === true) {
            this.dogForm.get("isVaccinated")?.setValue("Igen")
          } else {
            this.dogForm.get("isVaccinated")?.setValue("Nem")
          }
          if (dog.isSterilized === true) {
            this.dogForm.get("isSterilized")?.setValue("Igen")
          } else {
            this.dogForm.get("isSterilized")?.setValue("Nem")
          }
          this.dogForm.get("kennelNr")?.setValue(dog.kennelNr)
          if (dog.hasOwnProperty('activity')) {
            this.dogForm.get("activity")?.setValue(dog.activity)
          }
          if (dog.hasOwnProperty('toChild')) {
            if (dog.toChild === true) {
              this.dogForm.get("toChild")?.setValue("Igen")
            } else if (dog.toChild === false) {
              this.dogForm.get("toChild")?.setValue("Nem")
            }
          }
          if (dog.hasOwnProperty('toFlat')) {
            if (dog.toFlat === true) {
              this.dogForm.get("toFlat")?.setValue("Igen")
            } else if (dog.toFlat === false) {
              this.dogForm.get("toFlat")?.setValue("Nem")
            }
          }

        },
        error: (e) => {console.log(e)}
      })

    }  //if vége
  }   //onInit vége

  public dateValidator(dateInput: AbstractControl): ValidationErrors | null {
    //minimum dátum beállítása következő napra
    const dateToday: Date = new Date()
    //ha egy számjegyű, 0-t tegyen elé
    const month: string = dateToday.getMonth() < 9 ? `0${dateToday.getMonth() + 1}` : `${dateToday.getMonth() + 1}`
    const day: string = dateToday.getDate() < 10 ? `0${dateToday.getDate()}` : `${dateToday.getDate()}`

    const today = `${dateToday.getFullYear()}-${month}-${day}`
    return dateInput.value <= today && dateInput.value >= "2002-01-01"? null : {dateError: "Valós, jövőbeli dátumot adj meg!"}
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public toggleRadioYes(fieldName: string): void {
    if (this.dogForm.get(fieldName)?.value === "Igen")  {
      this.dogForm.get(fieldName)?.setValue("")
    }
  }

  public toggleRadioNo(fieldName: string): void {
    if (this.dogForm.get(fieldName)?.value === "Nem")  {
      this.dogForm.get(fieldName)?.setValue("")
    }
  }

  public convertStringToBoolean (field: AbstractControl | null): void {
    if (field?.value === "Igen" ) {
      field.setValue(true);
    } else if (field?.value === "Nem") {
      field?.setValue(false);
    }
  }

  public deleteEmptyProperty (dog: any, key: string): void {
    if(dog[key] === "") {
      delete dog[key]
    }
  }

  public onSubmit(): void {
    console.log(this.dogForm.value)

    this.convertStringToBoolean(this.dogForm.get("isVaccinated"))
    this.convertStringToBoolean(this.dogForm.get("isSterilized"))
    this.convertStringToBoolean(this.dogForm.get("toChild"))
    this.convertStringToBoolean(this.dogForm.get("toFlat"))

    const myDog: DogModel = this.dogForm.value


    this.deleteEmptyProperty(myDog, "toChild");
    this.deleteEmptyProperty(myDog, "toFlat");
    this.deleteEmptyProperty(myDog, "activity");


    if (this.idReadFromRoute === "new-dog") {          //ha új kutáyt mentünk
      myDog.status = "adoptable"
      this.dogService.saveDog(myDog).subscribe({
        next: (dog: DogModel) => {
          console.log(dog);
          this.dogForm.reset();
          this.router.navigate(["admin", "dogs"])
        },
        error: (e) => {console.log(e);
        },
      })
    } else  if (this.selectedDog){                 //ha meglévő kutyát frissítünk
      myDog.status = this.selectedDog.status;
      myDog._id = this.selectedDog._id;
      if (this.selectedDog.status === "adopted") {
        myDog.owner = this.selectedDog.owner
      }
      this.dogService.updateDog(myDog).subscribe({
        next: (dog: DogModel) => {
          console.log(dog);
          this.dogForm.reset()
          this.router.navigate(["admin", "dogs", this.selectedDog?._id])
        },
        error: (e) => {console.log(e);
        },
      })
    }
  }     //onSubmit vége

  public cancel(): void {
    this.dogForm.reset()
    if (this.selectedDog) {
      this.router.navigate(["admin", "dogs", this.selectedDog?._id])
    }
    else {
      this.router.navigate(["admin", "dogs"])
    }
  }


  }


