import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-adoption-data',
  templateUrl: './adoption-data.component.html',
  styleUrls: ['./adoption-data.component.scss']
})
export class AdoptionDataComponent implements OnInit {

  public idReadFromRoute?: any;
  public subscription?: Subscription;
  public selectedUser?: UserModel;

  @Input() idFromParent?: any
  @Input() isChild: boolean = false;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    //ha szülőtől jön az ID, user-profile komponensből:
    if (this.idFromParent) {
      this.userService.getUser(this.idFromParent).subscribe({
        next: (user) => {
          this.selectedUser = user
        },
        error: (e) => {console.log(e)}
      })
    } else {
      //ha url-ben jön az ID, appointment-list komponensről
      this.subscription = this.activatedRoute.paramMap.subscribe({
        next: (param) => {this.idReadFromRoute = param.get("userId")},
        error: (e) => {console.log(e)}
      })    //subs vége

      this.userService.getUser(this.idReadFromRoute).subscribe({
        next: (user) => {
          this.selectedUser = user
        },
        error: (e) => {console.log(e)}
      })
    }

  }

}
