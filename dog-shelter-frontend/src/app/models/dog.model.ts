import {OwnerModel} from "./owner.model";

export interface DogModel {
  id?: number,
  status: string,
  name: string,
  gender: string,
  size: string,
  dateOfBirth: string,
  description: string,
  imgSrc: string,
  isVaccinated: boolean,
  isSterilized: boolean,
  kennelNr: string,
  activity?: string,
  toChild?: boolean,
  toFlat?: boolean
  appointments?: string[]
  owner?: OwnerModel
}
