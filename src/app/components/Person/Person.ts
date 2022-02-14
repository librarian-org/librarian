export interface UserType {
  id: string;
  name: string;
}

export type Person = {
  id: string;
  name: string;
  userType: UserType;
}
