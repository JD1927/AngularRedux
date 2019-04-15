export interface IUser {
  uid: string;
  displayName: string;
  photoURL?: string;
  email?: string;
  loading?: boolean;
  error?: string;
}

export class User implements IUser {
  constructor(
    public uid: string,
    public displayName: string,
    public photoURL: string,
    public email: string
    ) {}
}
