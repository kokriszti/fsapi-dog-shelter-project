import {AdoptionFormModel} from "./adoption-form-model";

export interface UserModel {
  id?: number,
  username: string,
  password: string,
  isAdmin: boolean,
  adoptionForm: AdoptionFormModel,
  appointmentId?: number
}
