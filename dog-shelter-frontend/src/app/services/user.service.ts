import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_URL: string = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  public getUsers(params?: any): Observable<UserModel[]> {
    let queryParams: string = '';

    if (params) {
      queryParams = '?' + new URLSearchParams(params).toString()
    }

    return this.http.get<UserModel[]>(`${this.USER_URL}${queryParams}`);
  }

  public getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.USER_URL}/${id}`);
  }

  public saveUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.USER_URL, user)
    // Az elmentett objektumot adja vissza
  }

  public updateUser(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.USER_URL}/${user.id}`, user)
    // A frissített objektumot adja vissza
  }

  public patchUser(user: UserModel, body: any) {
    return this.http.patch(`${this.USER_URL}/${user.id}`, body)
  }

  public deleteUser(id: number): Observable<Object> {
    return this.http.delete<Object>(`${this.USER_URL}/${id}`)
    // Üres objektumot ad vissza
  }

}
