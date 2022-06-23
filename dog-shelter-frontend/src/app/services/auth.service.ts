import {Injectable, OnDestroy} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserLoginModel} from "../models/user-login.model";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {LoggedInUserModel} from "../models/logged-in-user.model";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

  private readonly BASE_URL: string = "http://localhost:3000/";
  private readonly userLoggedInObject: Subject<any> = new Subject<any>();
  private userRefreshSubscription?: Subscription;
  public loginDone = false;

  constructor(private http: HttpClient) {
    if(localStorage.getItem("refreshToken")) {
      this.userRefreshSubscription = this.refreshUserAuthentication().subscribe()
    } else {
      this.loginDone = true;
    }
  }

  public login(loginData: UserLoginModel): Observable<LoggedInUserModel> {
    return this.http.post<LoggedInUserModel>(this.BASE_URL + "login", loginData)
      .pipe(
        tap({
          next: (loggedInPerson) => {
            if(loggedInPerson) {
              this.userLoggedInObject.next({
                username: loggedInPerson.username,
                _id: loggedInPerson._id,
                isAdmin: loggedInPerson.isAdmin
              })

              localStorage.setItem("accessToken", loggedInPerson.accessToken);
              localStorage.setItem("refreshToken", loggedInPerson.refreshToken);
              localStorage.setItem("user", JSON.stringify({
                username: loggedInPerson.username,
                _id: loggedInPerson._id,
                isAdmin: loggedInPerson.isAdmin
              }));

              this.loginDone = true;

            }
          },
          error: (err) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            this.userLoggedInObject.next(null);
            console.log(err)

            this.loginDone = true;
          },
          complete: () => {}
        })
      )
  }

  public logout(): Observable<void> {
    const refreshToken = localStorage.getItem("refreshToken");
    return this.http.post<void>(this.BASE_URL + "logout", {refreshToken:refreshToken})
      .pipe(
        tap({
          next: () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            this.userLoggedInObject.next(null);
          },
          error: (err) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
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
              localStorage.setItem("accessToken", res.accessToken);
              localStorage.setItem("user", JSON.stringify(res.userData));
              this.userLoggedInObject.next(
                res.userData
              )
              this.loginDone = true;
            }                   //if vége
          },                    //next vége
          error: (err) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            this.userLoggedInObject.next(null);
            console.log(err)
            this.loginDone = true;
          },
          complete: () => {},
        })                      //tap vége
      )                         //pipe vége
  }


  public getUserLoggedInObject(): Observable<any> {
    return this.userLoggedInObject.asObservable();
  }

  public get userObjectValue() {
    if (typeof localStorage.getItem('user')  === "string")   {
      const userFromStorage: any = localStorage.getItem('user')
      return JSON.parse(userFromStorage);
    }
    return null;
  }

  ngOnDestroy(): void {
    this.userRefreshSubscription?.unsubscribe()
  }
}
