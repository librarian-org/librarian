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

interface Publisher {
  id: string;
  name: string;
}

export interface Title {
  id: string;
  name: string;
  ISBN: string;
}

interface TitlePublisher {
  id: string;
  classification: string;
  publisherId: number;
  publisher: Publisher;
  title: Title;
}
interface BorrowRenovation {
  id: number;
  borrowId: number;
  borrowedAt: Date;
  renewedAt: Date;
  returnedAt: Date;
}

export interface Borrows {
  id: number;
  userId: number;
  user: Person;
  borrow: Date;
  estimatedReturn: Date;
  returnedAt: Date;
  status: number;
  isReservation: boolean;
  titlePublisherId: number;
  titlePublisher: TitlePublisher;
  renovations: BorrowRenovation[]
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
  borrows: Borrows[];
}
