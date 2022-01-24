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
  userId: number;
  user: User;
  borrow: string;
  estimatedReturn: Date;
  returndAt: Date;
  status: number;
  isReservation: boolean;
  titlePublisherId: number;
  titlePublisher: TitlePublisher;
  title: string;
  title1: string;
}

export type Reservation = Borrow;
