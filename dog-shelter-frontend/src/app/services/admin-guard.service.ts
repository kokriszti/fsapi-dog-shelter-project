import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.loginDone) {
      return this.authService.getUserLoggedInObject().pipe(
        map((user: any) => {
          if(!user.isAdmin) {
            return this.router.createUrlTree(["login"], { queryParams: { returnUrl: state.url }});
          } else {
            return true
          }
        })
      )
    } else {
      if (this.authService.userObjectValue !== null && this.authService.userObjectValue.isAdmin) {
        return true;
      } else {
        return this.router.createUrlTree(["login"], { queryParams: { returnUrl: state.url }});
      }
    }
  }
}
