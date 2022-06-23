import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.loginDone) {
      return this.authService.getUserLoggedInObject().pipe(
        map((user: any) => {
          if(!user) {
            return this.router.createUrlTree(["login"], { queryParams: { returnUrl: state.url }});
          } else {
            return true
          }
        })
      )

    } else {
      if (this.authService.userObjectValue !== null) {
        return true;
      } else {
        return this.router.createUrlTree(["login"], { queryParams: { returnUrl: state.url }});
      }
    }
  }
}
