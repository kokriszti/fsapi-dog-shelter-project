import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserLoginModel} from "../models/user-login.model";
import {BehaviorSubject, Observable} from "rxjs";
import {LoggedInUserModel} from "../models/logged-in-user.model";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL: string = "http://localhost:3000/";
  private userLoggedInObject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private http: HttpClient) { }

  public login(loginData: UserLoginModel): Observable<LoggedInUserModel> {
    return this.http.post<LoggedInUserModel>(this.BASE_URL + "login", loginData)
      .pipe(
        tap({
          next: (loggedInPerson) => {
            if(loggedInPerson) {
              localStorage.setItem("accessToken", loggedInPerson.accessToken);
              localStorage.setItem("refreshToken", loggedInPerson.refreshToken);

              this.userLoggedInObject.next({
                username: loggedInPerson.username,
                _id: loggedInPerson._id,
                isAdmin: loggedInPerson.isAdmin
              })
            }
          },
          error: (err) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            this.userLoggedInObject.next(null);
            console.log(err)
          },
          complete: () => {}
        })
      )
  }

  public logout(): Observable<void> {
    const refreshToken = localStorage.getItem("refreshToken");
    return this.http.post<void>(this.BASE_URL + "logout", {refreshToken:refreshToken})    //{token} ugyanaz mint {token:token}? kipróbálni
      .pipe(
        tap({
          next: () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            this.userLoggedInObject.next(null);
          },
          error: (err) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            this.userLoggedInObject.next(null);
            console.log(err)
          },
          complete: () => {}
        })
      )
  }

  public refreshUserAuthentication(): Observable<any> {
    return this.http.post<any>(this.BASE_URL + "refresh", {refreshToken: localStorage.getItem("refreshToken")})
      .pipe(
        tap({
          next: (res) => {            //res ok, benne van az accessToken
            if(res) {
              //ha már van accessToken kulcs alatt vmi, felülírja:
              localStorage.setItem("accessToken", res.accessToken)
              this.userLoggedInObject.next(
                res.userData
              )
            }                   //if vége
          },                    //next vége
          error: (err) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            this.userLoggedInObject.next(null);
            console.log(err)
          },
          complete: () => {},
        })                      //tap vége
      )                         //pipe vége
  }


  public getUserLoggedInObject(): Observable<any> {
    return this.userLoggedInObject.asObservable();
  }
}
