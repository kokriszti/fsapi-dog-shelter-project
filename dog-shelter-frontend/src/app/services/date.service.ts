import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public dateToString(distanceInDays: number): string {
    const requiredDate: Date = new Date(new Date().getTime() + (distanceInDays * 86400000))
    //ha egy számjegyű, 0-t tegyen elé
    const month: string = requiredDate.getMonth() < 9 ? `0${requiredDate.getMonth() + 1}` : `${requiredDate.getMonth() + 1}`
    const day: string = requiredDate.getDate() < 10 ? `0${requiredDate.getDate()}` : `${requiredDate.getDate()}`

    return `${requiredDate.getFullYear()}-${month}-${day}`
  }
}
