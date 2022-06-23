import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit, OnDestroy {

  public userObject: any;
  private userSignInSubscription?: Subscription;
  private userRefreshSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userSignInSubscription = this.authService.getUserLoggedInObject().subscribe(
      user => this.userObject = user
    )

    //toDo: ez már auth service constructorban van, kiszedni:
    if(localStorage.getItem("refreshToken")) {
      this.userRefreshSubscription = this.authService.refreshUserAuthentication().subscribe()
    }
  }

  public logout(): void {
    this.authService.logout().subscribe({
      next: () => {},
      error: () => {},
      complete: () => {      },
    })
  }

  ngOnDestroy(): void {
    if(this.userSignInSubscription) this.userSignInSubscription.unsubscribe();
    if(this.userRefreshSubscription) this.userRefreshSubscription.unsubscribe();
  }

}
