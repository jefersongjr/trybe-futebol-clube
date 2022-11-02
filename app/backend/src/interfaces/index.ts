export interface IUser {
    id?: number,
    username: string,
    role: string,
    email: string,
    password?: string
    payload?: Object | string
  }

  export interface ILogin {
    email: string,
    password: string
  }