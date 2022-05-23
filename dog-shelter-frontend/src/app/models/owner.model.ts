export interface OwnerModel {
  ownerLastName: string;
  ownerFirstName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerAddress: {
    zip: number,
    city: string,
    streetAndNr: string
  }
  dateOfAdoption: string
}
