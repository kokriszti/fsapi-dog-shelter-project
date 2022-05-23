import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentModel } from '../models/appointment.model';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly APPOINTMENT_URL: string = "http://localhost:3000/appointments";

  constructor(private http: HttpClient) { }

  public getAppointments(params?: any): Observable<AppointmentModel[]> {
    let queryParams: string = '';

    if (params) {
      queryParams = '?' + new URLSearchParams(params).toString()
    }

    console.log(queryParams)

    return this.http.get<AppointmentModel[]>(`${this.APPOINTMENT_URL}${queryParams}`);
  }

  public getAppointment(id: number): Observable<AppointmentModel> {
    return this.http.get<AppointmentModel>(`${this.APPOINTMENT_URL}/${id}`);
  }

  public saveAppointment(appointment: AppointmentModel): Observable<AppointmentModel> {
    return this.http.post<AppointmentModel>(this.APPOINTMENT_URL, appointment)
    // Az elmentett objektumot adja vissza
  }

  public updateAppointment(appointment: AppointmentModel): Observable<AppointmentModel> {
    return this.http.put<AppointmentModel>(`${this.APPOINTMENT_URL}/${appointment.id}`, appointment)
    // A frissített objektumot adja vissza
  }

  public deleteAppointments(id: number): Observable<Object> {
    return this.http.delete<Object>(`${this.APPOINTMENT_URL}/${id}`)
    // Üres objektumot ad vissza
  }


}
