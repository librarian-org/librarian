export interface ContatctType {
  id: string;
  name: string;
}

export interface Contact {
  id: string;
  info: string;
  contactType: ContatctType
}

export interface UserType {
  id: string;
  name: string;
}

export interface Country {
  id: string;
  name: string;
}

export interface Region {
  id: string;
  name: string;
  country: Country;
}
export interface City {
  id: string;
  name: string;
  region: Region;
}

export interface Address {
  id: string;
  city: City;
  publicPlace: string;
  number: string;
  zipcode: string;
  neighborhood: string;
  complement: string;
}

export type Person = {
  id: string;
  name: string;
  document: string;
  login: string;
  notes: string;
  userType: UserType;
  contacts: Contact[];
  addresses: Address[];
}
