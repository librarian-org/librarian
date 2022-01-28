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

interface User {
  id: string;
  name: string;
  email: string;
}

export type Borrow = {
  id: number;
  userId: number;
  user: User;
  borrow: Date;
  estimatedReturn: Date;
  returnedAt: Date;
  status: number;
  isReservation: boolean;
  titlePublisherId: number;
  titlePublisher: TitlePublisher;
}

export type Reservation = Borrow;