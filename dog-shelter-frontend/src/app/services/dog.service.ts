import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DogModel } from '../models/dog.model';
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private readonly DOG_URL: string = "http://localhost:3000/api/dog";

  constructor(private http: HttpClient) { }

  public getDogs(params?: any): Observable<DogModel[]> {
    let queryParams: string = '';

    if (params) {
      queryParams = '?' + new URLSearchParams(params).toString()
    }

    return this.http.get<DogModel[]>(`${this.DOG_URL}${queryParams}`);
  }

  public getDog(_id: number): Observable<DogModel> {
    return this.http.get<DogModel>(`${this.DOG_URL}/${_id}`);
  }

  public saveDog(dog: DogModel): Observable<DogModel> {
    return this.http.post<DogModel>(this.DOG_URL, dog)
    // Az elmentett objektumot adja vissza
  }

  public updateDog(dog: DogModel): Observable<DogModel> {
    return this.http.put<DogModel>(`${this.DOG_URL}/${dog._id}`, dog)
    // A frissített objektumot adja vissza
  }

  public patchDog(dog: DogModel, body: any) {
    return this.http.patch(`${this.DOG_URL}/${dog._id}`, body)
  }

  public deleteDog(_id: string): Observable<Object> {
    return this.http.delete<Object>(`${this.DOG_URL}/${_id}`)
    // Üres objektumot ad vissza
  }


}
