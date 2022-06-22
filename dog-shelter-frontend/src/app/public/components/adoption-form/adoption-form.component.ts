import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AdoptionFormModel } from 'src/app/models/adoption-form-model';
import { UserService } from 'src/app/services/user.service';
import {UserModel} from "../../../models/user.model";

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.scss']
})
export class AdoptionFormComponent implements OnInit {

  public adoptionForm: FormGroup = new FormGroup({
    lastName: new FormControl("", [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ. ]+$/)]),
    firstName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern(/^[a-záéíóöőúüűA-ZÁÉÍÓÖŐÚÜŰ. ]+$/)]),
    phone: new FormControl("", [Validators.required, Validators.pattern(/^\d+$/)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    age: new FormControl("", [Validators.required, Validators.min(18), Validators.max(100)]),
    nrOfPplInHousehold: new FormControl("", [Validators.required, Validators.min(1), Validators.max(20)]),
    childrenInHousehold: new FormControl("", [Validators.required, Validators.min(1), Validators.max(20)]),
    ageOfYoungestChild: new FormControl(""),
    typeOfHouse: new FormControl("", Validators.required),
    otherDog: new FormControl("", Validators.required),
    otherPet: new FormControl("", Validators.required),
    otherPetDetails: new FormControl(""),
    nrOfHoursAlone: new FormControl("", [Validators.required, Validators.min(0), Validators.max(24)]),
    nrOfDailyWalks: new FormControl("", [Validators.required, Validators.min(1), Validators.max(5)]),
    wantedSizeSmall: new FormControl(false),
    wantedSizeMedium: new FormControl(false),
    wantedSizeBig: new FormControl(false),
    wantedAgePuppy: new FormControl(false),
    wantedAgeYoung: new FormControl(false),
    wantedAgeAdult: new FormControl(false),
    wantedAgeOld: new FormControl(false),
    introduction: new FormControl("", [Validators.required, Validators.maxLength(1000)]),
  })

  public hasChild = false
  public hasOtherPet = false

  @Output() public submitEE: EventEmitter<AdoptionFormModel> = new EventEmitter<AdoptionFormModel>()
  @Input() btnText: string = ""
  @Input() idReadFromRoute: any =""
  @Input() editMode?: boolean

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    if(this.idReadFromRoute) {
      this.userService.getUser(this.idReadFromRoute).subscribe({
        next: (user) => {
          console.log(user.adoptionForm["lastName"])

           this.adoptionForm.get("firstName")?.setValue(user.adoptionForm.firstName)
           this.adoptionForm.get("lastName")?.setValue(user.adoptionForm.lastName)
           this.adoptionForm.get("phone")?.setValue(user.adoptionForm.phone)
           this.adoptionForm.get("email")?.setValue(user.adoptionForm.email)
           this.adoptionForm.get("age")?.setValue(user.adoptionForm.age)
           this.adoptionForm.get("nrOfPplInHousehold")?.setValue(user.adoptionForm.nrOfPplInHousehold)
          if (user.adoptionForm.childrenInHousehold === true) {
            this.adoptionForm.get("childrenInHousehold")?.setValue("Igen")
            this.hasChild = true
            this.adoptionForm.get("ageOfYoungestChild")?.setValue(user.adoptionForm.ageOfYoungestChild)
          } else {
            this.adoptionForm.get("childrenInHousehold")?.setValue("Nem")
          }
          this.adoptionForm.get("typeOfHouse")?.setValue(user.adoptionForm.typeOfHouse)
          if (user.adoptionForm.otherDog === true) {
            this.adoptionForm.get("otherDog")?.setValue("Igen")
          } else {
            this.adoptionForm.get("otherDog")?.setValue("Nem")
          }
          if (user.adoptionForm.otherPet === true) {
            this.adoptionForm.get("otherPet")?.setValue("Igen")
            this.hasOtherPet = true
            this.adoptionForm.get("otherPetDetails")?.setValue(user.adoptionForm.otherPetDetails)
          } else {
            this.adoptionForm.get("otherPet")?.setValue("Nem")
          }
          this.adoptionForm.get("nrOfHoursAlone")?.setValue(user.adoptionForm.nrOfHoursAlone)
          this.adoptionForm.get("nrOfDailyWalks")?.setValue(user.adoptionForm.nrOfDailyWalks)
          this.adoptionForm.get("wantedSizeSmall")?.setValue(user.adoptionForm.wantedSizeSmall)
          this.adoptionForm.get("wantedSizeMedium")?.setValue(user.adoptionForm.wantedSizeMedium)
          this.adoptionForm.get("wantedSizeBig")?.setValue(user.adoptionForm.wantedSizeBig)
          this.adoptionForm.get("wantedAgePuppy")?.setValue(user.adoptionForm.wantedAgePuppy)
          this.adoptionForm.get("wantedAgeYoung")?.setValue(user.adoptionForm.wantedAgeYoung)
          this.adoptionForm.get("wantedAgeAdult")?.setValue(user.adoptionForm.wantedAgeAdult)
          this.adoptionForm.get("wantedAgeOld")?.setValue(user.adoptionForm.wantedAgeOld)
          this.adoptionForm.get("introduction")?.setValue(user.adoptionForm.introduction)

          // for (const property in user.adoptionForm) {
          //   this.adoptionForm.get(property)?.setValue("user.adoptionForm[property]")
          // }

          //this.adoptionForm.setValue(user.adoptionForm)
        },
        error: (e) => {console.log(e)}
      })
    }
  }   //onInit vége



  //opcionális mezők megjelenítése/rejtése:
  public toggleHasChild(event: any): void {
    if (event.target.value === "Igen") {
      this.hasChild = true
    }
    if (event.target.value === "Nem") {
      this.hasChild = false
      this.adoptionForm.get("ageOfYoungestChild")?.setValue("")
    }
  }

  public toggleHasOtherPet(event: any): void {
    if (event.target.value === "Igen") {
      this.hasOtherPet = true
    }
    if (event.target.value === "Nem") {
      this.hasOtherPet = false
      this.adoptionForm.get("otherPetDetails")?.setValue("")
    }
  }

  public convertStringToBoolean (field: AbstractControl | null): void {
    if (field?.value === "Igen" ) {
      field.setValue(true);
    } else if (field?.value === "Nem") {
      field?.setValue(false);
    }
  }

  public deleteEmptyProperty (adoptionForm: any, key: string): void {
    if(adoptionForm[key] === "") {
      delete adoptionForm[key]
    }
  }


  public onSubmit(): void {
    if (this.adoptionForm.valid) {
      //Igen/Nem stringek booleanné:
      this.convertStringToBoolean (this.adoptionForm.get("childrenInHousehold"))
      this.convertStringToBoolean (this.adoptionForm.get("otherPet"))
      this.convertStringToBoolean (this.adoptionForm.get("otherDog"))


      //console.log(this.adoptionForm.value)
      //console.log(this.adoptionForm.valid)

      const myAdoptionForm: AdoptionFormModel = this.adoptionForm.value

      this.deleteEmptyProperty(myAdoptionForm, "ageOfYoungestChild");
      this.deleteEmptyProperty(myAdoptionForm, "otherPetDetails");


      //console.log(myAdoptionForm)
      this.submitEE.emit(myAdoptionForm)
      this.adoptionForm.reset()
    }   //if valid vége

  }  //onSubmit vége

}
