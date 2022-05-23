import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogModel } from 'src/app/models/dog.model';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss']
})
export class DogDetailsComponent implements OnInit, OnDestroy {

  public idReadFromRoute?: any;
  public subscription?: Subscription;
  public selectedDog?: DogModel;

  constructor(private activatedRoute: ActivatedRoute,
              private dogService: DogService,
              private router: Router) { }

  ngOnInit(): void {

    this.subscription = this.activatedRoute.paramMap.subscribe({
      next: (param) => {this.idReadFromRoute = param.get("id")},
      error: (e) => {console.log(e)}
    })    //subs vége

    this.dogService.getDog(this.idReadFromRoute).subscribe({
      next: (dog) => {this.selectedDog = dog},
      error: (e) => {console.log(e)}
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
