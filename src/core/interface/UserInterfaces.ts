export interface IUserSignUp {
  username: string;
  email: string;
  password: string;
  type?: string;
}

export interface IUserSignIn {
  username: string;
  password: string;
}
