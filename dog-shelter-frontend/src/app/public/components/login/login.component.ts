import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {AdoptionFormModel} from "../../../models/adoption-form-model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public returnUrl: string = "";

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  public wrongAuth: boolean = false;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  public signIn(): void {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.authService.login(this.loginForm.value).subscribe({
          next: () => {
          },
          error: () => {
            this.wrongAuth = true
          },
          complete: () => {
            this.loginForm.reset()
            this.router.navigateByUrl(this.returnUrl)
          },
        }
      )
    }
  }

  public clearErrMessage(): void{
    this.wrongAuth = false;
  }

}
