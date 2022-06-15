import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DogModel } from 'src/app/models/dog.model';
import { DogService } from 'src/app/services/dog.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit {

  public dogs: DogModel[] = [];
  public sizeInput: FormControl = new FormControl("");
  public nameInput: FormControl = new FormControl("");
  public genderInput: FormControl = new FormControl("");

  constructor(private dogService: DogService, private router: Router) { }

  ngOnInit(): void {
    this.dogService.getDogs({status: "adoptable"}).subscribe({
      next: (dogsFromServer: DogModel[]) => {
        this.dogs = dogsFromServer;
        console.log(this.dogs);
      },
      error: (e) => console.log(e)
    });

    this.sizeInput.setValue("");
    this.genderInput.setValue("");
  }

  public getDogsByFilter(): void {
    let queryObj:any = {status: "adoptable"};

    if (this.nameInput.value !== "") {
      queryObj.name_like = this.nameInput.value;
    }


    if (this.sizeInput.value !== "") {
      queryObj.size = this.sizeInput.value;
    }

    if (this.genderInput.value !== "") {
      queryObj.gender = this.genderInput.value;
    }

    //console.log(new URLSearchParams("date_gte=2022-06-09&_sort=date").get("_sort"))

    this.dogService.getDogs(queryObj).subscribe({
      next: dogs => this.dogs = dogs,
      error: (e) => console.log(e)
    })
  }


}
