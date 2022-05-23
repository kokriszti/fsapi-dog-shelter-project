import { Component, OnInit } from '@angular/core';
import {AdoptionFormModel} from "../../../models/adoption-form-model";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {UserModel} from "../../../models/user.model";
import { UserService } from "../../../services/user.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    confirmPassword: new FormControl("", Validators.required)
  })

  public btnText: string = "Regisztrálok"



  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public saveUser(adoptionFormFromChild: AdoptionFormModel): void {
    //console.log(adoptionFormFromChild)
    const newUser: UserModel = {
      username: this.userForm.get("username")?.value,
      password: this.userForm.get("password")?.value,
      isAdmin: false,
      adoptionForm: adoptionFormFromChild
    }

    //console.log(newUser)
    this.userService.saveUser(newUser).subscribe({
      next: (user: UserModel) => {console.log(user);
      },
      error: (e) => {console.log(e);
      },
    })

    this.userForm.reset()

  }

}
