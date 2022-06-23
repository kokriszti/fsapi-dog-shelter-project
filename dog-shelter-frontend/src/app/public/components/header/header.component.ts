import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public userObject: any;
  private userSignInSubscription?: Subscription;
  private userRefreshSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSignInSubscription = this.authService.getUserLoggedInObject().subscribe(
      user => this.userObject = user
    )

    //toDo: kell ide? auth service constructorbanmár bent van, kipróbálni:
    if(localStorage.getItem("refreshToken")) {
      this.userRefreshSubscription = this.authService.refreshUserAuthentication().subscribe()
    }
  }

  public logout(): void {
    this.authService.logout().subscribe({
      next: () => {},
      error: () => {},
      complete: () => {},
    })
  }

  ngOnDestroy(): void {
    if(this.userSignInSubscription) this.userSignInSubscription.unsubscribe();
    //toDo: ha onInitben nem kell, ezt is kiszedni:
    if(this.userRefreshSubscription) this.userRefreshSubscription.unsubscribe();
  }

}
