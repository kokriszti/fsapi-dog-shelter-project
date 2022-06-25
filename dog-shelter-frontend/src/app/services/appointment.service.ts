import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentModel } from '../models/appointment.model';
import {AppointmentPopulatedModel} from "../models/appointment-populated.model";


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly APPOINTMENT_URL: string = "http://localhost:3000/api/appointment";

  constructor(private http: HttpClient) { }

  public getAppointments(params?: any): Observable<AppointmentPopulatedModel[]> {
    let queryParams: string = '';

    if (params) {
      queryParams = '?' + new URLSearchParams(params).toString()
    }

    console.log(queryParams)

    return this.http.get<AppointmentPopulatedModel[]>(`${this.APPOINTMENT_URL}${queryParams}`);
  }

  public getAppointment(id: number): Observable<AppointmentPopulatedModel> {
    return this.http.get<AppointmentPopulatedModel>(`${this.APPOINTMENT_URL}/${id}`);
  }

  public saveAppointment(appointment: AppointmentModel): Observable<AppointmentModel> {
    return this.http.post<AppointmentModel>(this.APPOINTMENT_URL, appointment)
    // Az elmentett objektumot adja vissza
  }

  public updateAppointment(appointment: AppointmentModel): Observable<AppointmentModel> {
    return this.http.put<AppointmentModel>(`${this.APPOINTMENT_URL}/${appointment._id}`, appointment)
    // A frissített objektumot adja vissza
  }

  public deleteAppointments(id: string): Observable<Object> {
    return this.http.delete<Object>(`${this.APPOINTMENT_URL}/${id}`)
    // Üres objektumot ad vissza
  }


}
