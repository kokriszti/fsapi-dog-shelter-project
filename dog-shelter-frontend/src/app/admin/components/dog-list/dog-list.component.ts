import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DogModel } from 'src/app/models/dog.model';
import { DogService } from 'src/app/services/dog.service';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})
export class DogListComponent implements OnInit {

  public dogs: DogModel[] = [];
  public dogToDelete?: DogModel
  public sizeInput: FormControl = new FormControl("");
  public nameInput: FormControl = new FormControl("");
  public genderInput: FormControl = new FormControl("");

  constructor(private dogService: DogService, private router: Router) { }

  ngOnInit(): void {
    this.dogService.getDogs().subscribe({
      next: (dogsFromServer: DogModel[]) => {
        this.dogs = dogsFromServer;
        console.log(this.dogs);
      },
      error: (e) => console.log(e)
    });

    //szűrők alaphelyzetbe
    this.sizeInput.setValue("");
    this.genderInput.setValue("");
  }   //onInit vége

  public getDogsByFilter(): void {
    let queryObj:any = {};

    queryObj.name_like = this.nameInput.value;

    if (this.sizeInput.value !== "") {
      queryObj.size = this.sizeInput.value;
    }

    if (this.genderInput.value !== "") {
      queryObj.gender = this.genderInput.value;
    }

    this.dogService.getDogs(queryObj).subscribe({
      next: dogs => this.dogs = dogs,
      error: (e) => console.log(e)
    })
  }    //szűrő vége

  public setDogToDelete(dog: DogModel) {
    if (dog) {
      this.dogToDelete = dog;
    }
  }

  public deleteDog (dog: DogModel | undefined) {
    if (dog?._id) {
      this.dogService.deleteDog(dog._id).subscribe({
        next: () => {
          this.dogService.getDogs().subscribe({
            next: (dogsFromServer: DogModel[]) => {
              this.dogs = dogsFromServer;
              console.log(this.dogs);
            },
            error: (e) => console.log(e)
          });
        },
        error: (e) => console.log(e)
      })
    }

  }

}
