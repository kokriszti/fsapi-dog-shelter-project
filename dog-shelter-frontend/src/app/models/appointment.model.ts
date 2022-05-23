export interface AppointmentModel {
  id?: number,
  dogId: number,
  dogName: string,
  userId: number,
  userName: string,
  date: string,
  time: string,
  comment?: string
}
