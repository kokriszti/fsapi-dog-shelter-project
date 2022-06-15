export interface AppointmentPopulatedModel {
  _id: string,
  dogId: string,
  dog: {
    name: string,
    _id: string
  },
  userId: string,
  user: {
    _id: string,
    adoptionForm: {
      lastName: string,
      firstName: string
    }
  },
  date: string,
  time: string,
  comment?: string
}
