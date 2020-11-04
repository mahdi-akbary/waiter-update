export interface ILogin {
  username: string,
  password: string
}

export interface ILoggedInUser {
  id: number
  last_update_datetime: Date | any;
  last_updated_by: number
  name: string;
  status: string
  user_type: string
  username: string
}

export interface ILoginResult {
  success: boolean;
  user?: ILoggedInUser;
}
